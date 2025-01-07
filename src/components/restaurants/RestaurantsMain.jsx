import { useEffect, useState } from 'react';
import RestaurantSearch from './RestaurantSearch';
import RestaurantsTemplate from './RestaurantsTemplate';
import { getRestaurants } from '../../services/DishBoard/restaurants/api';
import './RestaurantsMain.css';

function RestaurantsMain() {
    const [searchTerm, setSearchTerm] = useState('');
    const [restaurants, setRestaurants] = useState(JSON.parse(localStorage.getItem('restaurants')) || []);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const data = await getRestaurants();
            localStorage.setItem('restaurants', JSON.stringify(data));
            setRestaurants(data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="restaurants-main">
            <RestaurantSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <div className="restaurants-list">
                {filteredRestaurants.map((restaurant) => (
                    <RestaurantsTemplate key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
}

export default RestaurantsMain;