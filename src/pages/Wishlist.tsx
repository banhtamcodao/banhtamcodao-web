import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';

export default function Wishlist() {
    // Mock wishlist data for now, or use context if available
    const wishlistItems: any[] = [];

    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#FFFBF7] pt-20 pb-12 px-4">
                <div className="max-w-md mx-auto text-center py-16">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-6">
                        <Heart className="w-12 h-12 text-red-500" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Danh sách yêu thích trống</h2>
                    <p className="text-gray-600 mb-8">Hãy thả tim cho những món ngon bạn yêu thích nhé!</p>
                    <Link
                        to="/menu"
                        className="inline-flex items-center gap-2 bg-primary text-white hover:bg-white hover:text-primary hover:border-primary hover:border-2 font-semibold py-3 px-8 rounded-xl text-lg transition-all"
                    >
                        Khám phá thực đơn
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFBF7] pt-20 pb-12">
            <div className="max-w-[1200px] mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 font-lobster">Danh sách yêu thích</h1>
                {/* Render items here */}
                <p>Danh sách sản phẩm yêu thích sẽ hiển thị ở đây.</p>
            </div>
        </div>
    );
}
