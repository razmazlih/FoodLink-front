import axios from "axios";
import { API_DISHBOARD_URL } from "../../../config";

export const getRestaurants = async () => {
    try {
        const { data } = await axios.get(`${API_DISHBOARD_URL}/restaurants/info/`);
        return data;
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        throw error;
    }
};