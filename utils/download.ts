import type { ProcessedImage } from '@/lib/types/encoders';

export function downloadImage(image: ProcessedImage) {
  if (!image.blob || !image.outputType) return;
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(image.blob);
  link.download = `${image.name.split('.')[0]}.${image.outputType}`;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function downloadAllImages(images: ProcessedImage[]) {
  images
    .filter(image => image.blob && image.outputType)
    .forEach(downloadImage);
}