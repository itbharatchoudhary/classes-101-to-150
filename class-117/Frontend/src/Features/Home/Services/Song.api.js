import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
}); 

export const getSong = async (mood) => {
    try {
        const response = await api.get(`/song/mood?mood=${mood}`);
        return response.data.songs;
    } catch (error) {
        console.error("Error fetching song:", error);
        throw error;
    }           
}   