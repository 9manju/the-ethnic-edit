export interface Product {
  id: string;
  title: string;
  sku: string;
  category: 'Fashion' | 'Electronics' | 'Lifestyle' | 'Accessories' | 'Beauty';
  subcategory: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number; // percentage
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  specifications: { [key: string]: string };
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  stock: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFlashSale?: boolean;
  reviews?: Review[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Blog {
  id: string;
  title: string;
  category: 'Fashion Trends' | 'Electronics Guides' | 'Lifestyle Tips' | 'Product Reviews';
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Returned';
  items: {
    productId: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  shippingAddress: string;
  paymentMethod: string;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  minAmount: number;
  description: string;
  expiryDate: string;
}
