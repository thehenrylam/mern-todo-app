import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
    TODOLIST_PAGE_ENDPOINT,
    LOGIN_PAGE_ENDPOINT,
    REGISTER_PAGE_ENDPOINT
} from "../constants";

class Landing extends Component {
    
    constructor(props) {
        super(props);

        this.renderNotLoggedInButtons = this.renderNotLoggedInButtons.bind(this);
        this.renderLoggedInButtons = this.renderLoggedInButtons.bind(this);

        this.state = {
            loggedIn: false
        };
    }

    componentDidMount() {
        // If logged in then update the landing page's state
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

    renderNotLoggedInButtons() {
        return (
        <div style={{display:"flex", justifyContent:"center"}}>
            <div className="form-group">
                <Link 
                    to={REGISTER_PAGE_ENDPOINT}
                    className="btn btn-primary"
                    style={{
                        marginRight:"1rem", 
                        marginLeft:"1rem"
                    }}
                >
                    Register
                </Link>
            </div>
            <div className="form-group">
                <Link 
                    to={LOGIN_PAGE_ENDPOINT}
                    className="btn btn-primary"
                    style={{
                        marginRight:"1rem", 
                        marginLeft:"1rem"
                    }}
                >
                    Log In
                </Link>
            </div>
        </div> 
        );
    }

    renderLoggedInButtons() {
        return (
        <div style={{display:"flex", justifyContent:"center"}}>
            <div className="form-group">
                <Link
                    to={TODOLIST_PAGE_ENDPOINT}
                    className="btn btn-primary"
                    style={{
                        marginRight:"1rem",
                        marginLeft:"1rem"
                    }}
                >
                    Go to Todos List
                </Link>
            </div>
        </div>
        );
    }

    render() {
        return (
    <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
            <div className="col s12">
                <div style={{textAlign:"center"}}>
                <h4>
                    <b>Build</b> a login/auth app with the{" "}
                    <span style={{ fontFamily: "monospace" }}>MERN</span> stack from
                    scratch
                </h4>
                <p className="flow-text grey-text text-darken-1">
                Create a (minimal) full-stack app with user authentication via
                passport and JWTs
                </p>
                </div>
                <br />
                {this.state.loggedIn ? 
                    this.renderLoggedInButtons() : 
                    this.renderNotLoggedInButtons()}
            </div>
        </div>
    </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

// export default Landing;
export default connect(
    mapStateToProps,
    {}
)(Landing);