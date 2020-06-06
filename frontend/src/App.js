import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken.util";
import { setCurrentUser, logoutUser } from "./actions/auth.action";

import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  LANDING_PAGE_ENDPOINT,
  REGISTER_PAGE_ENDPOINT,
  LOGIN_PAGE_ENDPOINT,
  TODOLIST_PAGE_ENDPOINT,
  TODOEDIT_PAGE_ENDPOINT,
  TODOCREATE_PAGE_ENDPOINT,
  PROFILE_PAGE_ENDPOINT
} from "./constants";

import Navbar from "./components/navbar.component";
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import Landing from "./components/landing.component";
import Register from "./components/register.component";
import Login from "./components/login.component";
import Profile from "./components/profile.component";

import PrivateRoute from "./components/private/private-route.component";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container" style={{marginTop: 20}}>
              <Route exact path={LANDING_PAGE_ENDPOINT} component={Landing} />
              <Route path={REGISTER_PAGE_ENDPOINT} component={Register} />
              <Route path={LOGIN_PAGE_ENDPOINT} component={Login} />
              <Switch>
                <PrivateRoute exact path={TODOLIST_PAGE_ENDPOINT} component={TodosList} />
                <PrivateRoute path={TODOEDIT_PAGE_ENDPOINT + `/:id`} component={EditTodo} />
                <PrivateRoute path={TODOCREATE_PAGE_ENDPOINT} component={CreateTodo} />
                <PrivateRoute path={PROFILE_PAGE_ENDPOINT + `/:id`} component={Profile} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
