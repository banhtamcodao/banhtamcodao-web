import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    image_url?: string;
    [key: string]: any;
}

interface WishlistContextType {
    wishlistItems: Product[];
    wishlistCount: number;
    isWishlistAnimating: boolean;
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: number) => void;
    isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);

    // Load wishlist from local storage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            try {
                setWishlistItems(JSON.parse(savedWishlist));
            } catch (e) {
                console.error('Failed to parse wishlist from local storage', e);
            }
        }
    }, []);

    // Save wishlist to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = (product: Product) => {
        if (!isInWishlist(product.id)) {
            setWishlistItems(prev => [...prev, product]);
            triggerAnimation();
        }
    };

    const removeFromWishlist = (productId: number) => {
        setWishlistItems(prev => prev.filter(item => item.id !== productId));
    };

    const isInWishlist = (productId: number) => {
        return wishlistItems.some(item => item.id === productId);
    };

    const triggerAnimation = () => {
        setIsWishlistAnimating(true);
        setTimeout(() => setIsWishlistAnimating(false), 700);
    };

    return (
        <WishlistContext.Provider value={{
            wishlistItems,
            wishlistCount: wishlistItems.length,
            isWishlistAnimating,
            addToWishlist,
            removeFromWishlist,
            isInWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        // Fallback for when used outside provider, though ideally shouldn't happen
        return {
            wishlistItems: [],
            wishlistCount: 0,
            isWishlistAnimating: false,
            addToWishlist: () => { },
            removeFromWishlist: () => { },
            isInWishlist: () => false
        };
    }
    return context;
};
