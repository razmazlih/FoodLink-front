import { useContext, useEffect, useState } from 'react';
import {
    deleteOrder,
    fetchAllOrders,
    fetchOrder,
} from '../../../services/OrderLine/order/api';
import { AuthContext } from '../../../context/AuthContext';
import { getRestaurantsNamesAndIds } from '../../../services/DishBoard/restaurants/api';
import { useNavigate } from 'react-router-dom';
import './Orders.css';
import { CartContext } from '../../../context/CartContext';

function Orders() {
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    const { updateCart, cart, orderId } = useContext(CartContext);
    const [myOrders, setMyOrders] = useState(
        JSON.parse(localStorage.getItem('myOrders')) || []
    );
    const [restaurantMap, setRestaurantMap] = useState(
        JSON.parse(localStorage.getItem('restaurantMap')) || {}
    );
    const [myReservations, setMyReservations] = useState(
        JSON.parse(localStorage.getItem('myReservations')) || []
    );

    useEffect(() => {
        fetchAllOrders(userId).then((orders) => {
            const sortedOrders = orders.sort((a, b) => b.id - a.id)
            localStorage.setItem('myOrders', JSON.stringify(sortedOrders));
            return setMyOrders(sortedOrders);
        });
        getRestaurantsNamesAndIds().then((response) => {
            const map = {};
            response.forEach((restaurant) => {
                map[restaurant.id] = restaurant.name;
            });
            setRestaurantMap(map);
            localStorage.setItem('restaurantMap', JSON.stringify(map));
        });

        if (userId) {
            fetchAllOrders(userId).then((response) => {
                setMyReservations(response);
                localStorage.setItem(
                    'myReservations',
                    JSON.stringify(response)
                );
            });
        }
    }, [userId, cart]);

    const hundleDeleteOrder = (orderId) => {
        deleteOrder(orderId);
        const filteredOrders = myOrders.filter((order) => order.id !== orderId)
        setMyOrders(filteredOrders);
        localStorage.setItem('myOrders', JSON.stringify(filteredOrders));
        localStorage.removeItem('orderId');
        localStorage.removeItem('cartItems');
    };

    const hundleContinueOrdering = (restaurantId) => {
        const reservation = myReservations.find((order) => {
            return (
                order.restaurant_id === restaurantId &&
                order.status.length === 0
            );
        });

        if (reservation) {
            fetchOrder(reservation.id).then((order) => {
                updateCart(order.items, order.id);
                navigate(`/restaurants/${restaurantId}/`);
            });
        } else {
            console.warn('No reservation found for this restaurant.');
        }
    };

    const hundleDeleteMyOrder = async (orderId) => {
        await deleteOrder(orderId);
        const filteredOrders = myOrders.filter((order) => order.id !== orderId)
        setMyOrders(filteredOrders);
        localStorage.setItem('myOrders', JSON.stringify(filteredOrders));
        updateCart([], '');
    }

    const showingOrders = myOrders.map((order) => (
        <div key={order.id} className="order-item">
            <h2>
                {restaurantMap[order.restaurant_id]} - {order.total_price}₪
            </h2>
            {order.status.length === 0 ? (
                <>
                    <button
                        className="continue-ordering"
                        onClick={() =>
                            hundleContinueOrdering(order.restaurant_id)
                        }
                    >
                        Continue Ordering
                    </button>
                    <button
                        className="delete-order"
                        onClick={() => {Number(order.id) === Number(orderId) ? hundleDeleteMyOrder(order.id) : hundleDeleteOrder(order.id)}}
                    >
                        Delete Order
                    </button>
                </>
            ) : (
                <p><span className={order.status[order.status.length - 1].status === "active" ? "order-status-active" : "order-status-delivered"}>Order is {order.status[order.status.length - 1].status}</span></p>
            )}
        </div>
    ));

    return (
        <div className="orders-container">
            <h2>My Orders</h2>
            {myOrders.length > 0 ? showingOrders : <h2 >No orders</h2>}
        </div>
    );
}

export default Orders;
