import axios from 'axios';
import { API_USERBASE_URL } from '../config';
import { API_ORDERLINE_URL } from '../config';
import { API_DISHBOARD_URL } from '../config';

export const wakeUpServers = () => {
    const urls = [
        API_USERBASE_URL,
        API_DISHBOARD_URL,
        `${API_ORDERLINE_URL}/api/`
    ];

    urls.forEach(url => {
        axios.get(url)
            .catch(error => {
                if (error.response && error.response.status !== 404) {
                    console.error(`Error waking up server at ${url}:`, error);
                }
            });
    });
};