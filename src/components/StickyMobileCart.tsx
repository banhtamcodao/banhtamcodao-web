import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';

export default function StickyMobileCart() {
    const { cartCount, cartTotal } = useCart();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (cartCount > 0) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [cartCount]);

    if (!isVisible) return null;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="fixed bottom-20 left-4 right-4 z-50 md:hidden animate-slide-up">
            <Link
                to="/cart"
                className="bg-[#222629] text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between border border-gray-800"
            >
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 bg-[#FF6F30] rounded-full flex items-center justify-center">
                            <ShoppingCart size={20} className="text-white" />
                        </div>
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-[#222629]">
                            {cartCount}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Tổng cộng</span>
                        <span className="font-bold text-lg leading-none">{formatCurrency(cartTotal)}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                    <span className="font-semibold text-sm">Xem giỏ hàng</span>
                    <i className="fas fa-arrow-right text-xs"></i>
                </div>
            </Link>
        </div>
    );
}
