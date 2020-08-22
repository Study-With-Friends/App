import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import axios from 'axios';

import config from './config';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import NoteViewer from './pages/NoteViewer';

import './App.css';

// configure axios
axios.defaults.baseURL = config.apiEndpoint;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  (response) => {
      return response;
  },
  (error) => {
      if (error.response && error.response.status === 401) {
          window.location = '/auth/login';
      }
      return Promise.reject(error);
  }
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={Home} exact />
        <Route path="/auth/login" component={Login} exact/>
        <Route path="/auth/signup" component={Signup} exact/>
        <Route path="/:username" component={Profile} exact/>
        <Route path="/viewer/:noteId" component={NoteViewer} exact/>
      </BrowserRouter>
    </div>
  );
}

export default App;