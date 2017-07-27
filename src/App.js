import React, { Component } from 'react';

import './assets/css/bootstrap.min.css';
import './assets/css/entypo.css';
import './assets/css/alexandria.css';

import Navbar from './components/navbar.js';
import Homepage from './components/homepage.js';
import MiniMusicPlayer from './components/miniMusicPlayer.js';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
    	<div>
      		<Navbar />
      		<Homepage />
      		<MiniMusicPlayer />
    	</div>
    );
  }
}

export default App;
