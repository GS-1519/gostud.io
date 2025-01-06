import type { FormatQualitySettings } from '@/lib/types/encoders';

export const DEFAULT_QUALITY_SETTINGS: FormatQualitySettings = {
  avif: 50,
  jpeg: 75,
  jxl: 75,
  webp: 75,
  png: 100,
};

export function getDefaultQualityForFormat(format: keyof FormatQualitySettings): number {
  return DEFAULT_QUALITY_SETTINGS[format] || 75;
}