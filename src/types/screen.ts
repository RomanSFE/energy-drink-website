export interface HeroScreenConfig {
  id: number;
  slug: string;
  brandTitle: string;
  accentColor: string;
  textGradient: string;
  bgGradient: string;
  description: string;
  texturePath?: string;
  canRotation: [number, number, number];
}