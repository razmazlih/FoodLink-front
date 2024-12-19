import { useState } from 'react';
import RestaurantSearch from './RestaurantSearch';
import RestaurantsTemplate from './RestaurantsTemplate';

function RestaurantsMain() {
    const [searchTerm, setSearchTerm] = useState('');

    const restaurants = [
        {
            id: 1,
            name: 'Pizza Heaven',
            city: 'Tel Aviv',
            address: '123 Rothschild Blvd',
        },
        {
            id: 2,
            name: 'Sushi World',
            city: 'Haifa',
            address: '456 Carmel St',
        },
        {
            id: 3,
            name: 'Burger King',
            city: 'Jerusalem',
            address: '789 King David St',
        },
        {
            id: 4,
            name: 'Pasta Paradise',
            city: 'Eilat',
            address: '101 Beachfront Ave',
        },
        {
            id: 5,
            name: 'Falafel Dream',
            city: 'Beer Sheva',
            address: '202 Negev St',
        },
    ];

    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const showRestaurants = (
        <div>
            {filteredRestaurants.map((restaurant, index) => (
                <RestaurantsTemplate key={index} restaurant={restaurant} />
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
