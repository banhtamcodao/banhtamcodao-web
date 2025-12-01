import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ChevronRight, MapPin, Phone, User, CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';

export default function Checkout() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        note: '',
        paymentMethod: 'cod' // cod | banking
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success
        setIsSubmitting(false);
        setOrderSuccess(true);
        clearCart();
    };

    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-[#FFFBF7] flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Đặt hàng thành công!</h2>
                    <p className="text-gray-600 mb-8">
                        Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng.
                    </p>
                    <Link
                        to="/"
                        className="block w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-orange-600 transition-colors"
                    >
                        Về trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#FFFBF7] flex items-center justify-center px-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h2>
                    <Link to="/menu" className="text-primary hover:underline">
                        Quay lại thực đơn
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFBF7] pb-12">
            {/* Header */}
            <div className="bg-[#FFFBF7] border-b border-gray-200 pt-20 pb-6 mb-8">
                <div className="max-w-[1200px] mx-auto px-4">
                    <nav className="flex text-gray-500 text-sm mb-4 items-center">
                        <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
                        <ChevronRight size={16} className="mx-2" />
                        <Link to="/cart" className="hover:text-primary transition-colors">Giỏ hàng</Link>
                        <ChevronRight size={16} className="mx-2" />
                        <span className="font-medium text-secondary">Thanh toán</span>
                    </nav>
                    <h1 className="text-3xl font-bold text-gray-900">Thanh toán</h1>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Shipping Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Customer Info */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-primary" />
                                Thông tin giao hàng
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Họ và tên *</label>
                                    <input
                                        required
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="Nhập họ tên của bạn"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Số điện thoại *</label>
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="Nhập số điện thoại"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Địa chỉ nhận hàng *</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                        <input
                                            required
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                            placeholder="Số nhà, tên đường, phường/xã..."
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Ghi chú đơn hàng</label>
                                    <textarea
                                        name="note"
                                        value={formData.note}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                        placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-primary" />
                                Phương thức thanh toán
                            </h2>
                            <div className="space-y-4">
                                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={formData.paymentMethod === 'cod'}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 text-primary focus:ring-primary border-gray-300"
                                    />
                                    <div className="ml-4">
                                        <span className="block font-medium text-gray-900">Thanh toán khi nhận hàng (COD)</span>
                                        <span className="block text-sm text-gray-500">Thanh toán bằng tiền mặt khi shipper giao hàng đến</span>
                                    </div>
                                </label>
                                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'banking' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="banking"
                                        checked={formData.paymentMethod === 'banking'}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 text-primary focus:ring-primary border-gray-300"
                                    />
                                    <div className="ml-4">
                                        <span className="block font-medium text-gray-900">Chuyển khoản ngân hàng</span>
                                        <span className="block text-sm text-gray-500">Quét mã QR để thanh toán nhanh chóng</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Đơn hàng của bạn</h2>
                            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 flex-shrink-0">
                                            <img src={item.image_url || '/placeholder.jpg'} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-xs text-gray-500">x{item.quantity}</span>
                                                <span className="text-sm font-medium text-gray-900">{formatCurrency((item.discount_price ?? item.price) * item.quantity)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-4 space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Tạm tính</span>
                                    <span>{formatCurrency(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Phí vận chuyển</span>
                                    <span className="text-green-600 font-medium">Miễn phí</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                                    <span>Tổng cộng</span>
                                    <span className="text-red-500">{formatCurrency(cartTotal)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-6 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Đang xử lý...
                                    </>
                                ) : (
                                    'Đặt hàng ngay'
                                )}
                            </button>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                Bằng việc đặt hàng, bạn đồng ý với điều khoản sử dụng của chúng tôi
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
