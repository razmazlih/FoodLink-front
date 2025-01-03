import { useContext, useEffect, useState } from 'react';
import { fetchAllOrders } from '../../../services/OrderLine/order/api';
import { AuthContext } from '../../../context/AuthContext';
import { getRestaurantsNamesAndIds } from '../../../services/DishBoard/restaurants/api';

function Orders() {
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
        console.log('delete order', orderId);
    }

    const showingOrders = myOrders.map((order) => (
        <div key={order.id}>
        <h2>{restaurantMap[order.restaurant_id]} - {order.total_price}</h2>
        <button>continue ordering</button>
        <button onClick={() => hundleDeleteOrder(order.id)}>delete order</button>
        </div>
    ))

    return (
        <div>
            {showingOrders}
        </div>
    );
}

export default Orders;
