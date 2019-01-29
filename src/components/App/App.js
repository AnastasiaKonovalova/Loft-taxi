import React, { Component } from 'react';
import './App.css';

import Header from '../Header';
import LoginForm from '../LoginForm';
import MapContainer from '../MapContainer';
import OrderForm from '../OrderForm';
import PrivateRoute from '../PrivateRoute';
import ProfileForm from '../ProfileForm';
import RootRouter from '../RootRouter';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div>
            <Header/>
            <LoginForm/>
            <MapContainer/>
            <OrderForm/>
            <PrivateRoute/>
            <ProfileForm/>
            <RootRouter/>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
