import React, { Component } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/sethAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import MyNavbar from './components/Navbar';

import Home from './components/Home';
import Footer from './components/Footer';
import Register from './components/auth/Register';
import RegisterNew from './components/auth/RegisterNew';
import Login from './components/auth/Login';

import { Provider } from 'react-redux';

import store from './store';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component  {
  render() {
    return (
      <Provider store={store}>
          <Router>
            <div className="App">
                <header className="App-header">
                  <nav>
                    <MyNavbar />
                  </nav>
                </header>
              <main>
                  <div className='main-content'>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={RegisterNew} />
                  </div>
              </main>
              <Footer />
            </div>
          </Router>
      </Provider>
      
    );
  }
}



export default App;
