import axios from 'axios';
import { API_ORDERLINE_URL } from '../../../config';

export const addItemToCart = async (order) => {
    try {
        const { data } = axios.post(`${API_ORDERLINE_URL}/order-item/`, {
            order_id: order.orderId,
            menu_item_id: order.menuItemId,
            quantity: order.quantity,
            price: order.price
        });
        return data;
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
};
