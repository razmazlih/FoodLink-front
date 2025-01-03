import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState(false);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        setCart(cartItems || []);
    }, []);

    const saveCart = () => {
        localStorage.setItem('cartItems', JSON.stringify(cart));
    };

    const addToCart = (item) => {
        setCart([...cart, item]);
        saveCart();
    };

    const removeFromCart = (itemId) => {
        setCart(cart.filter((item) => item.id!== itemId));
        saveCart();
    };

    const clearCart = () => {
        localStorage.removeItem('cartItems');
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};