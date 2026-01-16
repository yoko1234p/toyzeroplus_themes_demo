// hooks/useShopifyCart.ts
import { useState, useEffect, useCallback } from 'react';
import { getCart, addToCart, type ShopifyCart } from '../services/shopify';

interface UseShopifyCartResult {
  cart: ShopifyCart | null;
  loading: boolean;
  error: Error | null;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  checkoutUrl: string | null;
  itemCount: number;
  refreshCart: () => Promise<void>;
}

export function useShopifyCart(): UseShopifyCartResult {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refreshCart = useCallback(async () => {
    try {
      setError(null);
      const fetchedCart = await getCart();
      setCart(fetchedCart);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch cart'));
      console.error('Failed to fetch cart:', err);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    refreshCart().finally(() => setLoading(false));
  }, [refreshCart]);

  const addItem = useCallback(async (variantId: string, quantity: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const updatedCart = await addToCart(variantId, quantity);
      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add item'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    cart,
    loading,
    error,
    addItem,
    checkoutUrl: cart?.checkoutUrl || null,
    itemCount: cart?.totalQuantity || 0,
    refreshCart,
  };
}
