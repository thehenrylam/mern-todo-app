import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/auth.action";
import classnames from "classnames";

import {
    TODOLIST_PAGE_ENDPOINT
} from "../constants";

class Register extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page,
        // should redirect them to main page
        if (this.props.auth.isAuthenticated) {
            this.props.history.push(TODOLIST_PAGE_ENDPOINT);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push(TODOLIST_PAGE_ENDPOINT);
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

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        console.log(newUser);

        this.props.registerUser(
            newUser,
            this.props.history
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
                            <h3>Register below</h3>
                            <p>Already have an account? <Link to="/login">Log in</Link></p>
                        </div>

                        <form noValidate onSubmit={ this.onSubmit }>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    className={classnames(
                                        "form-control",
                                        { invalid: errors.name }
                                    )}
                                    onChange={ this.onChange }
                                    value={ this.state.name }
                                    error={ errors.name }
                                    id="name"
                                    type="text"
                                />
                                <p style={{color:"red"}}>
                                    {errors.name}
                                </p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    className={classnames(
                                        "form-control",
                                        { invalid: errors.email }
                                    )}
                                    onChange={ this.onChange }
                                    value={ this.state.email }
                                    error={ errors.email }
                                    id="email"
                                    type="email"
                                />
                                <p style={{color:"red"}}>
                                    {errors.email}
                                </p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    className={classnames(
                                        "form-control",
                                        { invalid: errors.password }
                                    )}
                                    onChange={ this.onChange }
                                    value={ this.state.password }
                                    error={ errors.password }
                                    id="password"
                                    type="password"
                                />
                                <p style={{color:"red"}}>
                                    {errors.password}
                                </p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password2">Confirm Password</label>
                                <input
                                    className={classnames(
                                        "form-control",
                                        { invalid: errors.password2 }
                                    )}
                                    onChange={ this.onChange }
                                    value={ this.state.password2 }
                                    error={ errors.password2 }
                                    id="password2"
                                    type="password"
                                />
                                <p style={{color:"red"}}>
                                    {errors.password2}
                                </p>
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">
                                    Sign up
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

// export default Register;
/*
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));
*/
export default connect(
    mapStateToProps,
    { registerUser }
)(Register);