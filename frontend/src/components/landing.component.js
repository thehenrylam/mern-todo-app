import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
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
                <div style={{display:"flex", justifyContent:"center"}}>
                    <div className="form-group">
                        <Link 
                            to="/register" 
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
                            to="/login" 
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
            </div>
        </div>
    </div>
        );
    }
}

export default Landing;