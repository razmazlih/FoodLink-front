import React, { createContext, useState, useEffect } from 'react';
import { createOrder, fetchOrder } from '../services/OrderLine/order/api';
import { addItemToCart } from '../services/OrderLine/order_items/api';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [orderId, setOrderId] = useState('');
    const [cart, setCart] = useState([]);
    const [showing, setShowing] = useState(false);

    useEffect(() => {
        if (orderId) {
            fetchOrder(orderId)
                .then((fullOrder) => fullOrder.items)
                .then((cartItems) => setCart(cartItems));
        }
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
        localStorage.setItem('orderId', orderId);
    };

    const addToCart = (item) => {
        const newOrderItem = {
            orderId: orderId,
            menuItemId: item.id,
            quantity: 1,
            price: item.price,
        };

        addItemToCart(newOrderItem).then((responeData) => {
            const editedResponse = {
                id: responeData.id,
                orderId: responeData.order_id,
                item_id: responeData.menu_item_id,
                name: item.name,
                price: item.price,
                quantity: responeData.quantity,
            };
            setCart([...cart, editedResponse]);
            saveCart();
        }).catch((error) => {
            console.error('Error adding item to cart:', error);
        })
    };

    const removeFromCart = (itemId) => {
        setCart(cart.filter((item) => item.id !== itemId));
        saveCart();
    };

    const clearCart = (newOrderId = orderId) => {
        localStorage.removeItem('cartItems');
        setOrderId(newOrderId);
        setCart([]);
    };

    const updateCart = (items, newOrderId) => {
        setOrderId(newOrderId);
        setCart(items);
        saveCart();
    };

    const createNewCart = (userId, restaurantId) => {
        createOrder(userId, restaurantId).then((order) => {
            clearCart(order.id);
        });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                showing,
                setShowing,
                updateCart,
                createNewCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
