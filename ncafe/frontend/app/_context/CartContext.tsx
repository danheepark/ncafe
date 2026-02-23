'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItemOption {
    optionName: string;
    itemName: string;
    priceDelta: number;
}

export interface CartItem {
    id: string; // unique cart item id
    menuId: number;
    korName: string;
    engName: string;
    price: number;
    quantity: number;
    options: CartItemOption[];
    image?: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, 'id'>) => void;
    removeFromCart: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalCount: () => number;
    getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // Local storage persistence
    useEffect(() => {
        const savedCart = localStorage.getItem('ncafe-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart data', e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('ncafe-cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (newItem: Omit<CartItem, 'id'>) => {
        setItems(prev => {
            // Check if same item with same options exists
            const existingIndex = prev.findIndex(item =>
                item.menuId === newItem.menuId &&
                JSON.stringify(item.options) === JSON.stringify(newItem.options)
            );

            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex].quantity += newItem.quantity;
                return updated;
            }

            return [...prev, { ...newItem, id: Math.random().toString(36).substr(2, 9) }];
        });
    };

    const removeFromCart = (cartItemId: string) => {
        setItems(prev => prev.filter(item => item.id !== cartItemId));
    };

    const updateQuantity = (cartItemId: string, quantity: number) => {
        if (quantity < 1) return;
        setItems(prev => prev.map(item =>
            item.id === cartItemId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => setItems([]);

    const getTotalCount = () => items.reduce((sum, item) => sum + item.quantity, 0);

    const getTotalPrice = () => items.reduce((sum, item) => {
        const optionTotal = item.options.reduce((oSum, opt) => oSum + opt.priceDelta, 0);
        return sum + (item.price + optionTotal) * item.quantity;
    }, 0);

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getTotalCount,
            getTotalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
