import { useState, useCallback, useEffect, useRef } from 'react';
import type { ImageFile, OutputType, CompressionOptions } from '@/lib/types/encoders'
import { decode, encode, getFileType } from '@/utils/imageProcessing'

export function useImageQueue(
  options: CompressionOptions,
  outputType: OutputType,
  setImages: React.Dispatch<React.SetStateAction<ImageFile[]>>
) {
  const MAX_PARALLEL_PROCESSING = 3;
  const [queue, setQueue] = useState<string[]>([]);
  const processingCount = useRef<number>(0);
  const processingImages = useRef<Set<string>>(new Set());

  const processImage = useCallback(async (image: ImageFile) => {
    if (processingImages.current.has(image.id)) {
      return; // Skip if already processing this image
    }
    processingImages.current.add(image.id);
    processingCount.current++;

    try {
      setImages((prev: ImageFile[]) =>
        prev.map((img): ImageFile =>
          img.id === image.id
            ? { ...img, status: 'processing' as const }
            : img
        )
      );

      const fileBuffer = await image.file.arrayBuffer();
      const sourceType = getFileType(image.file);
      
      if (!fileBuffer.byteLength) {
        throw new Error('Empty file');
      }

      // Decode the image
      const imageData = await decode(sourceType, fileBuffer);
      
      if (!imageData || !imageData.width || !imageData.height) {
        throw new Error('Invalid image data');
      }

      // Encode to the target format
      const compressedBuffer = await encode(outputType, imageData, options);
      
      if (!compressedBuffer.byteLength) {
        throw new Error('Failed to compress image');
      }

      const blob = new Blob([compressedBuffer], { type: `image/${outputType}` });
      const preview = URL.createObjectURL(blob);

      setImages((prev: ImageFile[]) =>
        prev.map((img): ImageFile =>
          img.id === image.id
            ? {
                ...img,
                status: 'complete' as const,
                preview,
                blob,
                compressedSize: compressedBuffer.byteLength,
                outputType,
              }
            : img
        )
      );
    } catch (error) {
      console.error('Error processing image:', error);
      setImages((prev: ImageFile[]) =>
        prev.map((img): ImageFile =>
          img.id === image.id
            ? {
                ...img,
                status: 'error' as const,
                error: error instanceof Error 
                  ? error.message 
                  : 'Failed to process image',
              }
            : img
        )
      );
    } finally {
      processingImages.current.delete(image.id);
      processingCount.current--;
      // Try to process next images if any
      setTimeout(processNextInQueue, 0);
    }
  }, [options, outputType, setImages]);

  const processNextInQueue = useCallback(() => {
    console.log('Processing next in queue:', {
      queueLength: queue.length,
      processingCount: processingCount.current,
      processingImages: Array.from(processingImages.current)
    });

    if (queue.length === 0) return;

    // Get all images we can process in this batch
    setImages((prev: ImageFile[]) => {
      const imagesToProcess = prev.filter(img => 
        queue.includes(img.id) && 
        !processingImages.current.has(img.id) &&
        processingCount.current < MAX_PARALLEL_PROCESSING
      );

      console.log('Found images to process:', imagesToProcess.length);

      if (imagesToProcess.length === 0) return prev;

      // Start processing these images
      imagesToProcess.forEach((image, index) => {
        setTimeout(() => {
          processImage(image);
        }, index * 100);
      });

      // Remove these from queue
      setQueue(current => current.filter(id => 
        !imagesToProcess.some(img => img.id === id)
      ));

      // Update status to queued
      return prev.map((img: ImageFile): ImageFile => {
        const shouldProcess = imagesToProcess.some(processImg => processImg.id === img.id);
        if (shouldProcess) {
          return {
            ...img,
            status: 'pending'
          };
        }
        return img;
      });
    });
  }, [queue, processImage, setImages]);

  // Start processing when queue changes
  useEffect(() => {
    console.log('Queue changed:', queue.length);
    if (queue.length > 0) {
      processNextInQueue();
    }
  }, [queue, processNextInQueue]);

  const addToQueue = useCallback((imageId: string) => {
    console.log('Adding to queue:', imageId);
    setQueue(prev => [...prev, imageId]);
  }, []);

  return { addToQueue };
}