import { useContext, useEffect, useState } from 'react';
import {
    deleteOrder,
    fetchAllOrders,
    fetchOrder,
} from '../../../services/OrderLine/order/api';
import { AuthContext } from '../../../context/AuthContext';
import { getRestaurantsNamesAndIds } from '../../../services/DishBoard/restaurants/api';
import { useNavigate } from 'react-router-dom';
import './Orders.css'; // Import CSS file
import { CartContext } from '../../../context/CartContext';

function Orders() {
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    const { updateCart } = useContext(CartContext);
    const [myOrders, setMyOrders] = useState([]);
    const [restaurantMap, setRestaurantMap] = useState(
        JSON.parse(localStorage.getItem('restaurantMap')) || {}
    );
    const [myReservations, setMyReservations] = useState(
        JSON.parse(localStorage.getItem('myReservations')) || []
    );

    useEffect(() => {
        fetchAllOrders(userId).then((orders) => setMyOrders(orders));
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
    }, [userId]);

    const hundleDeleteOrder = (orderId) => {
        deleteOrder(orderId);
        setMyOrders(myOrders.filter((order) => order.id !== orderId));
        localStorage.removeItem('orderId');
    };

    const hundleContinueOrdering = (restaurantId) => {
        const reservation = myReservations.find(
            (order) => order.restaurant_id === restaurantId
        );

        if (reservation) {
            fetchOrder(reservation.id).then((order) => {
                updateCart(order.items, order.id);
                navigate(`/restaurants/${restaurantId}/`);
            });
        } else {
            console.warn('No reservation found for this restaurant.');
        }
    };

    const showingOrders = myOrders.map((order) => (
        <div key={order.id} className="order-item">
            <h2>
                {restaurantMap[order.restaurant_id]} - {order.total_price}₪
            </h2>
            <button
                className="continue-ordering"
                onClick={() => hundleContinueOrdering(order.restaurant_id)}
            >
                Continue Ordering
            </button>
            <button
                className="delete-order"
                onClick={() => hundleDeleteOrder(order.id)}
            >
                Delete Order
            </button>
        </div>
    ));

    return <div className="orders-container">{showingOrders && <h2>No orders</h2>}</div>;
}

export default Orders;
