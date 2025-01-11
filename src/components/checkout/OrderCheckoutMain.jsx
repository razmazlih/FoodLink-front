import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { useParams } from 'react-router-dom';
import { fetchOrder } from '../../services/OrderLine/order/api';
import OrderCheckoutItem from './OrderCheckoutItem';
import OrderSummary from './OrderSummary';
import './OrderCheckout.css';

function OrderCheckoutMain() {
    const { orderId } = useParams();
    const { cart } = useContext(CartContext);
    const [myOrder, setMyOrder] = useState({ items: [], totalPrice: 0 });

    useEffect(() => {
        const mapItemName = JSON.parse(localStorage.getItem('cartNames')) || [];

        fetchOrder(orderId).then((order) => {
            const showOrder = {
                id: order.id,
                items: order.items.map((item) => ({
                    ...item,
                    name: mapItemName[item.id] || 'Loading...',
                })),
                orderedAt: order.ordered_at,
                totalPrice: order.total_price,
            };
            setMyOrder(showOrder);
        });
    }, [orderId, cart]);

    const formatDate = (date) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            timeZone: 'Asia/Jerusalem'
        };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    return (
        <div className="order-checkout-main-container">
            <h1 className="order-checkout-main-title">Order Checkout</h1>
            <p className="order-checkout-main-date">{formatDate(myOrder.orderedAt)}</p>
            <OrderCheckoutItem items={cart} />
            <OrderSummary totalPrice={myOrder.totalPrice} />
        </div>
    );
}

export default OrderCheckoutMain;