import React, { useEffect, useState } from 'react';
import { getMenuItemNameById } from '../../services/DishBoard/menu/api';

function OrderCheckoutItem({ items }) {
    const [mapItemName, setMapItemName] = useState(
        JSON.parse(localStorage.getItem('cartNames')) || []
    );

    useEffect(() => {
        const fetchDetailsForLoadingItems = async () => {
            for (const item of items) {
                if (item.name === 'Loading...') {
                    getMenuItemNameById(item.menu_item_id)
                        .then((response) => {
                            setMapItemName((prev) => ({
                                ...prev,
                                name: response,
                            }));
                            const cartNames =
                                JSON.parse(localStorage.getItem('cartNames')) ||
                                {};
                            cartNames[item.id] = response;
                            localStorage.setItem(
                                'cartNames',
                                JSON.stringify(cartNames)
                            );
                        })
                        .catch((error) => {
                            console.error(
                                'Error fetching menu item name:',
                                error
                            );
                        });
                }
            }
        };

        fetchDetailsForLoadingItems();
    }, [items]);

    return (
        <div>
            {items.map((item) => (
                <div className="order-checkout-item-container" key={item.id}>
                    <p className="order-checkout-item-name">
                        {mapItemName[item.id]} - {Number(item.price)}₪{' '}
                        {item.quantity > 1 && 'x ' + item.quantity}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default OrderCheckoutItem;
