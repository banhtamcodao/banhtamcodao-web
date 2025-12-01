import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Kiểm tra xem có phải là placeholder values không
const isPlaceholderUrl = !supabaseUrl || supabaseUrl.includes('your-project.supabase.co');
const isPlaceholderKey = !supabaseAnonKey || supabaseAnonKey.includes('your-anon-key-here');

if (isPlaceholderUrl || isPlaceholderKey) {
    console.warn('⚠️ Supabase environment variables chưa được cấu hình.');
    console.warn('Vui lòng cập nhật file .env với thông tin Supabase thực tế của bạn:');
    console.warn('- VITE_SUPABASE_URL: URL dự án Supabase của bạn');
    console.warn('- VITE_SUPABASE_ANON_KEY: Anon key từ Supabase Dashboard -> Settings -> API');
    console.warn('Hiện tại app sẽ chạy ở chế độ offline/mock mode.');
}

// Tạo Supabase client với giá trị mặc định nếu chưa có config
const finalUrl = isPlaceholderUrl ? 'https://placeholder.supabase.co' : supabaseUrl;
const finalKey = isPlaceholderKey ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder' : supabaseAnonKey;

export const supabase = createClient(finalUrl, finalKey);

// Export flag để biết app có đang ở mock mode không
export const isMockMode = isPlaceholderUrl || isPlaceholderKey;
