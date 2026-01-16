// services/shopify/mappers.ts
import type { ShopifyProduct } from './types';
import type { Product } from '../../types';

export function mapShopifyProductToProduct(shopifyProduct: ShopifyProduct): Product {
  const firstImage = shopifyProduct.images.edges[0]?.node;
  const firstVariant = shopifyProduct.variants.edges[0]?.node;

  const priceAmount = parseFloat(shopifyProduct.priceRange.minVariantPrice.amount);
  const currency = shopifyProduct.priceRange.minVariantPrice.currencyCode;

  // 獲取原價 (compareAtPrice)
  const originalPriceAmount = shopifyProduct.compareAtPriceRange?.minVariantPrice?.amount
    ? parseFloat(shopifyProduct.compareAtPriceRange.minVariantPrice.amount)
    : undefined;

  // 只有當原價大於現價時才設定 originalPrice
  const validOriginalPrice = originalPriceAmount && originalPriceAmount > priceAmount
    ? originalPriceAmount
    : undefined;

  // 格式化價格
  const formatPrice = (amount: number) =>
    currency === 'HKD' ? `HK$${amount.toFixed(0)}` : `${currency} ${amount}`;

  return {
    id: shopifyProduct.id,
    name: shopifyProduct.title,
    price: priceAmount,
    originalPrice: validOriginalPrice,
    formattedPrice: formatPrice(priceAmount),
    formattedOriginalPrice: validOriginalPrice ? formatPrice(validOriginalPrice) : undefined,
    currency,
    category: 'maxim', // 默認 category，可以從 Shopify tags/collections 獲取
    image: firstImage?.url || '/placeholder.jpg',
    images: shopifyProduct.images.edges.map(e => e.node.url),
    description: shopifyProduct.description,
    calligraphy: shopifyProduct.title, // 可以從 metafield 獲取
    variantId: firstVariant?.id, // Shopify variant ID for cart
  };
}

export function mapShopifyProducts(products: ShopifyProduct[]): Product[] {
  return products.map(mapShopifyProductToProduct);
}
