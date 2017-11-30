// Import React components
import React, { Component } from 'react';

import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'
import createBrowserHistory from 'history/createBrowserHistory'

import PiwikReactRouter from 'piwik-react-router';

import NotificationSystem from 'react-notification-system';

import Core from 'alexandria-core';

import { setupWalletEvents, login } from './actions';

// Import Boostrap v4.0.0-alpha.6
import 'bootstrap/dist/css/bootstrap.css';
// Import custom entypo css class & Alexandria css class
import './assets/css/entypo.css';
import './assets/css/alexandria.css';
// Import Bootstrap 4 JS
import 'bootstrap/dist/js/bootstrap.js';

import Navbar from './components/navbar.js';

import Homepage from './components/homepage.js';
import MiniMusicPlayer from './components/miniMusicPlayer.js';
import ContentPage from './components/contentPage.js';
import PublisherPage from './components/PublisherPage.js';
import UserPage from './components/UserPage.js';

import LoginPage from './components/LoginPage.js';
import RegisterPage from './components/RegisterPage.js';

import DMCAForm from './components/DMCAForm.js';

import SearchPage from './components/SearchPage.js';

import LoginPrompt from './components/LoginPrompt.js'

const piwik = PiwikReactRouter({
	url: 'piwik.alexandria.io',
	siteId: 1
})

const history = createBrowserHistory()

const PUBLIC_URL = process.env.PUBLIC_URL;

class App extends Component {
	componentDidMount(){
		this.props.store.dispatch(setupWalletEvents(Core));

		try {
			if (localStorage.username && localStorage.pw){
				this.props.store.dispatch(login(Core, localStorage.username, localStorage.pw));
			}
		} catch (e) {}

		this.setState({NotificationSystem: this.refs.NotificationSystem})
	}
	componentWillUnmount() {
		
	}
	constructor(props) {
		super(props);
		
		this.state = {
			NotificationSystem: undefined	
		};
	}
	render() {
		const supportsHistory = 'pushState' in window.history;
		return (
			<Router 
				forceRefresh={!supportsHistory} 
				basename={PUBLIC_URL + "/"}
				history={piwik.connectToHistory(history)}
			>
				<div>
					{/* This is to add transitions to the app, fade, etc. */}
					<CSSTransitionGroup
						transitionName="fade"
						transitionEnterTimeout={300}
						transitionLeaveTimeout={300}
					/>

					{/* Include all components that need to be rendered above the main container content */}
					<Navbar 
						Core={Core}
						store={this.props.store}
					/>
					<LoginPrompt Core={Core} store={this.props.store} />
					<NotificationSystem ref="NotificationSystem" />

					{/* Include all components that need to be rendered in the main container content */}
					<Switch>
						<Route exact path="/" render={props => <Homepage Core={Core} store={this.props.store} {...props} />} />

						<Route path="/login" render={props => <LoginPage Core={Core} store={this.props.store} {...props} />} />
						<Route path="/register" component={RegisterPage} />
						<Route path="/dmca" component={DMCAForm} />

						<Route path="/pub/:id" render={props => <PublisherPage suggestedContent={this.state.SupportedArtifacts.slice(0,10)} Core={Core} {...props} />} />

						<Route path="/search/:id" render={props => <SearchPage Core={Core} store={this.props.store} {...props} />} />

						<Route path="/user/:page/:type/:id" render={props => <UserPage Core={Core} store={this.props.store} {...props} />} />
						<Route path="/user/:page/:type" render={props => <UserPage Core={Core} store={this.props.store} {...props} />} />
						<Route path="/user/:page" render={props => <UserPage Core={Core} store={this.props.store} {...props} />} />
						
						<Route path="/:id" render={props => 
							<ContentPage Core={Core} store={this.props.store} {...props} piwik={piwik} NotificationSystem={this.state.NotificationSystem} />} 
						/>

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

const NoMatch = ({ match }) => (
	<div className="container justify-content-center text-center">
		<h1 style={{marginTop: "75px", fontSize: "120px"}}>404</h1>
		{match.pathname ? <h3>No match for <code>{match.pathname}</code></h3> : "Page not found"}
	</div>
)

export default App;
