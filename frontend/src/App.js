import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import Landing from "./components/landing.component";
import Register from "./components/register.component";
import Login from "./components/login.component";

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container" style={{marginTop: 20}}>
            <Route path="/" exact component={TodosList} />
            <Route path="/edit/:id" component={EditTodo} />
            <Route path="/create" component={CreateTodo} />
            <Route path="/landing" component={Landing} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
