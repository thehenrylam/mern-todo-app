import React, { Component } from "react";
import { Link } from "react-router-dom";

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
                                    className="form-control"
                                    onChange={ this.onChange }
                                    value={ this.state.name }
                                    error={ errors.name }
                                    id="name"
                                    type="text"
                                />
                            </div>

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
                                <label htmlFor="password2">Confirm Password</label>
                                <input
                                    className="form-control"
                                    onChange={ this.onChange }
                                    value={ this.state.password2 }
                                    error={ errors.password2 }
                                    id="password2"
                                    type="password"
                                />
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

export default Register;