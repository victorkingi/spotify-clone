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
                    user: user
                })
            })

            spotify.getUserPlaylists().then((playlists) => {
                dispatch({
                    type: 'SET_PLAYLISTS',
                    playlists: playlists
                })
            });

            /**TODO For Developer: replace 'YOUR_DISCOVER_WEEKLY_KEY' with the actual key found on
             * https://open.spotify.com/playlist/DISCOVER_WEEKLY_KEY when you open your discoverWeekly
             * playlist This is how the key looks like: '68w3rQZEGHcF4yK1GZKF3g'
             */

            spotify.getPlaylist('37i9dQZEVXcF4yK1GZKF3g').then(response => {
                dispatch({
                    type: 'SET_DISCOVER_WEEKLY',
                    discover_weekly: response

                })
            })
        }

    }, [token, dispatch]);

    console.log(token)

  return (
    <div className="app">
        {
            token ? (
                <Player spotify={spotify} />
            ) : (
                <Login />
            )
        }
    </div>
  );
}

export default App;
