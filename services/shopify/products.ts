// services/shopify/products.ts
import { getShopifyClient } from './client';
import { PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY, COLLECTION_PRODUCTS_QUERY } from './queries';
import type { ShopifyProduct, ShopifyProductsResponse } from './types';

interface ShopifyCollectionResponse {
  collection: {
    id: string;
    title: string;
    handle: string;
    products: {
      edges: Array<{ node: ShopifyProduct; cursor: string }>;
      pageInfo: { hasNextPage: boolean; endCursor: string };
    };
  } | null;
}

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

export async function fetchCollectionProducts(
  collectionHandle: string,
  first: number = 20
): Promise<ShopifyProduct[]> {
  const client = getShopifyClient();

  const { data, errors } = await client.request<ShopifyCollectionResponse>(
    COLLECTION_PRODUCTS_QUERY,
    { variables: { handle: collectionHandle, first } }
  );

  if (errors) {
    console.error('Shopify API errors:', errors);
    throw new Error(`Failed to fetch collection: ${collectionHandle}`);
  }

  if (!data?.collection?.products?.edges) {
    console.warn(`Collection "${collectionHandle}" not found or has no products`);
    return [];
  }

  return data.collection.products.edges.map(edge => edge.node);
}
