import React, { useState } from 'react';
import './App.css';
import AddCase from './components/AddCase';
import CaseList from './components/CaseList';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';
import axios from 'axios'
import SignUp from './SignUp';

export const MyContext = React.createContext();

function App() {

  const [userData, setUserData] = useState(null);



  function setUserInfo(userID, firstName, lastName, email, picture, userToken) {
    console.log('userid=' + userID);
    setUserData({ userID: userID, firstName: firstName, lastName: lastName, email: email, picture: picture, userToken: userToken })
  }

  function logout() {
    setUserData(null);

    const cookies = new Cookies();
    cookies.remove('email')
    cookies.remove('googleTokenID')
    cookies.remove('facebookTokenID')
    return <Redirect push to="/home" />;
    //this.setState({ email: null, googleTokenID: null, picture: null })
  }


  return (
    <div className="AppContainer">
      
      <Router >
        <div className="App">
          <div className="topHeader"> 
            <div className="logo"></div>
          </div>
          <div className=" header">
            <div className="row">
              <div className="col">
                <nav >
                  <ul className="mainmenu">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/caselist/">Cases</Link>
                    </li>
                    <li>
                      <Link to="/addcase/">Add Case</Link>
                    </li>
                    <li>
                      <Link to="/mycases/">My Cases</Link>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="col">
                <div className="d-flex flex-row justify-content-end mt-2">
                  {userData != null ?
                    <div className="p-2 avatar">
                      <img className="Avatar" src={userData.picture} alt="" />
                    </div>
                    : null}
                  <div className="p-2">
                    <div className="textalign-right welcomecontainer">
                      {userData != null ?
                        <div className="mt-2"> Welcome <span className="userFullName">{userData.firstName} {userData.lastName}</span></div>
                        : null}

                    </div>
                  </div>
                  <div className="p-2" >
                    {userData == null ?
                      <div>
                      <Link className="headerButton mr-2" to="/login/">Login</Link>
                      <Link className="headerButton" to="/signup/">Sign Up</Link>
                      </div>
                      :
                      <button className="btn btn-link logout" onClick={logout}>Logout</button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="clear"></div>
          <div className="p-2">
            
            <Route path="/" exact component={Home} />
            <Route path="/login/" render={(props) => <Login {...props} setUserInfo={setUserInfo} />} />
            <Route path="/caselist/" component={CaseList} />
            <Route path="/addcase/" render={(props) => <AddCase {...props} userData={userData} />} />
            <Route path="/mycases/" render={(props) => <CaseList {...props} editable={true} shouldAuthorized={true} userData={userData} />} />
            <Route path="/signup/" render={(props) => <SignUp {...props} setUserInfo={setUserInfo} />} />
          </div>
        </div>
      </Router>
                   
    </div>
  );
}

export default App;
