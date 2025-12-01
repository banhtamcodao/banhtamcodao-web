import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Logout from './pages/Logout';
import Wishlist from './pages/Wishlist';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Contact from './pages/Contact';
import OrderTracking from './pages/OrderTracking';
import AdminPlaceholder from './components/admin/AdminPlaceholder';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import { useEffect } from 'react';
import { supabase, isMockMode } from './lib/supabase';

function App() {
  useEffect(() => {
    // Chỉ kiểm tra kết nối nếu không ở mock mode
    if (isMockMode) {
      console.info('ℹ️ App đang chạy ở chế độ mock mode. Supabase connection check đã được bỏ qua.');
      return;
    }

    const checkConnection = async () => {
      try {
        // Sử dụng một bảng chắc chắn có tồn tại, ví dụ 'categories'
        // để việc kiểm tra kết nối đáng tin cậy hơn.
        const { error } = await supabase.from('categories').select('id').limit(1);

        // PostgREST trả về code 'PGRST205' khi không tìm thấy bảng.
        // Driver postgres có thể trả về '42P01'. Ta nên kiểm tra cả hai.
        const tableNotFound = error && (error.code === 'PGRST205' || error.code === '42P01');

        if (tableNotFound) {
          console.warn('🤔 Supabase connection is likely OK, but the test table was not found.', error.message);
        } else if (error) {
          // Các lỗi khác là lỗi kết nối thực sự
          console.error('❌ Supabase connection failed:', error);
        } else {
          console.log('✅ Supabase connection successful!');
        }
      } catch (err) {
        console.error('❌ Supabase connection failed with an exception:', err);
      }
    };
    checkConnection();
  }, []);
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/product/:slug" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/order-tracking" element={<OrderTracking />} />
                  {/* Add other public routes here */}
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="products" element={<Products />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="categories" element={<AdminPlaceholder />} />
                  <Route path="customers" element={<AdminPlaceholder />} />
                  <Route path="reviews" element={<AdminPlaceholder />} />
                  <Route path="promotions" element={<AdminPlaceholder />} />
                  <Route path="banners" element={<AdminPlaceholder />} />
                  <Route path="settings" element={<AdminPlaceholder />} />
                  {/* Add other admin routes here */}
                </Route>

                {/* Catch-all route for 404 - Not Found */}
                <Route path="*" element={<div className="text-center py-20">404 - Not Found</div>} />
              </Routes>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
