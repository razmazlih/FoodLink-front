import axios from 'axios';
import { API_ORDERLINE_URL } from '../../../config';

export const fetchOrder = async (orderId) => {
    if (!orderId || orderId === null) {
        return [];
    }
    try {
        const { data } = await axios.get(
            `${API_ORDERLINE_URL}/orders/${orderId}`
        );
        return data;
    } catch (error) {
        console.error('Error feching order:', error);
        throw error;
    }
};
