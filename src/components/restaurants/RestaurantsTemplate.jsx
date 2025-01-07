import { useCallback, useContext, useEffect, useState } from 'react';
import { getRestaurantOpeningHours } from '../../services/DishBoard/restaurants/api';
import { useNavigate } from 'react-router-dom';
import { fetchAllOrders, fetchOrder } from '../../services/OrderLine/order/api';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

function RestaurantsTemplate({ restaurant }) {
    const navigate = useNavigate();
    const [openingHours, setOpeningHours] = useState([]);
    const [isOpenNow, setIsOpenNow] = useState(false);
    const [hasActiveReservation, setHasActiveReservation] = useState(false);
    const { userId } = useContext(AuthContext);
    const { updateCart } = useContext(CartContext);
    const [myReservations, setMyReservations] = useState(JSON.parse(localStorage.getItem('myReservations')) || []);

    useEffect(() => {
        const checkReservation = async (restaurantId, userId) => {
            try {
                const isReservationFound = myReservations.some(
                    (order) =>
                        order.restaurant_id === restaurantId &&
                        order.restaurant_id === Number(userId)
                );
    
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
                localStorage.setItem('myReservations', JSON.stringify(response));
            })
        }
    }, [userId]);

    const checkIfOpenNow = useCallback(() => {
        const now = new Date();
        const currentDay = now.toLocaleString('he-IL', { weekday: 'long' });
        const currentTime = now.toTimeString().split(' ')[0];

        const todaySchedule = openingHours.find(
            (day) => day.day_of_week === currentDay
        );

        if (todaySchedule && todaySchedule.is_open) {
            const [openingTime, closingTime] = [
                todaySchedule.opening_time,
                todaySchedule.closing_time,
            ];

            setIsOpenNow(
                currentTime >= openingTime && currentTime <= closingTime
            );
        } else {
            setIsOpenNow(false);
        }
    }, [openingHours]);

    useEffect(() => {
        checkIfOpenNow();
    }, [openingHours, checkIfOpenNow]);

    const fetchRestaurantOpeningHours = async (restaurantId) => {
        try {
            const data = await getRestaurantOpeningHours(restaurantId);
            setOpeningHours(data);
        } catch (error) {
            console.error('Error fetching opening hours:', error);
        }
    };

    function handleClick() {
        navigate(`/restaurants/${restaurant.id}`);
    }

    async function comtinueOrder(restaurantId) {
        const reservation = myReservations.find(
            (order) => order.restaurant_id === restaurantId
        );

        if (reservation) {
            fetchOrder(reservation.id).then((order) => {
                updateCart(order.items);
                handleClick()
            });
        } else {
            console.warn('No reservation found for this restaurant.');
        }
    }

    return (
        <div>
            <h3>{restaurant.name}</h3>
            <p>
                {restaurant.address}, {restaurant.city}
            </p>
            <p>Status: {isOpenNow ? 'Open' : 'Close'}</p>
            {userId ? (
                <>
                    <p>
                        {hasActiveReservation ? (
                            <button onClick={() => comtinueOrder(restaurant.id)}>
                                Continue Ordering
                            </button>
                        ) : (
                            <button onClick={handleClick}>Order Now</button>
                        )}
                    </p>
                </>
            ) : (
                <>
                    <button onClick={handleClick}>View Menu</button>
                </>
            )}
        </div>
    );
}

export default RestaurantsTemplate;
