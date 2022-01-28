import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import Discover from "../discover/Discover";
import GenreSelect from "../genres/GenreSelect";
import GenreSearch from "../genres/GenreSearch";
import AlbumDetail from "../albums/AlbumDetail";
import PlaylistDetail from "../playlists/PlaylistDetail";
import AlbumSearch from "../albums/AlbumSearch";
import ArtistSearch from "../artists/ArtistSearch";
import ArtistProfile from "../artists/ArtistProfile";
import SongSearch from "../songs/SongSearch";
import UserProfile from "../users/UserProfile";
import EditProfileForm from "../users/EditProfileForm";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * protected using authorization middleware on the backend, checking if
 * user is logged in and, in certain circumstances, if user is correct user.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({login, signup}) {
  
    return (
        <div>
          <Switch>
  
            <Route exact path="/login">
                <LoginForm login={login}/>
            </Route>

            <Route exact path="/signup">
                <SignupForm signup={signup}/>
            </Route>

            <Route exact path="/playlists/:id">
                <PlaylistDetail />
            </Route>

            <Route exact path="/profile/:username">
                <UserProfile />
            </Route>

            <Route exact path="/profile/:username/edit">
                <EditProfileForm />
            </Route>

            <Route exact path="/discover">
                <Discover />
            </Route>

            <Route exact path="/discover/genres">
                <GenreSelect />
            </Route>

            <Route exact path="/discover/albums">
                <AlbumSearch />
            </Route>

            <Route exact path="/discover/artists">
                <ArtistSearch />
            </Route>

            <Route exact path="/discover/songs">
                <SongSearch />
            </Route>

            <Route exact path="/artists/:id">
                <ArtistProfile />
            </Route>

            <Route exact path="/albums/:id">
                <AlbumDetail />
            </Route>

            <Route exact path="/genres/:genre">
                <GenreSearch />
            </Route>

            <Route exact path="/">
              <Homepage />
            </Route>

            <Redirect to="/" />

          </Switch>
        </div>
    );
  }
  
  export default Routes;

