import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import type { Product } from '../types/database';

interface ProductCardProps {
    product: Product;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
};

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const hasDiscount = product.discount_price && product.discount_price < product.price;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            discount_price: product.discount_price,
            image_url: product.image_url || '/placeholder.jpg',
            quantity: 1
        });
    };

    return (
        <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 flex flex-col h-full shadow-xl hover:shadow-md">
            {/* Ảnh */}
            <Link to={`/product/${product.slug}`} className="block flex-shrink-0 w-full relative overflow-hidden aspect-square">
                <img
                    src={product.image_url || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </Link>

            {/* Nội dung */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Tên món */}
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 line-clamp-2 mb-2 leading-snug min-h-[2.5rem] md:min-h-[3.5rem]">
                    <Link to={`/product/${product.slug}`} className="hover:text-primary transition-colors">
                        {product.name}
                    </Link>
                </h3>

                {/* Giá và Button */}
                <div className="mt-auto flex flex-col gap-2">
                    <div className="flex flex-col">
                        {hasDiscount ? (
                            <span className="text-base md:text-lg text-gray-500 line-through">
                                {formatCurrency(product.price)}
                            </span>
                        ) : (
                            // Placeholder để giữ layout không bị giật khi không có giảm giá
                            <span className="text-xs md:text-sm opacity-0 select-none">
                                &nbsp;
                            </span>
                        )}
                        <span className={`text-xl md:text-3xl font-bold ${hasDiscount ? 'text-[#FF5B24]' : 'text-gray-900'}`}>
                            {formatCurrency(hasDiscount ? (product.discount_price || 0) : product.price)}
                        </span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="w-full mt-1 cursor-pointer py-3 px-3 rounded-3xl bg-primary text-white text-sm md:text-base font-semibold hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                        aria-label={`Đặt món ${product.name}`}
                    >
                        <ShoppingCart size={22} />
                        <span>Đặt món</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
