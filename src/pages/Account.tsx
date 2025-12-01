import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { User, Package, LogOut, MapPin, Edit, Settings } from 'lucide-react';

export default function Account() {
    const { user, logout } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-[#FFFBF7] py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-primary/10 p-8 flex flex-col md:flex-row items-center gap-6">
                        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg text-white text-4xl font-bold">
                            {user.full_name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 font-lobster">{user.full_name}</h1>
                            <p className="text-gray-600">{user.email}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-orange-100 text-primary text-xs font-bold rounded-full uppercase tracking-wide">
                                {user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng thân thiết'}
                            </span>
                        </div>
                        <button
                            onClick={logout}
                            className="bg-white text-red-500 hover:bg-red-50 font-bold py-2 px-6 rounded-xl border border-red-100 shadow-sm transition-colors flex items-center gap-2"
                        >
                            <LogOut size={18} />
                            Đăng xuất
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Sidebar Menu */}
                        <div className="space-y-2">
                            <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary/5 text-primary font-bold rounded-xl border border-primary/10">
                                <User size={20} />
                                Thông tin tài khoản
                            </button>
                            <Link to="/order-tracking" className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 font-medium rounded-xl transition-colors">
                                <Package size={20} />
                                Lịch sử đơn hàng
                            </Link>
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 font-medium rounded-xl transition-colors">
                                <MapPin size={20} />
                                Sổ địa chỉ
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 font-medium rounded-xl transition-colors">
                                <Settings size={20} />
                                Cài đặt
                            </button>
                        </div>

                        {/* Main Content Area */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Thông tin cá nhân</h3>
                                    <button className="text-primary hover:text-orange-600 flex items-center gap-1 text-sm font-medium">
                                        <Edit size={16} /> Chỉnh sửa
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-gray-500 uppercase font-bold">Họ và tên</label>
                                            <p className="text-gray-900 font-medium">{user.full_name}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 uppercase font-bold">Email</label>
                                            <p className="text-gray-900 font-medium">{user.email}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 uppercase font-bold">Số điện thoại</label>
                                            <p className="text-gray-900 font-medium">Chưa cập nhật</p>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 uppercase font-bold">Ngày tham gia</label>
                                            <p className="text-gray-900 font-medium">01/12/2025</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                                <h3 className="text-lg font-bold text-blue-900 mb-2">Đơn hàng gần đây</h3>
                                <p className="text-blue-700 text-sm mb-4">Bạn chưa có đơn hàng nào gần đây.</p>
                                <Link to="/menu" className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                    Đặt món ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
