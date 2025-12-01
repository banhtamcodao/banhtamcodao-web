import { useEffect, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Order } from '../../types/database';

interface OrderDetailModalProps {
    order: Order | null;
    onClose: () => void;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
};

const InfoRow = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div className="flex py-2 border-b border-gray-50 last:border-0">
        <span className="w-32 text-sm text-gray-500 flex-shrink-0">{label}:</span>
        <span className="text-sm font-medium text-gray-900 break-words flex-1">{value}</span>
    </div>
);

const parseItemsList = (itemsList: string) => {
    try {
        // Assuming items_list is a string like: '{"name":"Bánh tằm chay","qty":1,"totalPrice":24000}|||{...}'
        return itemsList.split('|||').map(itemStr => {
            const item = JSON.parse(itemStr);
            return {
                name: item.name || 'N/A',
                qty: item.qty || 0,
                totalPrice: item.totalPrice || 0,
            };
        });
    } catch (error) {
        console.error("Error parsing items_list:", error);
        return [];
    }
};

export default function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
    if (!order) return null;

    const parsedItems = parseItemsList(order.items_list);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <h2 className="text-lg font-bold text-gray-900">
                        Chi Tiết Đơn Hàng {order?.order_code}
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                            <InfoRow label="Mã đơn hàng" value={order.order_code} />
                            <InfoRow label="Khách hàng" value={order.recipient_name} />
                            <InfoRow label="SĐT" value={order.phone_number} />
                            <InfoRow label="Địa chỉ" value={order.delivery_address} />
                            <InfoRow label="Hình thức" value={order.delivery_method} />
                            <InfoRow label="Ngày giao/lấy" value={`${order.delivery_date} lúc ${order.delivery_time}`} />
                            <InfoRow label="Ghi chú" value={order.note || 'Không có'} />
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Danh sách món</h3>
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <ul className="divide-y divide-gray-100">
                                    {parsedItems.map((item, index) => (
                                        <li key={index} className="flex justify-between p-3 text-sm">
                                            <span>
                                                <span className="font-medium">{item.name}</span>
                                                <span className="text-gray-500 ml-2">x {item.qty}</span>
                                            </span>
                                            <span className="font-medium text-gray-900">{formatCurrency(item.totalPrice)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                            <InfoRow label="Tạm tính" value={formatCurrency(order.subtotal)} />
                            <InfoRow label="Phí ship" value={formatCurrency(order.shipping_fee)} />
                            <InfoRow label="Giảm giá" value={formatCurrency(order.discount_amount || 0)} />
                            <InfoRow
                                label="Tổng cộng"
                                value={<span className="text-lg font-bold text-primary">{formatCurrency(order.total_amount)}</span>}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
