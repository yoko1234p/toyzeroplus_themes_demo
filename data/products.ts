/**
 * Product Data from Maxim's Products
 * 快樂印刷賀年糕點產品資料
 */

export interface MaximProduct {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  originalPrice: number;
  currency: string;
  description: string;
  highlightText?: string; // 要 highlight 嘅重點文字
  detailedDescription: string;
  detailedHighlightText?: string; // 詳情頁要 highlight 嘅重點文字
  image: string;
  images: string[];
  weight: string;
  dimensions?: string;
  pickupMethods: PickupMethod[];
  redemptionPeriod: string;
  redemptionLocations: string[];
  features: string[];
  ingredients?: string[];
  madeIn: string;
  category: string;
}

export interface PickupMethod {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
}

export const PICKUP_METHODS: Record<string, PickupMethod> = {
  store: {
    id: 'store',
    name: '分店無紙換領',
    nameEn: 'Store Pickup',
    icon: '🏪',
    description: '門市取現貨，無需截圖或列印'
  },
  delivery: {
    id: 'delivery',
    name: '送貨上門',
    nameEn: 'Home Delivery',
    icon: '🚚',
    description: '送貨至指定地址'
  }
};

export const PRODUCTS: MaximProduct[] = [
  {
    id: 'mx-turnip-pudding-with-conpoy',
    name: '快樂印刷瑤柱蘿蔔糕',
    nameEn: 'Happy Printing Turnip Pudding with Conpoy',
    price: 148,
    originalPrice: 198,
    currency: 'HKD',
    description: '厚切絲蘿蔔糕，嚴選清甜白蘿蔔，切成8mm絲絲蘿蔔條',
    highlightText: '8mm絲絲蘿蔔條',
    detailedDescription: '嚴選清甜白蘿蔔，切成8mm絲絲蘿蔔條，加上惹味兼口感極佳的北海道瑤柱，臘味及蝦米，入口鮮味豐足。',
    detailedHighlightText: '北海道瑤柱',
    image: '/779a50d7-948b-4e3b-ab1e-ee962b0ded74.png',
    images: [
      '/779a50d7-948b-4e3b-ab1e-ee962b0ded74.png',
      '/09805662-55d2-4c02-81af-1cf924cb8802.png'
    ],
    weight: '每個約800克',
    dimensions: '315 x 180 x 60mm',
    pickupMethods: [PICKUP_METHODS.store],
    redemptionPeriod: '2026年2月5日至2月14日',
    redemptionLocations: ['全線快樂印刷西餅', '指定分店'],
    features: [
      '8mm厚切絲蘿蔔條',
      '北海道瑤柱',
      '臘味及蝦米',
      '100%香港製造'
    ],
    ingredients: ['白蘿蔔', '瑤柱', '臘腸', '蝦米', '粘米粉'],
    madeIn: '香港',
    category: 'turnip-pudding'
  },
  {
    id: 'mx-turnip-pudding-with-mushroom-taro',
    name: '快樂印刷香菇芋粒蘿蔔糕',
    nameEn: 'Happy Printing Turnip Pudding with Mushroom & Taro',
    price: 102,
    originalPrice: 133,
    currency: 'HKD',
    description: '蔬食配方，清甜8mm絲絲蘿蔔條配炒至甘香的椴木香菇',
    highlightText: '蔬食配方',
    detailedDescription: '清甜8mm絲絲蘿蔔條，加入炒至甘香的椴木香菇、炸杏鮑菇、芋粒、甘筍等食材。產品採用蔬食配方，由菇類與蔬菜秘製而成。',
    detailedHighlightText: '椴木香菇',
    image: '/4dcf5afc-efcd-4709-a84c-a218b74670e6_400x320.png',
    images: [
      '/4dcf5afc-efcd-4709-a84c-a218b74670e6_400x320.png',
      '/92a37fd9-6e29-4519-b95f-4c4339f45926_400x320.png'
    ],
    weight: '每個約570克',
    pickupMethods: [PICKUP_METHODS.store],
    redemptionPeriod: '2026年2月8日至2月14日',
    redemptionLocations: ['全線快樂印刷西餅', '指定分店'],
    features: [
      '8mm絲絲蘿蔔條',
      '椴木香菇',
      '炸杏鮑菇',
      '芋粒',
      '蔬食配方',
      '100%香港製造'
    ],
    ingredients: ['白蘿蔔', '香菇', '杏鮑菇', '芋頭', '甘筍', '粘米粉'],
    madeIn: '香港',
    category: 'turnip-pudding'
  },
  {
    id: 'mx-taro-pudding',
    name: '快樂印刷芋頭糕',
    nameEn: 'Happy Printing Taro Pudding',
    price: 148,
    originalPrice: 198,
    currency: 'HKD',
    description: '特選香甜新鮮芋頭，厚切成粒，搭配惹味甘香臘腸',
    highlightText: '厚切成粒',
    detailedDescription: '特選香甜新鮮芋頭，厚切成粒，搭配份量十足的惹味甘香臘腸，芋頭綿香四溢，啖啖足料豐味。',
    detailedHighlightText: '惹味甘香臘腸',
    image: '/01a5a5c8-7764-4fd7-8c79-daa1b910207c.png',
    images: [
      '/01a5a5c8-7764-4fd7-8c79-daa1b910207c.png',
      '/f2aec032-41e5-47b3-a872-5a1e6353c28a.png'
    ],
    weight: '每個約810克',
    dimensions: '315 x 180 x 60mm',
    pickupMethods: [PICKUP_METHODS.store],
    redemptionPeriod: '2026年2月5日至2月14日',
    redemptionLocations: [
      '2月5-11日：全線快樂印刷西餅及指定分店',
      '2月12-14日：指定分店'
    ],
    features: [
      '厚切芋頭粒',
      '惹味甘香臘腸',
      '芋頭綿香四溢',
      '100%香港製造'
    ],
    ingredients: ['芋頭', '臘腸', '粘米粉', '蔥'],
    madeIn: '香港',
    category: 'taro-pudding'
  }
];

export const getProductById = (id: string): MaximProduct | undefined => {
  return PRODUCTS.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): MaximProduct[] => {
  return PRODUCTS.filter(p => p.category === category);
};
