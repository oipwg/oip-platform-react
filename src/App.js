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

import Core from 'alexandria-core';

import { setupWalletEvents, login } from './actions';

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
import SidebarContainer from './components/sidebarContainer.js';
import MyArtifactsContainer from './components/myArtifactsContainer.js';
import AnalyticsContainer from './components/analyticsContainer.js';
import WalletContainer from './components/walletContainer.js';
import SettingsContainer from './components/settingsContainer.js';
import ViewArtifactContainer from './components/viewArtifactContainer.js';
import EditArtifactContainer from './components/editArtifactContainer.js';
import PublisherPage from './components/PublisherPage.js';

import LoginPage from './components/LoginPage.js';
import RegisterPage from './components/RegisterPage.js';

import DMCAForm from './components/DMCAForm.js';

import SearchPage from './components/SearchPage.js';

const piwik = PiwikReactRouter({
	url: 'piwik.alexandria.io',
	siteId: 1
})

const history = createBrowserHistory()

const PUBLIC_URL = process.env.PUBLIC_URL;

class App extends Component {
	componentDidMount(){
		this.props.store.dispatch(setupWalletEvents(Core));
		this.props.store.dispatch(login(Core, 'me+oipmw@skylarostler.com', 'sUbsist=49'));
	}
	componentWillUnmount() {
		
	}
	constructor(props) {
		super(props);
		
		this.state = {
			
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

					{/* Include all components that need to be rendered in the main container content */}
					<Switch>
						<Route exact path="/" render={props => <Homepage Core={Core} store={this.props.store} {...props} />} />

						<Route path="/login" component={LoginPage} />
						<Route path="/register" component={RegisterPage} />
						<Route path="/dmca" component={DMCAForm} />

						<Route path="/pub/:id" render={props => <PublisherPage suggestedContent={this.state.SupportedArtifacts.slice(0,10)} Core={Core} {...props} />} />

						<Route path="/search/:id" render={props => <SearchPage Core={Core} store={this.props.store} {...props} />} />

						<Route path="/user/:page/:type/:id" component={UserPage} />
						<Route path="/user/:page/:type" component={UserPage} />
						<Route path="/user/:page" component={UserPage} />
						
						<Route path="/:id" render={props => 
							<ContentPage Core={Core} store={this.props.store} {...props} piwik={piwik} />} 
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

const UserPage = ({ match }) => (
	<SidebarContainer>
		{(() => {
			console.log(match.params);
			switch(match.params.page){
				case "artifacts":
					switch(match.params.type){
						case 'view':
							return <ViewArtifactContainer />
						case 'edit':
							return <EditArtifactContainer />
						default:
							return <MyArtifactsContainer />
					}
				case "analytics":
					return <AnalyticsContainer />
				case "upload":
					return <PublishContainer />
				case "wallet":
					return <WalletContainer />
				case "settings":
					return <SettingsContainer />
				default:
					return <NoMatch />
			}
		})()}
	</SidebarContainer>
)

export default App;
