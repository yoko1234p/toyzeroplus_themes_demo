
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '午夜絲綢',
    price: 'HK$3,280',
    category: '服飾',
    image: 'https://picsum.photos/id/1011/800/1200',
    description: '一件深藍色的長袍，靈感來自1960年代香港雨後濕潤的街道。',
    calligraphy: '深藍絲綢'
  },
  {
    id: '2',
    name: '2046 計時碼錶',
    price: 'HK$9,360',
    category: '配飾',
    image: 'https://picsum.photos/id/175/800/1200',
    description: '捕捉時間與記憶稍縱即逝本質的時計。',
    calligraphy: '時間流逝'
  },
  {
    id: '3',
    name: '重慶森林香氛',
    price: 'HK$1,400',
    category: '美妝',
    image: 'https://picsum.photos/id/353/800/1200',
    description: '鳳梨罐頭、雨水和煙草的氣味。一種渴望的味道。',
    calligraphy: '重慶森林'
  },
  {
    id: '4',
    name: '金閣寺',
    price: 'HK$6,630',
    category: '家居',
    image: 'https://picsum.photos/id/249/800/1200',
    description: '一座野獸派雕塑，意在黃昏的微光中沉思。',
    calligraphy: '金色樓閣'
  }
];

export const NEON_COLORS = {
  pink: '#ff00de',
  teal: '#00ffd4',
  amber: '#ffb300',
  crimson: '#dc2626'
};
