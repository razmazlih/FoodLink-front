import { useContext, useEffect, useState } from 'react';
import {
    deleteOrder,
    fetchAllOrders,
    fetchOrder,
} from '../../services/OrderLine/order/api';
import { AuthContext } from '../../context/AuthContext';
import { getRestaurantsNamesAndIds } from '../../services/DishBoard/restaurants/api';
import { useNavigate } from 'react-router-dom';
import './Orders.css';
import { CartContext } from '../../context/CartContext';

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
            const sortedOrders = orders.sort((a, b) => {
                const statusA = a.status?.[a.status.length - 1]?.updated_at;
                const statusB = b.status?.[b.status.length - 1]?.updated_at;

                if (!statusA && statusB) {
                    return -1;
                }

                if (statusA && !statusB) {
                    return 1;
                }

                if (statusA && statusB) {
                    const dateA = new Date(statusA);
                    const dateB = new Date(statusB);
                    return dateB - dateA;
                }

                return a.id - b.id;
            });
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
        const filteredOrders = myOrders.filter((order) => order.id !== orderId);
        setMyOrders(filteredOrders);
        localStorage.setItem('myOrders', JSON.stringify(filteredOrders));
        localStorage.removeItem('orderId');
        localStorage.removeItem('cartItems');
    };

    const hundleContinueCart = (restaurantId, inNavigate) => {
        const reservation = myReservations.find((order) => {
            return (
                order.restaurant_id === restaurantId &&
                order.status.length === 0
            );
        });

        if (reservation) {
            fetchOrder(reservation.id).then((order) => {
                updateCart(order.items, order.id);
                navigate(inNavigate);
            });
        } else {
            console.warn('No reservation found for this restaurant.');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const hundleDeleteMyOrder = async (orderId) => {
        await deleteOrder(orderId);
        const filteredOrders = myOrders.filter((order) => order.id !== orderId);
        setMyOrders(filteredOrders);
        localStorage.setItem('myOrders', JSON.stringify(filteredOrders));
        updateCart([], '');
    };

    const showingOrders = myOrders.map(
        (order) =>
            order.total_price > 0 && (
                <div key={order.id} className="order-item">
                    <h2>
                        {restaurantMap[order.restaurant_id]} -{' '}
                        {order.total_price}₪
                    </h2>
                    {order.status.length === 0 ? (
                        <>
                            <button
                                className="continue-ordering"
                                onClick={() =>
                                    hundleContinueCart(
                                        order.restaurant_id,
                                        `/restaurants/${order.restaurant_id}/`
                                    )
                                }
                            >
                                Continue Ordering
                            </button>
                            <button
                                className="checkout-order"
                                onClick={() =>
                                    hundleContinueCart(
                                        order.restaurant_id,
                                        `/my-orders/checkout/${order.id}`
                                    )
                                }
                            >
                                Checkout
                            </button>
                            <button
                                className="delete-order"
                                onClick={() => {
                                    Number(order.id) === Number(orderId)
                                        ? hundleDeleteMyOrder(order.id)
                                        : hundleDeleteOrder(order.id);
                                }}
                            >
                                Delete Order
                            </button>
                        </>
                    ) : (
                        <>
                            <p>
                                <span className="updated-time">
                                    <span>
                                        updated time:{' '}
                                        {formatDate(
                                            order.status[
                                                order.status.length - 1
                                            ].updated_at
                                        )}
                                    </span>
                                </span>
                            </p>
                            <div>
                                <span
                                    className={
                                        order.status[order.status.length - 1]
                                            .status === 'active'
                                            ? 'order-status-active'
                                            : 'order-status-delivered'
                                    }
                                >
                                    Order is{' '}
                                    {
                                        order.status[order.status.length - 1]
                                            .status
                                    }
                                </span>
                            </div>
                        </>
                    )}
                </div>
            )
    );

    return (
        <div className="orders-container">
            <h2>My Orders</h2>
            <button
                className="start-new-order"
                onClick={() => navigate('/restaurants')}
            >
                View Restaurants
            </button>
            {showingOrders}
        </div>
    );
}

export default Orders;
