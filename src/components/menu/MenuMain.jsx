import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantById } from '../../services/DishBoard/restaurants/api';
import RestaurantInfo from './RestaurantInfo';

function MenuMain() {
    const { id } = useParams();
    const [restaurantInfo, setRestaurantInfo] = useState('');

    useEffect(() => {
        const fetchRestaurantInfo = async () => {
            try {
                setRestaurantInfo(await getRestaurantById(id));
            } catch (error) {
                console.error('Error fetching restaurant info:', error);
            }
        };

        fetchRestaurantInfo();
    }, [id]);


    return (
        <>
            <div><RestaurantInfo restaurant={restaurantInfo} /></div>
        </>
    );
}

export default MenuMain;
