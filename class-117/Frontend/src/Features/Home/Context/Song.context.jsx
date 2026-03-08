import { createContext } from "react";
import { useState } from "react";

export const songContext = createContext();

export const SongContextProvider = ({ children }) => {

    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/Bharat/cohort-2/modify/songs/Channa__Music_Video__Aditya_Rikhari_X_Ravator___Deepesh_Goyal_iOZTF1uIFL",
        "posterUrl": "https://ik.imagekit.io/Bharat/cohort-2/modify/songs/Channa__Music_Video__Aditya_Rikhari_X_Ravator___Deepesh_Goyal_iOZTF1uIFL",
        "title": "Channa (Music Video) Aditya Rikhari X Ravator | Deepesh Goyal",
        "mood": "sad",
    });
    const [loading, setLoading] = useState(null);

    return (
        <songContext.Provider value={{ song, setSong, loading, setLoading }}>
            {children}
        </songContext.Provider>
    );
}

