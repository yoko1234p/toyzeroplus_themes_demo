// services/shopify/client.ts
import { createStorefrontApiClient, StorefrontApiClient } from '@shopify/storefront-api-client';

let client: StorefrontApiClient | null = null;

export function getShopifyClient(): StorefrontApiClient {
  if (client) return client;

  const storeDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
  const accessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION || '2026-01';

  if (!storeDomain || !accessToken) {
    throw new Error('Missing Shopify environment variables. Check .env.local file.');
  }

  client = createStorefrontApiClient({
    storeDomain,
    apiVersion,
    publicAccessToken: accessToken,
  });

  return client;
}

export function clearShopifyClient(): void {
  client = null;
}
