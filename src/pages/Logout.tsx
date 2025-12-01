import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            await logout();
            navigate('/');
        };
        performLogout();
    }, [logout, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFBF7]">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Đang đăng xuất...</p>
            </div>
        </div>
    );
}
