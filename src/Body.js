import React from "react";
import "./Body.css";
import Header from "./Header";
import {useDataLayerValue} from "./DataLayer";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SongRow from "./SongRow";

function Body({ spotify }) {
    const [{ discover_weekly, top_artists, showTop }] = useDataLayerValue();

    const goToSpotify = (e) => {
        e.preventDefault();

        if (showTop) {
            window.location.href = top_artists?.items['0'].external_urls.spotify;
        } else {
            window.location.href = discover_weekly?.tracks?.items['0'].track.external_urls.spotify;
        }
    }

    if (showTop) {
        return (
            <div className="body">
                <Header spotify={spotify} />
                <div className="body_info">
                    <img src={top_artists?.items.length > 0 ? top_artists?.items['0'].images[0].url : ''} alt="artist"/>
                    <div className="body_infoText">
                        <strong>PLAYLIST</strong>
                        <h2>TOP ARTISTS</h2>
                        <p>Here are your top artists</p>
                    </div>
                </div>
                <div className="body_songs">
                    <div className="body_icons">
                        <PlayCircleFilledIcon onClick={goToSpotify} className="body_shuffle" />
                        <FavoriteIcon fontSize="large" />
                        <MoreHorizIcon />
                    </div>
                    {top_artists?.items?.map(item => {
                        return (
                            <SongRow key={item.id} item={item} />
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return (
            <div className="body">
                <Header spotify={spotify} />
                <div className="body_info">
                    <img src={discover_weekly?.images[0].url} alt="discoverWeekly"/>
                    <div className="body_infoText">
                        <strong>PLAYLIST</strong>
                        <h2>Discover Weekly</h2>
                        <p>{discover_weekly?.description}</p>
                    </div>
                </div>
                <div className="body_songs">
                    <div className="body_icons">
                        <PlayCircleFilledIcon onClick={goToSpotify} className="body_shuffle" />
                        <FavoriteIcon fontSize="large" />
                        <MoreHorizIcon />
                    </div>
                    {discover_weekly?.tracks.items.map(item => {
                        return (
                            <SongRow key={item.track.uri} track={item.track} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Body;