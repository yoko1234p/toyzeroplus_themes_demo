// services/shopify/mappers.ts
import type { ShopifyProduct } from './types';
import type { Product } from '../../types';

export function mapShopifyProductToProduct(shopifyProduct: ShopifyProduct): Product {
  const firstImage = shopifyProduct.images.edges[0]?.node;
  const price = shopifyProduct.priceRange.minVariantPrice.amount;
  const currency = shopifyProduct.priceRange.minVariantPrice.currencyCode;

  // 格式化價格為 "HK$XXX" 格式
  const formattedPrice = currency === 'HKD'
    ? `HK$${parseFloat(price).toFixed(0)}`
    : `${currency} ${price}`;

  return {
    id: shopifyProduct.id,
    name: shopifyProduct.title,
    price: formattedPrice,
    category: 'maxim', // 默認 category，可以從 Shopify tags/collections 獲取
    image: firstImage?.url || '/placeholder.jpg',
    description: shopifyProduct.description,
    calligraphy: shopifyProduct.title, // 可以從 metafield 獲取
  };
}

export function mapShopifyProducts(products: ShopifyProduct[]): Product[] {
  return products.map(mapShopifyProductToProduct);
}
