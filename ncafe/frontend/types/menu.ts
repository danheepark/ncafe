// types/menu.ts

export type MenuCategory = 'COFFEE' | 'BEVERAGE' | 'DESSERT' | 'BAKERY' | 'OTHER';

export interface MenuCategoryInfo {
  id: string;
  korName: string;
  engName: string;
  icon?: string;
  sortOrder: number;
}

export interface MenuImage {
  id: string;
  url: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface OptionItem {
  id: string;
  name: string;
  priceDelta: number;
}

export interface MenuOption {
  id: string;
  name: string;
  type: 'radio' | 'checkbox';
  required: boolean;
  items: OptionItem[];
}

export interface Menu {
  id: string;
  korName: string;
  engName: string;
  description: string;
  price: number;
  image: string;
  category?: MenuCategory;
  images?: MenuImage[];
  isAvailable?: boolean;
  isSoldOut?: boolean;
  sortOrder?: number;
  options?: MenuOption[];
  createdAt?: string;
  updatedAt?: string;
}
