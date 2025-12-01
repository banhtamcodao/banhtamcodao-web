import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import AdminHeader from '../components/admin/AdminHeader';

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <AdminHeader />
                <main className="flex-grow p-4 md:p-6 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
