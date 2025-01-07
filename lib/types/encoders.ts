export interface ImageFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  preview?: string;
  blob?: Blob;
  compressedSize?: number;
  outputType?: OutputType;
  status: 'idle' | 'processing' | 'complete' | 'error';
  error?: string;
}

export type OutputType = 'jpeg' | 'png' | 'webp' | 'avif';

export interface CompressionOptions {
  quality?: number;
  width?: number;
  height?: number;
  fit?: 'contain' | 'cover' | 'fill' | 'inside' | 'outside';
  position?: string;
  background?: string;
  withoutEnlargement?: boolean;
  withoutReduction?: boolean;
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
  