export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export const PRODUCT_SIZES: ProductSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export interface HoodieColorOption {
  id: string;
  name: string;
  /** hex used to tint the fabric material */
  hex: string;
  /** css class for the swatch ring when selected */
}

export const HOODIE_COLORS: HoodieColorOption[] = [
  { id: 'black', name: 'مشکی', hex: '#1a1a1f' },
  { id: 'graphite', name: 'خاکستری گرافیت', hex: '#3a3a40' },
  { id: 'navy', name: 'سرمه‌ای', hex: '#1f2a44' },
  { id: 'olive', name: 'زیتونی', hex: '#4a4a2f' },
  { id: 'burgundy', name: 'انگوری', hex: '#4a1f2c' },
  { id: 'stone', name: 'سنگی', hex: '#6b6b63' },
];

export interface ProductMeta {
  name: string;
  price: number;
  description: string;
}

export const HOODIE_PRODUCT: ProductMeta = {
  name: 'هودی مشکی براق',
  price: 2450000,
  description: 'هودی پشمی با پنبه‌ی نرم، دوخت ظریف و زیپ مخفی. طراحی شده برای راحتی و استایل روزمره.',
};

export type ViewLabel =
  | 'front'
  | 'back'
  | 'left'
  | 'right'
  | 'front45'
  | 'back45'
  | 'hood'
  | 'pocket'
  | 'cuff'
  | 'fleece'
  | 'stitch'
  | 'model';
