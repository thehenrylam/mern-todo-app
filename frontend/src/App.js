import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken.util";
import { setCurrentUser, logoutUser } from "./actions/auth.action";

import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import Landing from "./components/landing.component";
import Register from "./components/register.component";
import Login from "./components/login.component";

import PrivateRoute from "./components/private/private-route.component";

import logo from "./logo.png";

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
              {/*<Route path="/" exact component={TodosList} />*/}
              {/*<Route path="/edit/:id" component={EditTodo} />*/}
              {/*<Route path="/create" component={CreateTodo} />*/}
              <Route path="/landing" component={Landing} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/" component={TodosList} />
                <PrivateRoute path="/edit/:id" component={EditTodo} />
                <PrivateRoute path="/create" component={CreateTodo} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
