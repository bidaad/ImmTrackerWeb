import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios'

import Cookies from 'universal-cookie';
import { withRouter } from "react-router";
import PropTypes from "prop-types";

export default class Login extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props)
        const cookies = new Cookies();
        this.state = {
            firstName: '',
            lastName: '',
            googleTokenID: cookies.get('googleTokenID') || null,
            facebookTokenID: cookies.get('facebookTokenID') || null,
            picture: null,
            message: null,
            isLoading: false,
        };
    };


    handleClick = () => {
        //console.log(this.props.gotoHome());

        //this.props.gotoHome();
        const { match, location, history } = this.props;
        history.push('/addcase')
    }


    getGoogleAccountInfo = (googleTokenID) => {
        fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + googleTokenID)
            .then(response => response.json())
            .then(data => {
                console.log('data.given_name=' + data.given_name);
                
                this.setState({
                    googleTokenID: googleTokenID,
                    firstName: data.given_name,
                    lastName: data.family_name,
                    email: data.email,
                    picture: data.picture,
                })

                this.login(data.given_name, data.family_name, data.email, data.picture, googleTokenID, null);
            }
            );
    }

    responseErrorGoogle = (response) => {
        // console.log(response);

    }


    login = (firstName, lastName, email, picture, googleTokenID, facebookTokenID) => {
        console.log('try login'+ firstName) ;

        axios.post('http://localhost:3000/api/login/', {
            email: email,
            googleTokenID: googleTokenID,
            facebookTokenID: facebookTokenID,
            firstName: firstName,
            lastName: lastName
        })
            .then((response) => {
                if (response.data == 'LoginError') {
                    this.setState({ message: 'Invalid user' })
                    return;
                }
                console.log('userToken=' + response.data.UserToken);
                
                this.props.setUserInfo(response.data._id, firstName, lastName, email, picture, response.data.UserToken)
                const { match, location, history } = this.props;
                history.push({
                    pathname: '/home',
                    userID: response.data._id
                })

            })
            .catch(function (error) {
                console.log(error);

            });
    }

    userPasslogin = () => {
        const email = this.state.email;
        const password = this.state.password;

        axios.post('http://localhost:3000/api/login/', {
            email: email,
            password: password,
        })
            .then((response) => {
                if (response.data == 'LoginError')
                    this.setState({ message: 'Invalid user' })
                else
                    this.setState({ message: 'Success Login' })
                //console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleEmail = (event) => {
        this.setState({ email: event.target.value })
    }
    handlePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    responseGoogle = (response) => {
        this.setState({ isLoading: true });
        //console.log(response);
        if (response.error)
            return
        const cookies = new Cookies();
        cookies.set('googleTokenID', response.tokenId, { path: '/' });
        cookies.set('email', response.email, { path: '/' });
        //alert(response.tokenId);
        this.getGoogleAccountInfo(response.tokenId)

    }

    componentDidMount() {
        if (this.state.googleTokenID != null) {
            //console.log('google' + this.state.googleTokenID + 'sss');

            this.getGoogleAccountInfo(this.state.googleTokenID)
        }
        if (this.state.facebookTokenID != null) {
            console.log('facebook');
            this.getFacebookAccountInfo(this.state.facebookTokenID)
        }

    }

    getFacebookAccountInfo = (accessToken) => {
        const FB = window.FB;

        try {
            if (FB != undefined) {
                FB.api('/me', {
                    access_token: accessToken,
                    fields: 'email,first_name,last_name,picture'
                }, (response) => {
                    const cookies = new Cookies();
                    this.setState({
                        firstName: response.first_name,
                        lastName: response.last_name,
                        email: response.email,
                        picture: response.picture.data.url// 'http://graph.facebook.com/' + userID + '/picture?type=square',
                    })
                    cookies.set('facebookTokenID', accessToken, { path: '/' });
                    cookies.set('email', response.email, { path: '/' });
                    this.login(response.first_name, response.last_name, response.email, response.picture.data.url, null, accessToken);
                    //console.log(response)

                });
            } else {
                // alert the user
            }
        }
        catch (err) {
            console.log(err);

        }

    }
    responseFacebook = (response) => {
        //alert(response)
        //console.log(response);

    }



    loginFacebook = () => {
        const FB = window.FB;
        FB.login((response) => {
            if (response.status === 'connected') {
                const userID = response.authResponse.userID;
                const accessToken = response.authResponse.accessToken;
                //console.log(response)
                this.getFacebookAccountInfo(accessToken)
            }
        }, { scope: 'public_profile,email' });
    }


    render() {
        const Loading = <div className="spinner-border" role="status">        <span className="sr-only">Loading...</span>      </div>;
        if (this.state.isLoading)
            return Loading;
        else
            return (
                <div className="card m-5">
                    <div className="card-header">Login</div>
                    <div className="card-body"><div className="">
                        {this.state.message != null ?
                            <div className="alert alert-danger">
                                {this.state.message}
                            </div>
                            : null}
                        <div className="form-group row">
                            <label htmlFor="staticEmail" className="col-sm-1 col-form-label">Email</label>
                            <div className="col-sm-11">
                                <input type="text" onChange={(e) => this.handleEmail(e)} className="form-control" id="staticEmail" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="staticPassword" className="col-sm-1 col-form-label">Password</label>
                            <div className="col-sm-11">
                                <input type="Password" onChange={(e) => this.handlePassword(e)} className="form-control" id="staticPassword" />
                            </div>
                        </div>
                        <div className="text-center p-2">
                            <button className="btn btn-info w-25" onClick={this.userPasslogin} >Login</button></div>
                        <div className="text-center p-2">
                            <GoogleLogin
                                clientId="969932017635-0hf053p51lgbr1upu0lml156ra1qn06k.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseErrorGoogle}
                                className="w-25"
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        <div className="text-center p-2">
                            <button className="btn btn-dark w-25" onClick={() => this.loginFacebook()}>Facebook Login</button>
                        </div>


                    </div></div>

                </div>

            )
    }
}
