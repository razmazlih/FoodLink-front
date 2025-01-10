import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { useParams } from 'react-router-dom';
import { fetchOrder } from '../../services/OrderLine/order/api';

function OrderCheckoutMain() {
    const { orderId } = useParams();
    const { cart } = useContext(CartContext);
    const [myOrder, setMyOrder] = useState([]);

    useEffect(() => {
        const mapItem = JSON.parse(localStorage.getItem('cartNames')) || [];

        fetchOrder(orderId).then((order) => {
            const showOrder = {
                id: order.id,
                items: order.items.map((item) => ({
                    ...item,
                    name: mapItem[item.id] || 'Loading...',
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
            {myOrder.items?.map((item) => (
                <div key={item.id}>
                    <p>{item.name} - {item.price} {item.quantity > 1 && "x " + item.quantity}</p>
                </div>
            ))}
            <h4>Total: {myOrder.totalPrice}</h4>
            <button onClick={() => {console.log('checkout clicked')}}>Checkout</button>
        </div>
    );
}

export default OrderCheckoutMain;
