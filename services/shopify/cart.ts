// services/shopify/cart.ts
import { getShopifyClient } from './client';
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_QUERY,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
} from './queries';
import type { ShopifyCart } from './types';

const CART_ID_KEY = 'shopify_cart_id';

export function getStoredCartId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(CART_ID_KEY);
}

export function storeCartId(cartId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_ID_KEY, cartId);
}

export function clearStoredCartId(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_ID_KEY);
}

export async function createCart(variantId?: string, quantity: number = 1): Promise<ShopifyCart> {
  const client = getShopifyClient();

  const input = variantId
    ? { lines: [{ merchandiseId: variantId, quantity }] }
    : {};

  const { data, errors } = await client.request<{
    cartCreate: { cart: ShopifyCart; userErrors: Array<{ field: string; message: string }> };
  }>(CART_CREATE_MUTATION, { variables: { input } });

  if (errors || data?.cartCreate?.userErrors?.length) {
    console.error('Cart creation errors:', errors || data?.cartCreate?.userErrors);
    throw new Error('Failed to create cart');
  }

  const cart = data!.cartCreate.cart;
  storeCartId(cart.id);
  return cart;
}

export async function addToCart(variantId: string, quantity: number = 1): Promise<ShopifyCart> {
  const client = getShopifyClient();
  let cartId = getStoredCartId();

  // 如果冇 cart，先創建一個
  if (!cartId) {
    return createCart(variantId, quantity);
  }

  const { data, errors } = await client.request<{
    cartLinesAdd: { cart: ShopifyCart; userErrors: Array<{ field: string; message: string }> };
  }>(CART_LINES_ADD_MUTATION, {
    variables: {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    },
  });

  if (errors || data?.cartLinesAdd?.userErrors?.length) {
    // Cart 可能已過期，嘗試創建新 cart
    clearStoredCartId();
    return createCart(variantId, quantity);
  }

  return data!.cartLinesAdd.cart;
}

export async function getCart(): Promise<ShopifyCart | null> {
  const cartId = getStoredCartId();
  if (!cartId) return null;

  const client = getShopifyClient();
  const { data, errors } = await client.request<{ cart: ShopifyCart | null }>(
    CART_QUERY,
    { variables: { cartId } }
  );

  if (errors || !data?.cart) {
    clearStoredCartId();
    return null;
  }

  return data.cart;
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart | null> {
  const client = getShopifyClient();

  const { data, errors } = await client.request<{
    cartLinesUpdate: { cart: ShopifyCart; userErrors: Array<{ field: string; message: string }> };
  }>(CART_LINES_UPDATE_MUTATION, {
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }],
    },
  });

  if (errors || data?.cartLinesUpdate?.userErrors?.length) {
    console.error('Cart update errors:', errors || data?.cartLinesUpdate?.userErrors);
    return null;
  }

  return data?.cartLinesUpdate?.cart || null;
}

export async function removeCartLine(
  cartId: string,
  lineId: string
): Promise<ShopifyCart | null> {
  const client = getShopifyClient();

  const { data, errors } = await client.request<{
    cartLinesRemove: { cart: ShopifyCart; userErrors: Array<{ field: string; message: string }> };
  }>(CART_LINES_REMOVE_MUTATION, {
    variables: {
      cartId,
      lineIds: [lineId],
    },
  });

  if (errors || data?.cartLinesRemove?.userErrors?.length) {
    console.error('Cart remove errors:', errors || data?.cartLinesRemove?.userErrors);
    return null;
  }

  return data?.cartLinesRemove?.cart || null;
}
