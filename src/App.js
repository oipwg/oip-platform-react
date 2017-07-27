import React, { Component } from 'react';

import './assets/css/bootstrap.min.css';
import './assets/css/entypo.css';
import './assets/css/alexandria.css';

import Navbar from './components/navbar.js';
import Homepage from './components/homepage.js';
import MiniMusicPlayer from './components/miniMusicPlayer.js';
import ContentPage from './components/contentPage.js';
import PublishContainer from './components/publishContainer.js';

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

	      		<Route path="/audio/:id" render={props => <ContentPage type="audio" {...props} />} />
	      		<Route path="/video/:id" render={props => <ContentPage type="video" {...props} />} />
	      		<Route path="/img/:id" render={props => <ContentPage type="img" {...props} />} />
	      		<Route path="/text/:id" render={props => <ContentPage type="text" {...props} />} />
	      		<Route path="/pdf/:id" render={props => <ContentPage type="pdf" {...props} />} />
	      		<Route path="/web/:id" render={props => <ContentPage type="web" {...props} />} />
	      		<Route path="/game/:id" render={props => <ContentPage type="game" {...props} />} />
	      		<Route path="/code/:id" render={props => <ContentPage type="code" {...props} />} />

	      		<Route exact path="/user/publish" component={PublishContainer} />


	      		<MiniMusicPlayer display="false" />
	      	</div>
    	</Router>
    );
  }
}

export default App;
