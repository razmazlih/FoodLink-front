import { useContext, useEffect, useState } from 'react';
import { isRestaurantOpen } from '../../services/DishBoard/restaurants/api';
import { useNavigate } from 'react-router-dom';
import { fetchAllOrders, fetchOrder } from '../../services/OrderLine/order/api';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import './RestaurantsTemplate.css';

function RestaurantsTemplate({ restaurant }) {
    const navigate = useNavigate();
    const [isOpenNow, setIsOpenNow] = useState({ status: false });
    const [hasActiveReservation, setHasActiveReservation] = useState(false);
    const { userId } = useContext(AuthContext);
    const { updateCart, createNewCart } = useContext(CartContext);
    const [myReservations, setMyReservations] = useState(
        JSON.parse(localStorage.getItem('myReservations')) || []
    );

    useEffect(() => {
        const checkReservation = async (restaurantId, userId) => {
            try {
                const isReservationFound = myReservations.some((order) => {
                    return (
                        order.restaurant_id === restaurantId &&
                        order.user_id === Number(userId) &&
                        order.status.length === 0
                    );
                });
                setHasActiveReservation(isReservationFound);
            } catch (error) {
                console.error('Error checking reservation:', error);
            }
        };

        fetchRestaurantOpeningHours(restaurant.id);
        if (userId) {
            checkReservation(restaurant.id, userId);
        }
    }, [restaurant.id, userId, myReservations]);

    useEffect(() => {
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

    const fetchRestaurantOpeningHours = async (restaurantId) => {
        try {
            const data = await isRestaurantOpen(restaurantId);
            setIsOpenNow(data);
        } catch (error) {
            console.error('Error fetching opening hours:', error);
        }
    };

    async function handleContainerClick() {
        if (userId) {
            if (hasActiveReservation) {
                const reservation = myReservations.find((order) => {
                    return (
                        order.restaurant_id === restaurant.id &&
                        order.status.length === 0
                    );
                });

                if (reservation) {
                    const order = await fetchOrder(reservation.id);
                    updateCart(order.items, order.id);
                }
            } else {
                createNewCart(userId, restaurant.id);
            }
        }
        navigate(`/restaurants/${restaurant.id}`);
    }

    return (
        <div
            className="restaurant-card"
            onClick={handleContainerClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleContainerClick()}
        >
            <img
                className="restaurant-photo"
                src={restaurant.photo_url}
                alt=""
            />
            <div className="restaurants-info">
                <h3>{restaurant.name}</h3>
                <p
                    className={`tooltip-status ${
                        isOpenNow.is_open ? 'open' : 'close'
                    }`}
                >
                    {isOpenNow.is_open ? 'Open' : 'Close'}
                    <span className="tooltip-text">
                        {isOpenNow.is_open
                            ? `Closes at ${isOpenNow.closes_at.slice(0, 5)}`
                            : isOpenNow.next_day
                            ? `Opens at ${
                                  isOpenNow.next_day
                              } ${isOpenNow.opens_at.slice(0, 5)}`
                            : 'This restaurant not updates its status'}
                    </span>
                </p>
            </div>
            <p>
                {restaurant.address}, {restaurant.city}
            </p>
        </div>
    );
}

export default RestaurantsTemplate;
