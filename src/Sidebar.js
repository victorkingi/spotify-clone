import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {useDataLayerValue} from "./DataLayer";

function Sidebar() {
    const [{ playlists }] = useDataLayerValue();

    return (
        <div className="sidebar">
            <img
                className="sidebar_logo"
                src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                alt="spotify"
            />
            <SidebarOption id="home" Icon={HomeIcon} title="Home" />
            <SidebarOption id="search" Icon={SearchIcon} title="Search" />
            <SidebarOption id="libr" Icon={LibraryMusicIcon} title="Your Library" />
            <SidebarOption id="top" Icon={FavoriteIcon} title="Your Top Artists" />
            <br />
            <strong className="sidebar_title">PLAYLISTS</strong>
            <hr />

            {playlists?.items?.map(playlist => {
                return (
                    <SidebarOption url={playlist.external_urls.spotify} key={playlist.uri} title={playlist.name} />
                    )
            })}

        </div>
    )
}

export default Sidebar;