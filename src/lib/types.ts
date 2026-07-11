export type TProduct = {
  id: string;
  step: number;
  category: "Cameras" | "Sensors" | "Accessories" | "Plan";
  image: string;
  title: string;
  description: string;
  badge: string | null;
  price: number;
  compareAtPrice: number | null;
  learnMoreUrl: string;
  variants: { id: string; label: string; thumbSrc: string }[];
  billing?: string;
  adjustable?: boolean;
};

// Cart Item Type
export type TCartItem = {
  id: string;
  variantId: string | null;
  title: string;
  titleAccent: string | null;
  color: string | null;
  quantity: number;
  price: number;
  compareAtPrice: number | null;
  billing: string;
  image: string;
  adjustable: boolean;
  category: "Cameras" | "Sensors" | "Accessories" | "Plan";
};

// Defining the basket itself as an object.
export type TCartState = {
  [key: string]: TCartItem;
};

export type TProductData = {
  title: string;
  titleAccent?: string;
  price: number;
  compareAtPrice: number | null;
  billing?: string;
  image: string;
  adjustable?: boolean;
  category: TCartItem["category"];
  colorName?: string;
};
