
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'mx-turnip-pudding-with-conpoy',
    name: '快樂印刷瑤柱蘿蔔糕',
    price: 148,
    originalPrice: 198,
    formattedPrice: 'HK$148',
    formattedOriginalPrice: 'HK$198',
    currency: 'HKD',
    category: '蘿蔔糕',
    image: '/779a50d7-948b-4e3b-ab1e-ee962b0ded74.png',
    description: '嚴選清甜白蘿蔔，切成8mm絲絲蘿蔔條，加上北海道瑤柱、臘味及蝦米，入口鮮味豐足。',
    calligraphy: '瑤柱蘿蔔'
  },
  {
    id: 'mx-turnip-pudding-with-mushroom-taro',
    name: '快樂印刷香菇芋粒蘿蔔糕',
    price: 102,
    originalPrice: 133,
    formattedPrice: 'HK$102',
    formattedOriginalPrice: 'HK$133',
    currency: 'HKD',
    category: '蘿蔔糕',
    image: '/4dcf5afc-efcd-4709-a84c-a218b74670e6_400x320.png',
    description: '蔬食配方，清甜8mm絲絲蘿蔔條配炒至甘香的椴木香菇、炸杏鮑菇及芋粒。',
    calligraphy: '香菇芋粒'
  },
  {
    id: 'mx-taro-pudding',
    name: '快樂印刷芋頭糕',
    price: 148,
    originalPrice: 198,
    formattedPrice: 'HK$148',
    formattedOriginalPrice: 'HK$198',
    currency: 'HKD',
    category: '芋頭糕',
    image: '/01a5a5c8-7764-4fd7-8c79-daa1b910207c.png',
    description: '特選香甜新鮮芋頭，厚切成粒，搭配份量十足的惹味甘香臘腸，芋頭綿香四溢。',
    calligraphy: '芋頭綿香'
  }
];

export const NEON_COLORS = {
  pink: '#ff00de',
  teal: '#00ffd4',
  amber: '#ffb300',
  crimson: '#dc2626'
};
