import React from "react";
import "./SongRow.css";
import numeral from "numeral";

function SongRow({ track, item }) {

    const goToArtist = (e) => {
        e.preventDefault();
        window.location.href = track?.external_urls.spotify || item?.external_urls.spotify;
    }

    return (
        <div id={track?.uri || item?.uri} onClick={goToArtist} className="songRow">
            <img className="songRow_album" src={track?.album?.images[1].url || item.images[1].url || track?.album?.images[0].url || item.images[0].url} alt={track?.name || item.name}/>
            <div className="songRow_info">
                <h1>{track?.name || item.name}</h1>
                {
                    track ? (
                        <p>
                            {track?.artists.map((artist) => artist.name).join(", ")},
                            {track.album.name}
                        </p>
                    ) : (
                        <p>Followers: {numeral(item.followers.total).format("0,0")}, genres: {item?.genres.map((genre) => genre).join(", ")}</p>
                    )
                }
            </div>
        </div>
    )
}
export default SongRow;