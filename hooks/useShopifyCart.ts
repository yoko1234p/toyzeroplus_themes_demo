// hooks/useShopifyCart.ts
import { useState, useEffect, useCallback } from 'react';
import { getCart, addToCart, updateCartLine, removeCartLine, getStoredCartId, type ShopifyCart } from '../services/shopify';

interface UseShopifyCartResult {
  cart: ShopifyCart | null;
  loading: boolean;
  error: Error | null;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  clearCart: () => Promise<void>;
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

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    const cartId = getStoredCartId();
    if (!cartId) return;

    setLoading(true);
    setError(null);

    try {
      const updatedCart = await updateCartLine(cartId, lineId, quantity);
      if (updatedCart) {
        setCart(updatedCart);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update item'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (lineId: string) => {
    const cartId = getStoredCartId();
    if (!cartId) return;

    setLoading(true);
    setError(null);

    try {
      const updatedCart = await removeCartLine(cartId, lineId);
      if (updatedCart) {
        setCart(updatedCart);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to remove item'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCart = useCallback(async () => {
    if (!cart?.lines?.edges || cart.lines.edges.length === 0) return;

    const cartId = getStoredCartId();
    if (!cartId) return;

    setLoading(true);
    setError(null);

    try {
      // 逐個移除所有 items
      for (const edge of cart.lines.edges) {
        await removeCartLine(cartId, edge.node.id);
      }
      await refreshCart();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to clear cart'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [cart, refreshCart]);

  return {
    cart,
    loading,
    error,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    checkoutUrl: cart?.checkoutUrl || null,
    itemCount: cart?.totalQuantity || 0,
    refreshCart,
  };
}
