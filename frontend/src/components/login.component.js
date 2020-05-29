import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/auth.action";
import classnames from "classnames";

import {
    TODOLIST_PAGE_ENDPOINT
} from "../constants";

class Login extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page,
        // should redirect them to main page
        if (this.props.auth.isAuthenticated) {
            this.props.history.push(TODOLIST_PAGE_ENDPOINT);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push(TODOLIST_PAGE_ENDPOINT); // push user to dashboard when they login
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        console.log(userData);

        this.props.loginUser(
            userData
        );
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="container" style={{ marginTop: "20px" }}>
                <div className="row">
                    <div className="col s8 offset-s2">

                        <Link to="/" className="btn btn-secondary" style={{ marginBottom: "1rem" }}>
                            Back to home
                        </Link>

                        <div>
                            <h3>Login below</h3>
                            <p>Don't have an account? <Link to="/register">Register</Link></p>
                        </div>

                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    className={classnames(
                                        "form-control", 
                                        { invalid: errors.email || errors.emailnotfound }
                                    )}
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                />
                                <p style={{color:"red"}}>
                                    {errors.email}
                                    {errors.emailnotfound}
                                </p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    className={classnames("form-control", { invalid: errors.password || errors.passwordincorrect })}
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                />
                                <p style={{color:"red"}}>
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </p>
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        );
    }

}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

// export default Login;
export default connect(
    mapStateToProps,
    { loginUser }
)(Login);