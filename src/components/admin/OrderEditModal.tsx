import { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Order } from '../../types/database';

interface OrderEditModalProps {
    order: Order | null;
    onClose: () => void;
    onSave: (data: Order) => void;
}

export default function OrderEditModal({ order, onClose, onSave }: OrderEditModalProps) {
    const [data, setData] = useState<Partial<Order>>({});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (order) {
            setData(order);
        }
    }, [order]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        if (!order) return;
        setIsSaving(true);

        const updatedFields = {
            status: data.status,
            payment_status: data.payment_status,
            recipient_name: data.recipient_name,
            phone_number: data.phone_number,
            delivery_address: data.delivery_address,
            // note: data.note,
        };

        const { data: updatedData, error } = await supabase
            .from('orders')
            .update(updatedFields)
            .match({ id: order.id })
            .select()
            .single();

        if (error) {
            console.error('Error updating order:', error);
            // Handle error
        } else {
            onSave(updatedData as Order);
        }

        setIsSaving(false);
    };

    if (!order) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <h2 className="text-lg font-bold text-gray-900">
                        Chỉnh Sửa Đơn Hàng: {order.order_code}
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-100 pb-2">Thông tin khách hàng</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tên người nhận</label>
                                <input
                                    type="text"
                                    name="recipient_name"
                                    value={data.recipient_name || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                                <input
                                    type="text"
                                    name="phone_number"
                                    value={data.phone_number || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                                <input
                                    type="text"
                                    name="delivery_address"
                                    value={data.delivery_address || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-100 pb-2">Trạng thái</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái đơn hàng</label>
                                <select
                                    name="status"
                                    value={data.status || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                                >
                                    <option value="Chờ xác nhận">Chờ xác nhận</option>
                                    <option value="Đã xác nhận">Đã xác nhận</option>
                                    <option value="Đang vận chuyển">Đang vận chuyển</option>
                                    <option value="Hoàn thành">Hoàn thành</option>
                                    <option value="Đã hủy">Đã hủy</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái thanh toán</label>
                                <select
                                    name="payment_status"
                                    value={data.payment_status || ''}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                                >
                                    <option value="unpaid">Chưa thanh toán</option>
                                    <option value="paid">Đã thanh toán</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider border-b border-gray-100 pb-2">Ghi chú</h3>
                        <textarea
                            name="note"
                            value={data.note || ''}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h4 className="text-sm font-bold text-blue-800 mb-1">Chỉnh sửa món ăn (sắp có)</h4>
                        <p className="text-xs text-blue-600">Chức năng chỉnh sửa chi tiết các món trong đơn hàng sẽ được phát triển ở phiên bản sau.</p>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white rounded-b-xl">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                </div>
            </div>
        </div>
    );
}
