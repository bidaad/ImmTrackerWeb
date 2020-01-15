import React, { Component } from 'react'
import axios from 'axios'


export default class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: null,
            firstName: null,
            lastName: null,
            password: null,
            success: false,
        };
    };


    handleEmail = (event) => {
        this.setState({ email: event.target.value })
    }
    handleFirstName = (event) => {
        this.setState({ firstName: event.target.value })
    }
    handleLastName = (event) => {
        this.setState({ lastName: event.target.value })
    }

    handlePassword = (event) => {
        this.setState({ password: event.target.value })
    }
    handleConfirmPassword = (event) => {
        this.setState({ confirmPassword: event.target.value })
    }

    submit = () => {

        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const email = this.state.email;
        const password = this.state.password;

        if (this.state.firstName == null) {
            this.setState({ message: { text: 'Please enter first name', class: 'alert-danger' } });
            return;
        }
        if (this.state.lastName == null) {
            this.setState({ message: { text: 'Please enter last name', class: 'alert-danger' } });
            return;
        }
        if (this.state.password == null) {
            this.setState({ message: { text: 'Please enter password', class: 'alert-danger' } });
            return;
        }
        if (this.state.password != this.state.confirmPassword) {
            this.setState({ message: { text: 'Password and confirm password are not equal', class: 'alert-danger' } });
            return;
        }

        axios.post('http://localhost:3000/api/signup/', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        })
            .then((response) => {
                console.log(response.data);

                if (response.data == 'Error')
                    this.setState({ message: { text: 'Error', class: 'alert-danger' } })
                else if (response.data == 'DuplicateEmail')
                    this.setState({ message: { text: 'Email already taken. Please choose another email', class: 'alert-danger' } })
                else {
                    this.setState({ message: { text: 'Success', class: 'alert-success' }, success:true })
                    axios.post('http://localhost:3000/api/login/', {
                        email: email,
                        password: password,
                        firstName: firstName,
                        lastName: lastName
                    })
                        .then((response) => {
                            if (response.data == 'LoginError') {
                                this.setState({ message: 'Invalid user' })
                                return;
                            }
                            console.log('userToken=' + response.data.UserToken);
                            console.log('new user id=' + response.data._id);
                            
                            this.props.setUserInfo(response.data._id, firstName, lastName, email, '', response.data.UserToken)
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

            })
            .catch((error) => {
                console.log(error);
            });

    }

    render() {
        return (
            <div className="card m-5">
                <div className="card-header">Sign Up</div>
                <div className="card-body"><div className="">
                    {this.state.message != null ?
                        <div className={"alert " + this.state.message.class + " mt-1"} >
                            {this.state.message.text}
                        </div>
                        : null}
                    <div className="form-group row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">First Name</label>
                        <div className="col-sm-10">
                            <input type="text" onChange={(e) => this.handleFirstName(e)} className="form-control" id="staticEmail" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Last Name</label>
                        <div className="col-sm-10">
                            <input type="text" onChange={(e) => this.handleLastName(e)} className="form-control" id="staticEmail" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="text" onChange={(e) => this.handleEmail(e)} className="form-control" id="staticEmail" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="staticPassword" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="Password" onChange={(e) => this.handlePassword(e)} className="form-control" id="staticPassword" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="staticPassword" className="col-sm-2 col-form-label">Confirm Password</label>
                        <div className="col-sm-10">
                            <input type="Password" onChange={(e) => this.handleConfirmPassword(e)} className="form-control" id="staticPassword" />
                        </div>
                    </div>
                    {!this.state.success?
                    <div className="text-center p-2">
                        <button className="btn btn-info w-25" onClick={this.submit} >Submit</button>
                    </div>
                    :null}

                </div>
                </div>

            </div>
        )
    }
}
