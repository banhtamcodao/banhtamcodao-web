// Types based on your supabase_migration.sql

export interface Category {
  id: number;
  parent_id?: number | null;
  name: string;
  slug?: string | null;
}

export interface Product {
  id: number;
  category_id?: number | null;
  name: string;
  slug?: string | null;
  description?: string | null;
  image_url?: string | null;
  price: number;
  discount_price?: number | null;
  promo_text?: string | null;
  status?: 'active' | 'inactive' | 'hidden';
  is_special?: boolean;
  // Relationship (optional, if you join queries)
  categories?: Category;
}

export interface Order {
  id: number;
  order_code: string;
  recipient_name: string;
  phone_number: string;
  delivery_address: string;
  items_list: string; // JSON string
  note?: string | null;
  subtotal: number;
  shipping_fee: number;
  promo_code?: string | null;
  discount_amount?: number;
  total_amount: number;
  delivery_method: string;
  payment_status: string;
  delivery_date: string; // date
  delivery_time: string; // time
  status?: 'Chờ xác nhận' | 'Đã xác nhận' | 'Đang vận chuyển' | 'Hoàn thành' | 'Đã hủy';
  order_time: string; // timestamp
}
