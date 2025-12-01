import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useState } from 'react';

interface WishlistButtonProps {
    product: any;
    size?: 'small' | 'medium' | 'large';
}

export default function WishlistButton({ product, size = 'medium' }: WishlistButtonProps) {
    const { isWishlistAnimating } = useWishlist();
    const [isLiked, setIsLiked] = useState(false);

    const toggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLiked(!isLiked);
        // TODO: Implement actual wishlist logic
    };

    const sizeClasses = {
        small: 'p-1.5',
        medium: 'p-2',
        large: 'p-3',
    };

    return (
        <button
            onClick={toggleWishlist}
            className={`cursor-pointer rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-all duration-200 ${sizeClasses[size]} group/btn`}
            aria-label={isLiked ? "Bỏ yêu thích" : "Yêu thích"}
        >
            <Heart
                size={size === 'small' ? 16 : 20}
                className={`transition-colors duration-200 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/btn:text-red-500'
                    }`}
            />
        </button>
    );
}
