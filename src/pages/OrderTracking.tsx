import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, ChevronRight } from 'lucide-react';

// Mock data for demonstration
const MOCK_ORDER = {
    id: 'ORD-8888',
    date: '23/11/2025',
    status: 'shipping', // pending, confirmed, shipping, delivered, cancelled
    items: [
        { name: 'Bánh Tằm Bì Xíu Mại', quantity: 2, price: 45000 },
        { name: 'Sữa Đậu Nành', quantity: 1, price: 15000 },
    ],
    total: 105000,
    timeline: [
        { status: 'pending', label: 'Đơn Hàng Đã Đặt', time: '08:30 23/11/2025', icon: Clock, completed: true },
        { status: 'confirmed', label: 'Đã Xác Nhận', time: '08:45 23/11/2025', icon: CheckCircle, completed: true },
        { status: 'shipping', label: 'Đang Giao Hàng', time: '09:15 23/11/2025', icon: Truck, completed: true, current: true },
        { status: 'delivered', label: 'Giao Thành Công', time: 'Dự kiến 09:45', icon: Package, completed: false },
    ]
};

const OrderTracking = () => {
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState<typeof MOCK_ORDER | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId.trim()) return;

        setLoading(true);
        setError('');
        setOrder(null);

        // Simulate API call
        setTimeout(() => {
            if (orderId === 'ORD-8888') {
                setOrder(MOCK_ORDER);
            } else {
                setError('Không tìm thấy đơn hàng. Vui lòng kiểm tra lại mã đơn hàng.');
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#FFFBF7] pb-20 pt-28">
            <div className="max-w-[1200px] mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-lobster text-[#FF6F30]">Tra Cứu Đơn Hàng</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Nhập mã đơn hàng của bạn để theo dõi trạng thái vận chuyển và thông tin chi tiết.
                    </p>
                </div>

                {/* Search Box */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="bg-white rounded-2xl shadow-lg p-2 flex items-center border border-gray-100 focus-within:border-[#FF6F30] focus-within:ring-4 focus-within:ring-[#FF6F30]/10 transition-all duration-300">
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Nhập mã đơn hàng (Ví dụ: ORD-8888)"
                            className="flex-grow px-6 py-4 bg-transparent outline-none text-gray-700 font-medium placeholder-gray-400"
                        />
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="bg-[#FF6F30] hover:bg-[#e55a20] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-[#FF6F30]/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <Search size={20} />
                                    <span className="hidden sm:inline">Tra Cứu</span>
                                </>
                            )}
                        </button>
                    </div>
                    {error && (
                        <div className="mt-4 p-4 bg-red-50 text-red-500 rounded-xl border border-red-100 flex items-center gap-2 animate-fadeIn">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            {error}
                        </div>
                    )}
                </div>

                {/* Order Result */}
                {order && (
                    <div className="max-w-[1200px] mx-auto animate-fadeInUp">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                            {/* Order Header */}
                            <div className="bg-gradient-to-r from-[#FF6F30] to-[#FF8F50] p-6 text-white flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div>
                                    <p className="text-white/80 text-sm font-medium mb-1">Mã Đơn Hàng</p>
                                    <h2 className="text-2xl font-bold">{order.id}</h2>
                                </div>
                                <div className="text-right">
                                    <p className="text-white/80 text-sm font-medium mb-1">Ngày Đặt</p>
                                    <p className="font-bold">{order.date}</p>
                                </div>
                            </div>

                            <div className="p-6 md:p-10">
                                {/* Status Timeline */}
                                <div className="mb-12 relative">
                                    {/* Progress Bar Background */}
                                    <div className="absolute left-8 top-8 bottom-8 w-1 bg-gray-100 md:hidden"></div>
                                    <div className="absolute top-8 left-8 right-8 h-1 bg-gray-100 hidden md:block"></div>

                                    <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
                                        {order.timeline.map((step, index) => {
                                            const Icon = step.icon;
                                            const isActive = step.completed || step.current;
                                            const isCurrent = step.current;

                                            return (
                                                <div key={index} className="flex md:flex-col items-center md:text-center gap-4 md:gap-4 flex-1">
                                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${isActive
                                                            ? 'bg-gradient-to-br from-[#FF6F30] to-[#FF8F50] text-white shadow-orange-500/30 scale-110'
                                                            : 'bg-white text-gray-300 border-2 border-gray-100'
                                                        }`}>
                                                        <Icon size={28} />
                                                    </div>
                                                    <div className="flex-1 md:flex-none">
                                                        <h3 className={`font-bold text-lg mb-1 ${isActive ? 'text-[#FF6F30]' : 'text-gray-400'}`}>
                                                            {step.label}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 font-medium">{step.time}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                                    {/* Order Items */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                            <Package className="text-[#FF6F30]" />
                                            Chi Tiết Đơn Hàng
                                        </h3>
                                        <div className="space-y-4">
                                            {order.items.map((item, index) => (
                                                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors duration-200">
                                                    <div>
                                                        <p className="font-bold text-gray-800">{item.name}</p>
                                                        <p className="text-sm text-gray-500">x{item.quantity}</p>
                                                    </div>
                                                    <p className="font-bold text-[#FF6F30]">{item.price.toLocaleString()}đ</p>
                                                </div>
                                            ))}
                                            <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
                                                <p className="font-bold text-gray-600">Tổng Tiền</p>
                                                <p className="text-2xl font-bold text-[#FF6F30]">{order.total.toLocaleString()}đ</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Delivery Info */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                            <MapPin className="text-[#FF6F30]" />
                                            Thông Tin Giao Hàng
                                        </h3>
                                        <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#FF6F30] shadow-sm shrink-0">
                                                    <Truck size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800 mb-1">Người Nhận</p>
                                                    <p className="text-gray-600">Nguyễn Văn A</p>
                                                    <p className="text-gray-600">0909 123 456</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#FF6F30] shadow-sm shrink-0">
                                                    <MapPin size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800 mb-1">Địa Chỉ Nhận Hàng</p>
                                                    <p className="text-gray-600">123 Đường ABC, Phường XYZ</p>
                                                    <p className="text-gray-600">Quận 1, TP. Hồ Chí Minh</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderTracking;
