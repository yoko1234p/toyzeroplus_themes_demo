// services/shopify/products.ts
import { getShopifyClient } from './client';
import { PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY } from './queries';
import type { ShopifyProduct, ShopifyProductsResponse } from './types';

export async function fetchProducts(first: number = 20): Promise<ShopifyProduct[]> {
  const client = getShopifyClient();

  const { data, errors } = await client.request<ShopifyProductsResponse>(PRODUCTS_QUERY, {
    variables: { first },
  });

  if (errors) {
    console.error('Shopify API errors:', errors);
    throw new Error('Failed to fetch products from Shopify');
  }

  if (!data?.products?.edges) {
    return [];
  }

  return data.products.edges.map(edge => edge.node);
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const client = getShopifyClient();

  const { data, errors } = await client.request<{ productByHandle: ShopifyProduct | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { variables: { handle } }
  );

  if (errors) {
    console.error('Shopify API errors:', errors);
    throw new Error(`Failed to fetch product: ${handle}`);
  }

  return data?.productByHandle || null;
}
