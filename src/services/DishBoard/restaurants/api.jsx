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

export const getRestaurantById = async (id) => {
    try {
        const { data } = await axios.get(`${API_DISHBOARD_URL}/restaurants/info/${id}/`);
        return data;
    } catch (error) {
        console.error("Error fetching restaurant by ID:", error);
        throw error;
    }
};

export const getRestaurantOpeningHours = async (restaurantId) => {
    try {
        const { data } = await axios.get(`${API_DISHBOARD_URL}/restaurants/opening-houers/?restaurant_id=${restaurantId}`);
        return data;
    } catch (error) {
        console.error("Error fetching restaurant opening hours:", error);
        throw error;
    }
};