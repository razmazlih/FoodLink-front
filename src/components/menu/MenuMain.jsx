import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantById } from '../../services/DishBoard/restaurants/api';
import RestaurantInfo from './RestaurantInfo';
import MenuItems from './MenuItems';
import { getRestaurantMenu } from '../../services/DishBoard/menu/api';
import './MenuMain.css';

function MenuMain() {
    const { restaurantId } = useParams();
    const [restaurantInfo, setRestaurantInfo] = useState('');
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [restaurant, menu] = await Promise.all([
                    getRestaurantById(restaurantId),
                    getRestaurantMenu(restaurantId),
                ]);
                setRestaurantInfo(restaurant);
                setMenuItems(menu);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [restaurantId]);

    return (
        <div className="menu-main">
            <div>
                <RestaurantInfo restaurant={restaurantInfo} />
            </div>
            <div>
                <MenuItems menu={menuItems} />
            </div>
        </div>
    );
}

export default MenuMain;
