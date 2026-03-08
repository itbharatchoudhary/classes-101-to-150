/**
 * Player component that displays the currently selected song and provides audio controls.
 * It uses the useSong hook to access the current song's information, including the poster image, title, and audio URL.
 * If no song is selected, it returns null and does not render anything.
 * The component includes an image element for the song's poster, a heading for the song title, and an audio element with controls to play the song.
 */

import useSong from "../Hooks/useSong"


export default function Player() {

    const { song } = useSong();

    if (!song) return null;

    return (
        <div className="player">

            <img
                src={song.posterUrl}
                width="200"
            />

            <h3>{song.title}</h3>

            <audio
                controls
                src={song.url}
            />

        </div>
    );
}