export type ImageStatus = 'pending' | 'processing' | 'complete' | 'error';

export interface ImageFile {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  status: ImageStatus;
  preview?: string;
  blob?: Blob;
  outputType?: string;
}

export type OutputType = 'webp' | 'jpeg' | 'png' | 'avif' | 'jxl';

export interface CompressionOptions {
  quality: number;
}

export interface FormatQualitySettings {
  avif: number;
  jpeg: number;
  jxl: number;
  webp: number;
  png: number;
}

export interface ProcessedImage {
  id: string;
  name: string;
  url: string;
  blob: Blob;
  originalSize: number;
  compressedSize: number;
  outputType: OutputType;
  status: 'pending' | 'processing' | 'complete' | 'error';
  error?: string;
  preview?: string;
}

export interface AvifEncodeOptions {
  quality?: number;
  effort?: number;
}

export interface JpegEncodeOptions {
  quality?: number;
}

export interface JxlEncodeOptions {
  quality?: number;
}

export interface WebpEncodeOptions {
  quality?: number;
}
  