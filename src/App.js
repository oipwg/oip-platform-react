// Import React components
import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'


// Import Boostrap v4.0.0-alpha.6
import 'bootstrap/dist/css/bootstrap.css';
// Import custom entypo css class & Alexandria css class
import './assets/css/entypo.css';
import './assets/css/alexandria.css';

import Navbar from './components/navbar.js';
import Homepage from './components/homepage.js';
import MiniMusicPlayer from './components/miniMusicPlayer.js';
import ContentPage from './components/contentPage.js';
import PublishContainer from './components/publishContainer.js';
import SettingsContainer from './components/settingsContainer.js';

class App extends Component {
	render() {
		const supportsHistory = 'pushState' in window.history;

		return (
			<Router forceRefresh={!supportsHistory} >
				<div>
					{/* This is to add transitions to the app, fade, etc. */}
					<CSSTransitionGroup
						transitionName="fade"
						transitionEnterTimeout={300}
						transitionLeaveTimeout={300}
					/>

					{/* Include all components that need to be rendered above the main container content */}
					<Navbar />

					{/* Include all components that need to be rendered in the main container content */}
					<Switch>
						<Route exact path="/" component={Homepage} />

						<Route path="/audio/:id" render={props => <ContentPage type="audio" {...props} />} />
						<Route path="/video/:id" render={props => <ContentPage type="video" {...props} />} />
						<Route path="/img/:id" render={props => <ContentPage type="img" {...props} />} />
						<Route path="/text/:id" render={props => <ContentPage type="text" {...props} />} />
						<Route path="/pdf/:id" render={props => <ContentPage type="pdf" {...props} />} />
						<Route path="/web/:id" render={props => <ContentPage type="web" {...props} />} />
						<Route path="/game/:id" render={props => <ContentPage type="game" {...props} />} />
						<Route path="/code/:id" render={props => <ContentPage type="code" {...props} />} />

						<Route exact path="/user/upload" component={PublishContainer} />
						<Route exact path="/user/settings" component={SettingsContainer} />

						{/* The switch will render the last Route if no others are found (aka 404 page.) */}
						<Route component={NoMatch} />
					</Switch>

					{/* Include all components that need to be rendered after the main container content */}
					<MiniMusicPlayer display="false" />
				</div>
			</Router>
		);
	}
}

const NoMatch = ({ location }) => (
	<div className="container justify-content-center text-center">
		<h1 style={{marginTop: "75px", fontSize: "120px"}}>404</h1>
		<h3>No match for <code>{location.pathname}</code></h3>
	</div>
)

export default App;
