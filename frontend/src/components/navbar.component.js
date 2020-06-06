import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/auth.action";

import logo from "../logo.png";
import checkAuthenticated from "../utils/checkAuthenticated.util";
import { connect } from 'react-redux';

import {
    PROFILE_PAGE_ENDPOINT,
    LANDING_PAGE_ENDPOINT,
    TODOLIST_PAGE_ENDPOINT,
    TODOCREATE_PAGE_ENDPOINT,
    LOGIN_PAGE_ENDPOINT,
    REGISTER_PAGE_ENDPOINT
} from "../constants";

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
        var bLoggedIn = this.props.auth.isAuthenticated;
        if (this.state.loggedIn !== bLoggedIn) {
            this.setState({
                loggedIn: bLoggedIn
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        var bLoggedIn = nextProps.auth.isAuthenticated;
        if (this.state.loggedIn !== bLoggedIn) {
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
                to={LOGIN_PAGE_ENDPOINT}
                className="btn btn-secondary"
                style={{
                    marginLeft:"0.5rem", 
                    marginRight:"0.5rem",
                }}
            >
                Log In
            </Link>
            <Link
                to={REGISTER_PAGE_ENDPOINT}
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

    renderTodoUtilityButtons() {
        let id = this.props.auth && this.props.auth.user && this.props.auth.user.id;
        
        if (id === null) {
            id = '';
        }

        return (
        <div className="nav-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                <Link to={TODOLIST_PAGE_ENDPOINT} className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                <Link to={TODOCREATE_PAGE_ENDPOINT} className="nav-link">Create Todo</Link>
                </li>
                <li className="navbar-item">
                <Link to={`${PROFILE_PAGE_ENDPOINT}/${id}`} className="nav-link">Profile</Link>
                </li>
            </ul>
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
                <Link to={LANDING_PAGE_ENDPOINT} className="navbar-brand">MERN-Stack Todo App</Link>
                {this.state.loggedIn ? this.renderTodoUtilityButtons() : () => false}
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