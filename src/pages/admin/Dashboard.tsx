import { useState, useEffect } from 'react';
import { ShoppingCart, CalendarRange, CheckCircle2, XCircle, Utensils, Layers, DollarSign, CalendarDays, CalendarCheck2, Calendar, TrendingUp, Users, Package } from 'lucide-react';
import Skeleton from '../../components/ui/Skeleton';

const StatCard = ({ title, value, icon, color, trend, trendValue }: any) => (
    <div className={`relative overflow-hidden rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 group`}>
        <div className={`absolute top-0 left-0 h-full w-1 bg-[${color}]`} style={{ backgroundColor: color }} />
        <div className="flex items-start justify-between">
            <div className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-wider text-gray-500">{title}</span>
                <span className="mt-1 text-2xl font-bold text-gray-900">{value}</span>
                {trend && trendValue && (
                    <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <TrendingUp size={12} />
                        <span>{trendValue}</span>
                    </div>
                )}
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-md transition-transform group-hover:scale-110 group-hover:rotate-6`} style={{ backgroundColor: color, boxShadow: `0 4px 12px ${color}40` }}>
                {icon}
            </div>
        </div>
    </div>
);

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [newCustomers, setNewCustomers] = useState<any[]>([]);
    const [topProducts, setTopProducts] = useState<any[]>([]);

    useEffect(() => {
        // Simulate data fetching
        setTimeout(() => {
            setRecentOrders([
                { id: '#ORD-001', customer: 'Nguyễn Văn A', total: '150.000 đ', status: 'Hoàn thành' },
                { id: '#ORD-002', customer: 'Trần Thị B', total: '85.000 đ', status: 'Đang giao' },
                { id: '#ORD-003', customer: 'Lê Văn C', total: '210.000 đ', status: 'Chờ xác nhận' },
                { id: '#ORD-004', customer: 'Phạm Thị D', total: '45.000 đ', status: 'Đã hủy' },
                { id: '#ORD-005', customer: 'Hoàng Văn E', total: '320.000 đ', status: 'Hoàn thành' },
            ]);
            setNewCustomers([
                { name: 'Nguyễn Văn A', phone: '0901234567' },
                { name: 'Trần Thị B', phone: '0912345678' },
                { name: 'Lê Văn C', phone: '0923456789' },
            ]);
            setTopProducts([
                { name: 'Bánh Tằm Bì', sold: 120 },
                { name: 'Xíu Mại', sold: 95 },
                { name: 'Bánh Mì', sold: 80 },
                { name: 'Sữa Đậu Nành', sold: 60 },
                { name: 'Chả Giò', sold: 45 },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                <StatCard title="Đơn hàng" value="1,234" icon={<ShoppingCart size={20} />} color="#2563eb" />
                <StatCard title="Trong tháng" value="156" icon={<CalendarRange size={20} />} color="#7c3aed" />
                <StatCard title="Thành công" value="1,180" icon={<CheckCircle2 size={20} />} color="#10b981" />
                <StatCard title="Đã hủy" value="24" icon={<XCircle size={20} />} color="#ef4444" />
                <StatCard title="Món ăn" value="45" icon={<Utensils size={20} />} color="#0ea5e9" />
                <StatCard title="Danh mục" value="8" icon={<Layers size={20} />} color="#f59e0b" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Tổng doanh thu" value="150.5M đ" icon={<DollarSign size={20} />} color="#16a34a" trend={true} trendValue="+12.5%" />
                <StatCard title="Doanh thu tháng" value="12.8M đ" icon={<CalendarDays size={20} />} color="#22c55e" trend={true} trendValue="+5.2%" />
                <StatCard title="Doanh thu tuần" value="3.2M đ" icon={<CalendarCheck2 size={20} />} color="#059669" />
                <StatCard title="Doanh thu ngày" value="450K đ" icon={<Calendar size={20} />} color="#34d399" />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Recent Orders */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-1">
                    <div className="flex items-center gap-2 border-b border-gray-100 p-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <ShoppingCart size={18} />
                        </div>
                        <h3 className="font-semibold text-gray-900">Đơn hàng mới nhất</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500">
                                <tr>
                                    <th className="px-4 py-2 font-medium">Mã ĐH</th>
                                    <th className="px-4 py-2 font-medium">Khách hàng</th>
                                    <th className="px-4 py-2 font-medium">Tổng tiền</th>
                                    <th className="px-4 py-2 font-medium">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i}>
                                            <td className="px-4 py-3"><Skeleton width="60%" /></td>
                                            <td className="px-4 py-3"><Skeleton width="80%" /></td>
                                            <td className="px-4 py-3"><Skeleton width="50%" /></td>
                                            <td className="px-4 py-3"><Skeleton width={60} height={24} variant="rounded" /></td>
                                        </tr>
                                    ))
                                ) : (
                                    recentOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium text-blue-600">{order.id}</td>
                                            <td className="px-4 py-3 text-gray-600">{order.customer}</td>
                                            <td className="px-4 py-3 font-medium text-gray-900">{order.total}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${order.status === 'Hoàn thành' ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20' :
                                                        order.status === 'Đã hủy' ? 'bg-red-50 text-red-700 ring-1 ring-red-600/20' :
                                                            order.status === 'Đang giao' ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20' :
                                                                'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* New Customers */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-1">
                    <div className="flex items-center gap-2 border-b border-gray-100 p-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                            <Users size={18} />
                        </div>
                        <h3 className="font-semibold text-gray-900">Khách hàng mới</h3>
                    </div>
                    <div className="p-4 space-y-4">
                        {loading ? (
                            [...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <Skeleton variant="circular" width={36} height={36} />
                                    <div className="flex-1 space-y-1">
                                        <Skeleton width="60%" />
                                        <Skeleton width="40%" height={12} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            newCustomers.map((customer, i) => (
                                <div key={i} className="flex items-center gap-3 rounded-lg p-2 hover:bg-purple-50 transition-colors">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600">
                                        {customer.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                                        <p className="text-xs text-gray-500">{customer.phone}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Top Products */}
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-1">
                    <div className="flex items-center gap-2 border-b border-gray-100 p-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                            <Package size={18} />
                        </div>
                        <h3 className="font-semibold text-gray-900">Top bán chạy</h3>
                    </div>
                    <div className="p-4 space-y-4">
                        {loading ? (
                            [...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <Skeleton variant="circular" width={28} height={28} />
                                    <div className="flex-1 space-y-1">
                                        <Skeleton width="70%" />
                                        <Skeleton width="100%" height={4} />
                                    </div>
                                    <Skeleton width={40} height={20} variant="rounded" />
                                </div>
                            ))
                        ) : (
                            topProducts.map((product, i) => {
                                const maxSold = Math.max(...topProducts.map(p => p.sold));
                                const percentage = (product.sold / maxSold) * 100;
                                const colors = ['bg-amber-500', 'bg-gray-400', 'bg-amber-600', 'bg-slate-500', 'bg-amber-700'];

                                return (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${colors[i] || 'bg-gray-300'}`}>
                                            {i + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium text-gray-700">{product.name}</span>
                                            </div>
                                            <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${colors[i] || 'bg-gray-300'}`}
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
                                            {product.sold}
                                        </span>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
