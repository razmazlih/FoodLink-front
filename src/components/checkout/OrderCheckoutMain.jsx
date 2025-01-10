import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { useParams } from 'react-router-dom';
import { fetchOrder } from '../../services/OrderLine/order/api';
import OrderCheckoutItem from './OrderCheckoutItem';
import OrderSummary from './OrderSummary';

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

    return (
        <div>
            <h1>Order Checkout</h1>
            <OrderCheckoutItem items={cart} />
            <OrderSummary totalPrice={myOrder.totalPrice} />
        </div>
    );
}

export default OrderCheckoutMain;