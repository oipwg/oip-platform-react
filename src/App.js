import React, { Component } from 'react';

import './assets/css/bootstrap.min.css';
import './assets/css/entypo.css';
import './assets/css/alexandria.css';

import Navbar from './components/navbar.js';
import Homepage from './components/homepage.js';
import MiniMusicPlayer from './components/miniMusicPlayer.js';
import ContentPage from './components/contentPage.js';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  render() {
  	const supportsHistory = 'pushState' in window.history;

    return (
    	<Router forceRefresh={!supportsHistory} >
      		<div>
      			<Navbar />
	      		<Route exact path="/" component={Homepage} />
	      		<Route path="/video/:id" component={ContentPage} />
	      		<MiniMusicPlayer display="false" />
	      	</div>
    	</Router>
    );
  }
}

export default App;
