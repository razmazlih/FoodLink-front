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

export const fetchAllOrders = async (userId) => {
    try {
        const { data } = await axios.get(`${API_ORDERLINE_URL}/orders/`);
        const filteredData = data.filter(
            (order) => Number(order.user_id) === Number(userId)
        );
        return filteredData;
    } catch (error) {
        console.error('Error fetching all orders:', error);
        throw error;
    }
};
