import { useEffect, useState } from 'react';
import RestaurantSearch from './RestaurantSearch';
import RestaurantsTemplate from './RestaurantsTemplate';
import { getRestaurants } from '../../services/DishBoard/restaurants/api';

function RestaurantsMain() {
    const [searchTerm, setSearchTerm] = useState('');
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const data = await getRestaurants();
            setRestaurants(data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const showRestaurants = (
        <div>
            {filteredRestaurants.map((restaurant) => (
                <RestaurantsTemplate key={restaurant.id} restaurant={restaurant} />
            ))}
        </div>
    );

    return (
        <div>
            <RestaurantSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            {showRestaurants}
        </div>
    );
}

export default RestaurantsMain;
