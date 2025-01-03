export interface HeroConfig {
  gradientTitle: string;
  normalTitle: string;
  description: string;
  buttonText: string;
  imagePath: string;
  imageAlt: string;
  packType: string;
  packPath: string;
  features: {
    icon: 'mdi' | 'circul' | 'lock' | 'tick';
    text: string;
  }[];
} 