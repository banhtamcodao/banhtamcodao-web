import { useLocation } from 'react-router-dom';
import { Construction } from 'lucide-react';

export default function AdminPlaceholder() {
    const location = useLocation();
    const pageName = location.pathname.split('/').pop();

    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Construction size={40} className="text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                Quản lý {pageName}
            </h1>
            <p className="text-gray-500 max-w-md">
                Trang này đang được phát triển và sẽ sớm ra mắt trong phiên bản tiếp theo.
            </p>
        </div>
    );
}
