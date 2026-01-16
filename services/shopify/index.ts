// services/shopify/index.ts
export { getShopifyClient, clearShopifyClient } from './client';
export { fetchProducts, fetchProductByHandle } from './products';
export type { ShopifyProduct, ShopifyCart, ShopifyProductsResponse } from './types';
