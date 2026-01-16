
export interface Product {
  id: string;
  name: string;
  price: number;           // 數字價格
  originalPrice?: number;  // 原價 (compareAtPrice)
  formattedPrice: string;  // 格式化價格顯示
  formattedOriginalPrice?: string;
  currency: string;
  category: string;
  image: string;
  images?: string[];
  description: string;
  calligraphy: string;
  variantId?: string; // Shopify variant ID for cart
}

export enum LayoutMode {
  BRUTALIST = 'BRUTALIST',
  CINEMATIC = 'CINEMATIC'
}

export type ThemeMode = 'dark' | 'light' | 'card' | 'seal' | 'company';
