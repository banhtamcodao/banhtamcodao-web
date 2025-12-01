import { useState, useMemo, useEffect } from 'react';
import { Eye, Edit, Search } from 'lucide-react';
import OrderDetailModal from '../../components/admin/OrderDetailModal';
import OrderEditModal from '../../components/admin/OrderEditModal';
import { supabase } from '../../lib/supabase';
import type { Order } from '../../types/database';

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ searchTerm: '', orderStatus: '', paymentStatus: '' });
    const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('order_time', { ascending: false });
        
        if (error) {
            console.error('Error fetching orders:', error);
        } else {
            setOrders(data);
        }
        setLoading(false);
    };

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const searchTerm = filters.searchTerm.toLowerCase();
            const searchMatch = !searchTerm ||
                order.order_code.toLowerCase().includes(searchTerm) ||
                order.recipient_name.toLowerCase().includes(searchTerm) ||
                order.phone_number.includes(searchTerm);
            const statusMatch = !filters.orderStatus || order.status === filters.orderStatus;
            const paymentStatusMatch = !filters.paymentStatus || order.payment_status === filters.paymentStatus;
            return searchMatch && statusMatch && paymentStatusMatch;
        });
    }, [orders, filters]);

    const handleSaveEditModal = (data: Order) => {
        // Optimistic update
        setOrders(prev => prev.map(o => (o.id === data.id ? { ...o, ...data } : o)));
        setEditingOrder(null);
        // No need to refetch, data is updated locally.
        // For production, you might want to refetch to ensure data consistency.
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: '2-digit' });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Đơn hàng</h1>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm theo mã đơn, tên, SĐT..."
                        value={filters.searchTerm}
                        onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>
                <div className="sm:w-48">
                    <select
                        value={filters.orderStatus}
                        onChange={(e) => setFilters(prev => ({ ...prev, orderStatus: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                    >
                        <option value="">Trạng thái đơn</option>
                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                        <option value="Đã xác nhận">Đã xác nhận</option>
                        <option value="Đang vận chuyển">Đang vận chuyển</option>
                        <option value="Hoàn thành">Hoàn thành</option>
                        <option value="Đã hủy">Đã hủy</option>
                    </select>
                </div>
                <div className="sm:w-48">
                    <select
                        value={filters.paymentStatus}
                        onChange={(e) => setFilters(prev => ({ ...prev, paymentStatus: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                    >
                        <option value="">Thanh toán</option>
                        <option value="paid">Đã thanh toán</option>
                        <option value="unpaid">Chưa thanh toán</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 whitespace-nowrap">Mã Đơn</th>
                                <th className="px-6 py-4 whitespace-nowrap">Ngày đặt</th>
                                <th className="px-6 py-4 whitespace-nowrap">Khách Hàng</th>
                                <th className="px-6 py-4 whitespace-nowrap">SĐT</th>
                                <th className="px-6 py-4 whitespace-nowrap">Thanh toán</th>
                                <th className="px-6 py-4 whitespace-nowrap">Trạng thái</th>
                                <th className="px-6 py-4 whitespace-nowrap text-right">Tổng Tiền</th>
                                <th className="px-6 py-4 whitespace-nowrap text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-mono text-xs text-blue-600">{order.order_code}</td>
                                    <td className="px-6 py-4 text-gray-600">{formatDate(order.order_time)}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800">{order.recipient_name}</td>
                                    <td className="px-6 py-4 text-gray-600">{order.phone_number}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                            order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {order.payment_status === 'paid' ? 'Đã trả' : 'Chưa trả'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-600">
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-800 text-right">{formatCurrency(order.total_amount)}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => setViewingOrder(order)} className="text-gray-500 hover:text-gray-700 p-1.5 rounded-md hover:bg-gray-100 transition-colors">
                                                <Eye size={16} />
                                            </button>
                                            <button onClick={() => setEditingOrder(order)} className="text-blue-500 hover:text-blue-700 p-1.5 rounded-md hover:bg-blue-50 transition-colors">
                                                <Edit size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {viewingOrder && <OrderDetailModal order={viewingOrder} onClose={() => setViewingOrder(null)} />}
            
            {editingOrder && (
                <OrderEditModal
                    order={editingOrder}
                    onClose={() => setEditingOrder(null)}
                    onSave={handleSaveEditModal}
                />
            )}
        </div>
    );
}
