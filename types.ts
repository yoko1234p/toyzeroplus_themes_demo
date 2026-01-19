export interface PickupMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  price: number; // 數字價格
  originalPrice?: number; // 原價 (compareAtPrice)
  formattedPrice: string; // 格式化價格顯示
  formattedOriginalPrice?: string;
  currency: string;
  category: string;
  image: string;
  images?: string[];
  description: string;
  descriptionHtml?: string; // HTML 格式描述 from Shopify
  calligraphy: string;
  variantId?: string; // Shopify variant ID for cart
  // Metafields
  weight?: string;
  features?: string[];
  ingredients?: string[];
  pickupMethods?: PickupMethod[];
  redemptionPeriod?: string;
  redemptionLocations?: string[];
  madeIn?: string;
  tag?: string; // From custom.hppye_tag metafield
}

export enum LayoutMode {
  BRUTALIST = "BRUTALIST",
  CINEMATIC = "CINEMATIC",
}

export type ThemeMode = "dark" | "light" | "card" | "seal" | "company";
