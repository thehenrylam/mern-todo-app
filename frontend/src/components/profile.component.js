import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { logoutUser } from "../actions/auth.action";

import {
    API_PROFILE_ENDPOINT,
    API_REMOVEACCT_ENDPOINT
} from "../constants";
import { isCompositeComponent } from 'react-dom/test-utils';
import { connect } from 'react-redux';

class Profile extends Component {

    constructor(props) {
        super(props);

        this.updateStateFromServer = this.updateStateFromServer.bind(this);
        this.onDeleteAccount = this.onDeleteAccount.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);

        this.state = {
            id: null,
            name: null,
            email: null
        }
    }

    componentDidMount() {
        this.updateStateFromServer();
    }

    updateStateFromServer() {
        axios.get(API_PROFILE_ENDPOINT + this.props.match.params.id)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email
                });
            }) 
            .catch(function(error) {
                console.log(error);
            });
    }

    deleteAccount() {
        console.log("delete account");
        console.log(API_REMOVEACCT_ENDPOINT + this.props.match.params.id);
        axios.post(API_REMOVEACCT_ENDPOINT + this.props.match.params.id)
            .then(response => {
                console.log("Sucess!");
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    onDeleteAccount() {
        if (window.confirm('Are you sure about deleting your account')) {
            this.deleteAccount();
            this.props.logoutUser();
        }
    }

    render() {
        return (
        <div>
            <h2>Welcome {this.state.name ? this.state.name : "N/A"}</h2>
            <p>{this.state.email ? this.state.email : "#######@email.com"}</p>
            <div style={{marginTop: "5em", marginBottom: "5em"}}>
                <button 
                    className="btn btn-secondary" 
                    style={{backgroundColor: "maroon", borderColor: "maroon"}}
                    onClick={ this.onDeleteAccount }
                >
                    Delete Account
                </button>
            </div>
        </div>
        );
    }
}

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Profile);