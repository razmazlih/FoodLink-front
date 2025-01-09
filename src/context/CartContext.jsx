import React, { createContext, useState, useEffect } from 'react';
import { createOrder, fetchOrder } from '../services/OrderLine/order/api';
import { addItemToCart, updateQuantityById } from '../services/OrderLine/order_items/api';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [orderId, setOrderId] = useState(
        localStorage.getItem('orderId') || ''
    );
    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem('cartItems')) || []
    );
    const [showing, setShowing] = useState(false);

    useEffect(() => {
        if (orderId) {
            fetchOrder(orderId)
                .then((fullOrder) => fullOrder.items)
                .then((cartItems) => setCart(cartItems));
        }
    }, [orderId]);

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

        addItemToCart(newOrderItem)
            .then((responeData) => {
                const editedResponse = {
                    id: responeData.id,
                    orderId: responeData.order_id,
                    menu_item_id: responeData.menu_item_id,
                    name: item.name,
                    price: item.price,
                    quantity: responeData.quantity,
                };
                setCart([...cart, editedResponse]);
                saveCart();
            })
            .catch((error) => {
                console.error('Error adding item to cart:', error);
            });
    };

    const updateQuantity = (itemId, newQuantity) => {
        let newItem;
        const updatedCart = cart.map((item) => {
            if (item.id === itemId) {
                newItem = { ...item, quantity: newQuantity };
                return newItem;
            }
            return item;
        });
        updateQuantityById(itemId, newQuantity);
        setCart(updatedCart);
        saveCart();
        return(newItem)
    };

    const removeFromCart = (itemId) => {
        setCart(cart.filter((item) => item.id !== itemId));
        saveCart();
    };

    const updateCart = (items, newOrderId) => {
        setOrderId(newOrderId);
        setCart(items);
        saveCart();
    };

    const createNewCart = (userId, restaurantId) => {
        createOrder(userId, restaurantId).then((order) => {
            setOrderId(order.id);
            localStorage.setItem('orderId', order.id);
            localStorage.removeItem('cartItems');
            setCart([]);
        });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                showing,
                setShowing,
                updateCart,
                createNewCart,
                updateQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
