import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
};

export default function MiniCart() {
    const { cartItems, isMiniCartOpen, closeMiniCart, updateQuantity, removeFromCart, cartTotal } = useCart();
    const [itemToDelete, setItemToDelete] = useState<any>(null);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // No longer locking body scroll for a popover, usually better UX to allow scroll or just lock if needed.
    // For a small popover, locking scroll is annoying. Let's remove it.

    const handleDecreaseQuantity = (itemId: string | number, currentQuantity: number) => {
        if (currentQuantity <= 1) {
            removeFromCart(itemId);
        } else {
            updateQuantity(itemId, currentQuantity - 1);
        }
    };

    if (!isMiniCartOpen) return null;

    return (
        <>
            {/* Transparent Backdrop to close on click outside */}
            <div
                className="fixed inset-0 z-[60] cursor-default"
                onClick={closeMiniCart}
            />

            {/* Mini Cart Popover */}
            <div className="absolute top-full right-0 mt-3 w-[360px] md:w-[400px] bg-white rounded-2xl shadow-2xl z-[70] border border-gray-100 animate-fade-in-up origin-top-right">
                {/* Arrow Pointer */}
                <div className="absolute -top-2 right-3 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-100"></div>

                {/* Header */}
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between relative z-10 bg-white rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-orange-50 text-primary">
                            <ShoppingCart size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 font-lobster">Giỏ hàng</h2>
                            <p className="text-xs text-gray-500">{totalItems} sản phẩm</p>
                        </div>
                    </div>
                    <button
                        onClick={closeMiniCart}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="Empty Cart" className="w-32 h-32 object-contain mb-4 opacity-80" />
                            <p className="text-gray-500 mb-4">Chưa có món ngon nào trong giỏ hàng</p>
                            <Link
                                to="/menu"
                                onClick={closeMiniCart}
                                className="text-primary font-bold hover:underline"
                            >
                                Xem thực đơn ngay
                            </Link>
                        </div>
                    ) : (
                        <div className="p-4 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-3 group">
                                    {/* Image */}
                                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                                        <img
                                            src={item.image_url || '/placeholder.jpg'}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</h3>
                                            <p className="text-primary font-bold text-sm">
                                                {formatCurrency(item.discount_price || item.price)}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-1">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 size={12} /> Xóa
                                            </button>

                                            <div className="flex items-center border border-gray-200 rounded-lg bg-white h-7">
                                                <button
                                                    onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                                                    className="px-2 h-full hover:bg-gray-50 text-gray-600 flex items-center justify-center"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="px-2 text-xs font-bold text-gray-900 min-w-[1.5rem] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-2 h-full hover:bg-gray-50 text-gray-600 flex items-center justify-center"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="p-4 bg-gray-50 rounded-b-2xl border-t border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-gray-900">Tổng cộng:</span>
                            <span className="font-bold text-xl text-primary">{formatCurrency(cartTotal)}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Link
                                to="/cart"
                                onClick={closeMiniCart}
                                className="flex items-center justify-center py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
                            >
                                Xem giỏ hàng
                            </Link>
                            <Link
                                to="/checkout"
                                onClick={closeMiniCart}
                                className="flex items-center justify-center py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-orange-600 transition-colors gap-2"
                            >
                                Thanh toán <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
