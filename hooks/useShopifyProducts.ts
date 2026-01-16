// hooks/useShopifyProducts.ts
import { useState, useEffect } from 'react';
import { fetchProducts, type ShopifyProduct } from '../services/shopify';

interface UseShopifyProductsResult {
  products: ShopifyProduct[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useShopifyProducts(count: number = 20): UseShopifyProductsResult {
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
      const data = await fetchProducts(count);
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
  }, [count]);

  return {
    products,
    loading,
    error,
    refetch: fetchData,
  };
}
