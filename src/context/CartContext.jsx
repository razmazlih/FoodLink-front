import React, { createContext, useState, useEffect } from 'react';
import { fetchOrder } from '../services/OrderLine/order/api';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [orderId, setOrderId] = useState('')
    const [cart, setCart] = useState([]);
    const [showing, setShowing] = useState(false);

    useEffect(() => {
        const cartItems = fetchOrder(orderId).then((fullOrder) => fullOrder.items);
        setCart(cartItems);
    }, [orderId]);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        const savedOrderId = localStorage.getItem('orderId');
        if (savedOrderId) {
            setOrderId(savedOrderId);
        }
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

    const updateCart = (items) => {
        setCart(items);
        saveCart();
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, showing, setShowing, updateCart }}>
            {children}
        </CartContext.Provider>
    );
};