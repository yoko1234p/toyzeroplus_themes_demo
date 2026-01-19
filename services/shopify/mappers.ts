// services/shopify/mappers.ts
import type { ShopifyProduct } from "./types";
import type { Product } from "../../types";

// Helper function to get metafield value
function getMetafieldValue(
  metafields: ShopifyProduct["metafields"],
  key: string,
): string | undefined {
  const field = metafields?.find((m) => m?.key === key);
  return field?.value;
}

// Helper function to parse list metafield (JSON array or comma-separated)
function parseListMetafield(
  metafields: ShopifyProduct["metafields"],
  key: string,
): string[] | undefined {
  const value = getMetafieldValue(metafields, key);
  if (!value) return undefined;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [value];
  } catch {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
}

export function mapShopifyProductToProduct(
  shopifyProduct: ShopifyProduct,
): Product {
  const firstImage = shopifyProduct.images.edges[0]?.node;
  const firstVariant = shopifyProduct.variants.edges[0]?.node;

  const priceAmount = parseFloat(
    shopifyProduct.priceRange.minVariantPrice.amount,
  );
  const currency = shopifyProduct.priceRange.minVariantPrice.currencyCode;

  // 獲取原價 (compareAtPrice)
  const originalPriceAmount = shopifyProduct.compareAtPriceRange
    ?.minVariantPrice?.amount
    ? parseFloat(shopifyProduct.compareAtPriceRange.minVariantPrice.amount)
    : undefined;

  // 只有當原價大於現價時才設定 originalPrice
  const validOriginalPrice =
    originalPriceAmount && originalPriceAmount > priceAmount
      ? originalPriceAmount
      : undefined;

  // 格式化價格
  const formatPrice = (amount: number) =>
    currency === "HKD" ? `HK$${amount.toFixed(0)}` : `${currency} ${amount}`;

  return {
    id: shopifyProduct.id,
    name: shopifyProduct.title,
    price: priceAmount,
    originalPrice: validOriginalPrice,
    formattedPrice: formatPrice(priceAmount),
    formattedOriginalPrice: validOriginalPrice
      ? formatPrice(validOriginalPrice)
      : undefined,
    currency,
    category: "maxim", // 默認 category，可以從 Shopify tags/collections 獲取
    image: firstImage?.url || "/placeholder.jpg",
    images: shopifyProduct.images.edges.map((e) => e.node.url),
    description: shopifyProduct.description,
    descriptionHtml: shopifyProduct.descriptionHtml, // HTML 格式描述
    calligraphy: shopifyProduct.title, // 可以從 metafield 獲取
    variantId: firstVariant?.id, // Shopify variant ID for cart
    // Metafields
    weight: getMetafieldValue(shopifyProduct.metafields, "foot_weight"),
    features: parseListMetafield(shopifyProduct.metafields, "product_features"),
    ingredients: parseListMetafield(
      shopifyProduct.metafields,
      "main_ingredients",
    ),
    redemptionPeriod: getMetafieldValue(
      shopifyProduct.metafields,
      "redemption_period",
    ),
    redemptionLocations: parseListMetafield(
      shopifyProduct.metafields,
      "redemption_locations",
    ),
    madeIn: getMetafieldValue(shopifyProduct.metafields, "made_in"),
    tag: getMetafieldValue(shopifyProduct.metafields, "hppye_tag"),
    // 預設取貨方式
    pickupMethods: [
      {
        id: "store",
        name: "分店無紙換領",
        icon: "🏪",
        description: "門市取現貨，無需截圖或列印",
      },
    ],
  };
}

export function mapShopifyProducts(products: ShopifyProduct[]): Product[] {
  return products.map(mapShopifyProductToProduct);
}
