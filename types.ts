
export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
  calligraphy: string;
}

export enum LayoutMode {
  BRUTALIST = 'BRUTALIST',
  CINEMATIC = 'CINEMATIC'
}

export type ThemeMode = 'dark' | 'light' | 'card';
