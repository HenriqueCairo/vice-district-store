export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number | null;
  stock?: number;
  featured?: boolean;
  description: string;
  images: string[];
  externalLink?: string;
}
