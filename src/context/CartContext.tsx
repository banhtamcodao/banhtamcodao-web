import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface CartItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image_url: string;
    [key: string]: any;
}

interface CartContextType {
    cartItems: CartItem[];
    isCartAnimating: boolean;
    openMiniCart: () => void;
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string | number) => void;
    updateQuantity: (productId: string | number, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
    closeMiniCart: () => void;
    isMiniCartOpen: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartAnimating, setIsCartAnimating] = useState(false);
    const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

    const openMiniCart = () => setIsMiniCartOpen(true);
    const closeMiniCart = () => setIsMiniCartOpen(false);

    const addToCart = (item: CartItem) => {
        setCartItems(prev => {
            const existingItem = prev.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prev.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                );
            }
            return [...prev, item];
        });
        setIsCartAnimating(true);
        setTimeout(() => setIsCartAnimating(false), 1000);
    };

    const removeFromCart = (productId: string | number) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string | number, quantity: number) => {
        setCartItems(prev => prev.map(item =>
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((total, item) => {
        const price = item.discount_price ?? item.price;
        return total + price * item.quantity;
    }, 0);

    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    const contextValue: CartContextType = {
        cartItems,
        isCartAnimating,
        openMiniCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        closeMiniCart,
        isMiniCartOpen
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
