export type User = {
  id: string;
  name: string;
  email: string;
  restaurantName: string;
};

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

export type CartItem = MenuItem & {
  quantity: number;
};

export type OrderStatus = 'Pending' | 'Preparing' | 'Served' | 'Cancelled';

export type Order = {
  id: string;
  tableNumber: number;
  items: CartItem[];
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Table = {
  id: string;
  number: number;
  qrCode: string;
};