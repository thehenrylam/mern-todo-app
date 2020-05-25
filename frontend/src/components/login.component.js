import React, { Component } from "react";
import { Link } from "react-router-dom";

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

                        <form noValidate onSubmit={ this.onSubmit }>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    className="form-control"
                                    onChange={ this.onChange }
                                    value={ this.state.email }
                                    error={ errors.email }
                                    id="email"
                                    type="email"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    className="form-control"
                                    onChange={ this.onChange }
                                    value={ this.state.password }
                                    error={ errors.password }
                                    id="password"
                                    type="password"
                                />
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

export default Login;