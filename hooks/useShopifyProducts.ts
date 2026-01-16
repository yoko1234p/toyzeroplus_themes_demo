// hooks/useShopifyProducts.ts
import { useState, useEffect } from 'react';
import { fetchProducts, fetchCollectionProducts, type ShopifyProduct } from '../services/shopify';

interface UseShopifyProductsOptions {
  count?: number;
  collectionHandle?: string;
}

interface UseShopifyProductsResult {
  products: ShopifyProduct[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useShopifyProducts(
  countOrOptions: number | UseShopifyProductsOptions = 20
): UseShopifyProductsResult {
  // 支援舊有 API (count: number) 同新 API (options object)
  const options = typeof countOrOptions === 'number'
    ? { count: countOrOptions }
    : countOrOptions;

  const { count = 20, collectionHandle } = options;

  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(count > 0);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    // Skip fetch if count is 0 or less
    if (count <= 0) {
      setLoading(false);
      setProducts([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 如果有 collectionHandle，用 collection query；否則用一般 products query
      const data = collectionHandle
        ? await fetchCollectionProducts(collectionHandle, count)
        : await fetchProducts(count);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      console.error('Failed to fetch Shopify products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [count, collectionHandle]);

  return {
    products,
    loading,
    error,
    refetch: fetchData,
  };
}
