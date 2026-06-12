export interface OrderData {
  productId: number;
  productName: string;
  price: number;
  deliveryCharge: number;
  quantity: number;
  customerName: string;
  phoneNumber: string;
  address: string;
  latitude?: number;
  longitude?: number;
  mapsUrl?: string;
  deliveryTime: string;
  notes?: string;
  totalPrice: number;
  createdAt: string;
}
