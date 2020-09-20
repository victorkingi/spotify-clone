import React from "react";
import "./Footer.css";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import {useDataLayerValue} from "./DataLayer";

function Footer() {
    const [{ discover_weekly }] = useDataLayerValue();
    let track;

    if (discover_weekly?.tracks?.items) {
        track = discover_weekly.tracks.items[Math.floor(Math.random() * (discover_weekly?.tracks?.items.length - 1))].track;
    }

    if (track) {
        return (
            <div className="footer">
                <div className="footer_left">
                    <img className="footer_albumLogo"
                         src={track?.album.images[0].url}
                         alt={track.name}
                    />
                    <div className="footer_songInfo">
                        <h4>{track.name}</h4>
                        <p>{track?.artists.map((artist) => artist.name).join(", ")}</p>
                    </div>
                </div>
                <div className="footer_center">
                    <ShuffleIcon className="footer_green"/>
                    <SkipPreviousIcon className="footer_icon"/>
                    <PlayCircleOutlineIcon fontSize="large" className="footer_icon"/>
                    <SkipNextIcon fontSize="large" className="footer_icon"/>
                    <RepeatIcon className="footer_green"/>
                </div>
                <div className="footer_right">
                    <Grid container spacing={2}>
                        <Grid item>
                            <PlaylistPlayIcon/>
                        </Grid>
                        <Grid item>
                            <VolumeDownIcon/>
                        </Grid>
                        <Grid item xs>
                            <Slider/>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    } else {
        return (
            <div>

            </div>
        )
    }
}

export default Footer;