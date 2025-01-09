import axios from 'axios';
import { API_ORDERLINE_URL } from '../../../config';

export const addItemToCart = (order) => {
    axios
        .post(`${API_ORDERLINE_URL}/order-items/`, {
            order_id: order.id,
            menu_item_id: order.itemId,
            quantity: 1,
            price: 0,
        })
        .then((response) => {
            console.log('Item added to cart:', response.data);
        })
        .catch((error) => {
            console.error('Error adding item to cart:', error);
        });
};
