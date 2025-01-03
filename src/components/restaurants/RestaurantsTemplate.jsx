import { useCallback, useEffect, useState } from "react";
import { getRestaurantOpeningHours } from "../../services/DishBoard/restaurants/api";
import { useNavigate } from "react-router-dom";

function RestaurantsTemplate({ restaurant }) {
    const navigate = useNavigate();
    const [openingHours, setOpeningHours] = useState([]);
    const [isOpenNow, setIsOpenNow] = useState(false);

    useEffect(() => {
        fetchRestaurantOpeningHours(restaurant.id);
    }, [restaurant.id]);

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
    
            setIsOpenNow(currentTime >= openingTime && currentTime <= closingTime);
        } else {
            setIsOpenNow(false);
        }
    }, [openingHours]);

    useEffect(() => {
        checkIfOpenNow();
    }, [openingHours, checkIfOpenNow]);

    function handleClick() {
        navigate(`/restaurants/${restaurant.id}`);
    }

    const fetchRestaurantOpeningHours = async (restaurantId) => {
        try {
            const data = await getRestaurantOpeningHours(restaurantId);
            setOpeningHours(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching opening hours:', error);
        }
    };

    return (
        <div>
            <h3>{restaurant.name}</h3>
            <p>
                {restaurant.address}, {restaurant.city}
            </p>
            <p>Status: {isOpenNow ? "Open" : "Close"}</p>
            <button onClick={handleClick}>View Menu</button>
        </div>
    );
}

export default RestaurantsTemplate;