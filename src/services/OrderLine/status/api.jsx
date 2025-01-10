import axios from 'axios';
import { API_ORDERLINE_URL } from '../../../config';

export const updateCartStatus = async (orderId) => {
    try {
        const { data } = await axios.post(`${API_ORDERLINE_URL}/order-item/`, {
            order_id: orderId,
            status: 'active',
        });
        return data;
    } catch (error) {
        console.error('Error checkout cart:', error);
    }
};
