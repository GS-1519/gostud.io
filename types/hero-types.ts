export interface HeroConfig {
  translationKey?: string;
  gradientTitle?: string;
  normalTitle?: string;
  description?: string;
  buttonText?: string;
  id: string;
  imagePath: string;
  imageAlt?: string;
  packType: string;
  packPath: string;
  features: Array<{
    icon: 'mdi' | 'circul' | 'lock' | 'tick';
    textKey?: string;
    text?: string;
  }>;
} 