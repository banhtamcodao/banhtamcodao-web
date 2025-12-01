import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import CartClient from '../components/CartClient';

export default function Cart() {
    return (
        <div className="bg-[#FFFBF7] min-h-screen">
            {/* Hero Section */}
            <div className="bg-[#FFFBF7] border-b border-gray-100 pt-24 pb-8 shadow-sm">
                <div className="max-w-[1200px] mx-auto px-4">
                    {/* Breadcrumb */}
                    <nav className="flex text-gray-500 text-sm mb-4 items-center flex-wrap">
                        <Link to="/" className="hover:text-[#FF6F30] transition-colors">Trang chủ</Link>
                        <ChevronRight size={16} className="mx-2 text-gray-400" />
                        <span className="font-medium text-gray-800">Giỏ hàng</span>
                    </nav>

                    <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-lobster mb-2">
                                Giỏ Hàng Của Bạn
                            </h1>
                            <p className="text-gray-500">Kiểm tra lại các món ngon trước khi thanh toán nhé!</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cart Content */}
            <div className="container mx-auto px-4 py-8">
                <CartClient />
            </div>
        </div>
    );
}
