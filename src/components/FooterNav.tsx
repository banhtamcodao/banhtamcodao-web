import { NavLink } from 'react-router-dom';
import { Home, Menu, ShoppingCart, ClipboardList, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FooterNav() {
    const { totalItems } = useCart();

    const navItems = [
        { icon: Home, label: 'Trang chủ', path: '/' },
        { icon: Menu, label: 'Thực đơn', path: '/menu' },
        { icon: ShoppingCart, label: 'Giỏ hàng', path: '/cart', badge: totalItems },
        { icon: ClipboardList, label: 'Đơn hàng', path: '/order-tracking' },
        { icon: User, label: 'Tài khoản', path: '/account' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 md:hidden z-50 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 p-2 rounded-lg transition-colors relative ${isActive ? 'text-primary font-bold' : 'text-gray-500 hover:text-primary/70'
                        }`
                    }
                >
                    <div className="relative">
                        <item.icon size={24} />
                        {item.badge !== undefined && item.badge > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {item.badge > 99 ? '99+' : item.badge}
                            </span>
                        )}
                    </div>
                    <span className="text-[10px]">{item.label}</span>
                </NavLink>
            ))}
        </div>
    );
}
