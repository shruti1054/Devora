export type Category = "rings" | "earrings" | "neckpieces" | "bangles" | "armcuffs";
export type Collection = "pastel" | "gold";

export interface Product {
  id: string;
  name: string;
  category: Category;
  collection: Collection;
  price: number;          // INR
  description: string;
  variants: string[];     // e.g. ["S","M","L"] or [] if none
  icon: string;           // emoji shown on the gradient placeholder
  image?: string;         // local path or URL to product photo
}

export interface CartItem {
  id: string;
  variant: string | null;
  qty: number;
}

export interface OrderItem {
  id: string;
  name: string;
  variant: string | null;
  qty: number;
  price: number;
}

export interface Order {
  orderId: string;
  name: string;
  phone: string;
  address: {
    street: string;
    city: string;
    pincode: string;
    state: string;
  };
  items: OrderItem[];
  total: number;
  userEmail: string | null;
  createdAt: number;
  status: "pending" | "paid" | "shipped";
}
