// services/shopify/index.ts
export { getShopifyClient, clearShopifyClient } from './client';
export { fetchProducts, fetchProductByHandle } from './products';
export { mapShopifyProductToProduct, mapShopifyProducts } from './mappers';
export { createCart, addToCart, getCart, getStoredCartId, storeCartId, clearStoredCartId } from './cart';
export type { ShopifyProduct, ShopifyCart, ShopifyProductsResponse } from './types';
