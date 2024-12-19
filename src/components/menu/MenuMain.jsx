import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantById } from '../../services/DishBoard/restaurants/api';

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

    const firstSection = (
        <div>
            <h2>{restaurantInfo.name}</h2>
            <h3>
                {restaurantInfo.address}, {restaurantInfo.city}
            </h3>
        </div>
    );



    return (
        <>
            <div>{firstSection}</div>

        </>
    );
}

export default MenuMain;
