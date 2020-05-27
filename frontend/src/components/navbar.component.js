import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/auth.action";

import logo from "../logo.png";
import setAuthToken from '../utils/setAuthToken.util';
import checkAuthenticated from "../utils/checkAuthenticated.util";
import store from '../store';
import { connect } from 'react-redux';

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.renderNotLoggedInButtons = this.renderNotLoggedInButtons.bind(this);
        this.renderLoggedInButtons = this.renderLoggedInButtons.bind(this);
        this.onLogoutUser = this.onLogoutUser.bind(this);

        this.state = {
            loggedIn: false
        };
    }

    componentDidMount() {
        var bLoggedIn = checkAuthenticated();
        if (this.state.loggedIn !== bLoggedIn)
        {
            this.setState({
                loggedIn: bLoggedIn
            });
        }
    }

    componentDidUpdate() {
        var bLoggedIn = checkAuthenticated();
        if (this.state.loggedIn !== bLoggedIn)
        {
            this.setState({
                loggedIn: bLoggedIn
            });
        }
    }

    onLogoutUser(e) {
        e.preventDefault();
        this.props.logoutUser();

        this.setState({
            loggedIn: checkAuthenticated()
        });
    }

    renderNotLoggedInButtons() {
        return (
        <div style={{
            flexGrow:"8", 
            display:"flex", 
            justifyContent:"right"
        }}>
            <Link
                to="/login"
                className="btn btn-secondary"
                style={{
                    marginLeft:"0.5rem", 
                    marginRight:"0.5rem",
                }}
            >
                Log In
            </Link>
            <Link
                to="/register"
                className="btn btn-primary"
                style={{
                    marginLeft:"0.5rem", 
                    marginRight:"0.5rem",
                }}
            >
                Register
            </Link>
        </div>
        );
    }

    renderLoggedInButtons() {
        return (
        <div style={{
            flexGrow:"8",
            display:"flex",
            justifyContent:"right"
        }}>
            <button
                onClick={this.onLogoutUser}
                className="btn btn-secondary"
                style={{
                    marginLeft:"0.5rem",
                    marginRight:"0.5rem"
                }}
            >
                Log Out
            </button>
        </div>
        );
    }

    render() {
        return (
            <div className="container">          
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="https://duckduckgo.com/">
                <img src={logo} width="30" height="30" alt="Custom logo that I made" />
                </a>
                <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
                <div className="nav-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                    <Link to="/" className="nav-link">Todos</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create Todo</Link>
                    </li>
                </ul>
                </div>
                {this.state.loggedIn ? this.renderLoggedInButtons() : this.renderNotLoggedInButtons()}
            </nav>
            </div>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

// export default Navbar;
export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);