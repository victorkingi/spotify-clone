import React, {useEffect} from 'react';
import './App.css';
import Login from "./Login";
import {getTokenFromUrl} from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
    const [{ token }, dispatch] = useDataLayerValue();

    useEffect(() => {
        const hash = getTokenFromUrl();
        window.location.hash = "";
        const _token = hash.access_token;

        if (_token) {
            dispatch({
                type: 'SET_TOKEN',
                token: _token
            })
            
            spotify.setAccessToken(_token);

            spotify.getMe().then(user => {

                dispatch({
                    type: 'SET_USER',
                    user
                })
            })

            spotify.getUserPlaylists().then((playlists) => {
                dispatch({
                    type: 'SET_PLAYLISTS',
                    playlists
                })
            });

            spotify.getMyTopArtists().then((response) =>
                dispatch({
                    type: "SET_TOP_ARTISTS",
                    top_artists: response,
                })
            );

            dispatch({
                type: "SET_SPOTIFY",
                spotify: spotify,
            });

            /**TODO For Developer: replace '37i9dQZEVXcF4yK1GZKF3g' with the actual key found on
             * https://open.spotify.com/playlist/DISCOVER_WEEKLY_KEY when you open your discoverWeekly
             * playlist so as to view your own discover weekly instead of the dummy one
             */

            spotify.getPlaylist('37i9dQZEVXcF4yK1GZKF3g').then(response => {
                dispatch({
                    type: 'SET_DISCOVER_WEEKLY',
                    discover_weekly: response

                })
            })
        }

    }, [token, dispatch]);

  return (
    <div className="app">
        {!token && <Login />}
        {token && <Player spotify={spotify} />}
    </div>
  );
}

export default App;
