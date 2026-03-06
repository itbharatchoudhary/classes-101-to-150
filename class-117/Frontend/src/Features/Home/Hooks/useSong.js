import { getSong } from "../Services/Song.api";
import { useContext } from "react";
import { songContext } from "../Context/Song.context";

export const useSong = ({ children }) => {
    const context = useContext(songContext);

    const { song, setSong, loading, setLoading } = context;

    async function handleGetSong(mood) {
        setLoading(true);
        try {
            const data = await getSong(mood);
            setSong(data);
        } catch (error) {
            console.error("Error fetching song:", error);
        } finally {
            setLoading(false);
        }

    }

    return { song, loading, handleGetSong };
}