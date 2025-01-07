import { useContext, useEffect, useState } from 'react';
import { deleteOrder, fetchAllOrders } from '../../../services/OrderLine/order/api';
import { AuthContext } from '../../../context/AuthContext';
import { getRestaurantsNamesAndIds } from '../../../services/DishBoard/restaurants/api';
import { useNavigate } from 'react-router-dom';
import './Orders.css'; // Import CSS file

function Orders() {
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    const [myOrders, setMyOrders] = useState([]);
    const [restaurantMap, setRestaurantMap] = useState(JSON.parse(localStorage.getItem('restaurantMap')) || {});

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
    }, [userId]);

    const hundleDeleteOrder = (orderId) => {
        deleteOrder(orderId);
        setMyOrders(myOrders.filter((order) => order.id !== orderId));
    };

    const hundleContinueOrdering = (orderId) => {
        navigate(`/restaurants/${orderId}/`);
    };

    const showingOrders = myOrders.map((order) => (
        <div key={order.id} className="order-item">
            <h2>{restaurantMap[order.restaurant_id]} - {order.total_price}₪</h2>
            <button className="continue-ordering" onClick={() => hundleContinueOrdering(order.restaurant_id)}>Continue Ordering</button>
            <button className="delete-order" onClick={() => hundleDeleteOrder(order.id)}>Delete Order</button>
        </div>
    ));

    return (
        <div className="orders-container">
            {showingOrders}
        </div>
    );
}

export default Orders;