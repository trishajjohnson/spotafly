import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import Discover from "../discover/Discover";
import GenreSelect from "../genres/GenreSelect";
import GenreSearch from "../genres/GenreSearch";

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

            <Route exact path="/discover">
                <Discover />
            </Route>

            <Route exact path="/discover/genres">
                <GenreSelect />
            </Route>

            <Route exact path="/genres/:genre">
                <GenreSearch />
            </Route>


            <Route exact path="/">
              <Homepage />
            </Route>

            {/* <Route exact path="/discover/artists">
                <ArtistSearch />
            </Route>

            <Route exact path="/discover/songs">
                <SongSearch />
            </Route>

            <Route exact path="/discover/albums">
                <AlbumSearch />
            </Route> */}
  
            <Redirect to="/" />

          </Switch>
        </div>
    );
  }
  
  export default Routes;

