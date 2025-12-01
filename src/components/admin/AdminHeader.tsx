import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Moon, Sun, Settings, Ticket, PictureInPicture, Menu as MenuIcon, X, User } from 'lucide-react';

export default function AdminHeader() {
    const [darkMode, setDarkMode] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileSettingsOpen, setIsMobileSettingsOpen] = useState(false);

    return (
        <>
            <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 md:px-6 flex-shrink-0 sticky top-0 z-20">
                {/* Nút mở menu cài đặt (Mobile) */}
                <button
                    className="md:hidden p-2 rounded-md border border-gray-200 hover:bg-gray-50 active:scale-[0.98] transition"
                    onClick={() => setIsMobileSettingsOpen(true)}
                    aria-label="Mở menu cài đặt admin"
                >
                    <MenuIcon size={20} />
                </button>

                {/* Thanh tìm kiếm */}
                <div className="w-1/2 md:w-1/3 max-w-md hidden sm:block relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={20} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm"
                        placeholder="Tìm kiếm sản phẩm, đơn hàng..."
                    />
                </div>

                {/* Các icon chức năng */}
                <div className="flex items-center gap-2 md:gap-4">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 block h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                            4
                        </span>
                    </button>

                    {/* Tài khoản Admin */}
                    <div className="relative">
                        <div
                            className="hidden sm:flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors"
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        >
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                A
                            </div>
                            <div>
                                <p className="font-semibold text-sm">Admin</p>
                                <p className="text-xs text-gray-500">Quản trị viên</p>
                            </div>
                        </div>

                        {isUserMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                                <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsUserMenuOpen(false)}
                                >
                                    Thông tin tài khoản
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsUserMenuOpen(false)}
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Mobile Admin Settings Drawer */}
            <div
                className={`fixed inset-0 z-[200] ${isMobileSettingsOpen ? '' : 'pointer-events-none'}`}
                aria-hidden={!isMobileSettingsOpen}
            >
                {/* Overlay */}
                <div
                    className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isMobileSettingsOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsMobileSettingsOpen(false)}
                />
                {/* Panel */}
                <div
                    className={`absolute top-0 left-0 h-full w-80 max-w-[85%] bg-white shadow-2xl transition-transform duration-300 ease-in-out ${isMobileSettingsOpen ? 'translate-x-0' : '-translate-x-full'}`}
                    role="dialog"
                    aria-label="Menu cài đặt admin"
                >
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center gap-2">
                            <Settings size={18} />
                            <h3 className="text-base font-semibold">Khu vực Admin</h3>
                        </div>
                        <button
                            className="p-2 rounded-md hover:bg-gray-100"
                            onClick={() => setIsMobileSettingsOpen(false)}
                            aria-label="Đóng menu"
                        >
                            <X size={18} />
                        </button>
                    </div>
                    <nav className="p-2">
                        <ul className="flex flex-col">
                            <li>
                                <Link
                                    to="/admin/promotions"
                                    className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-100 text-secondary"
                                    onClick={() => setIsMobileSettingsOpen(false)}
                                >
                                    <Ticket size={18} />
                                    <span>Quản lý khuyến mãi</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/banners"
                                    className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-100 text-secondary"
                                    onClick={() => setIsMobileSettingsOpen(false)}
                                >
                                    <PictureInPicture size={18} />
                                    <span>Cài đặt Banner</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/settings"
                                    className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-100 text-secondary"
                                    onClick={() => setIsMobileSettingsOpen(false)}
                                >
                                    <Settings size={18} />
                                    <span>Cài đặt chung</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}
