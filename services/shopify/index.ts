// services/shopify/index.ts
export { getShopifyClient, clearShopifyClient } from './client';
export { fetchProducts, fetchProductByHandle, fetchCollectionProducts } from './products';
export { mapShopifyProductToProduct, mapShopifyProducts } from './mappers';
export { createCart, addToCart, getCart, getStoredCartId, storeCartId, clearStoredCartId, updateCartLine, removeCartLine } from './cart';
export type { ShopifyProduct, ShopifyCart, ShopifyProductsResponse, ShopifyCartLineItem } from './types';
