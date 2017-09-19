// Import React components
import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'

import Core from 'alexandria-core';

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

class App extends Component {
	componentDidMount(){
		let _this = this;

		Core.getSupportedArtifacts(function(supportedArtifacts){
			_this.setState({
				supportedArtifacts: supportedArtifacts
			});
		})

		Core.getIPFS(function(ipfs){
			_this.setState({
				ipfs: ipfs
			})
		})
	}
	componentWillUnmount() {
		this.serverRequest.abort();
	}
	constructor(props) {
		super(props);
		this.state = {supportedArtifacts: [], ipfs: {}};
	}
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
						<Route exact path="/" render={props => <Homepage suggestedContent={this.state.supportedArtifacts} Core={Core} {...props} />} />

						<Route path="/:id" render={props => <ContentPage all={this.state.supportedArtifacts} Core={Core} suggestedContent={this.state.supportedArtifacts.slice(0,10)} {...props} />} />

						{/*
						<Route path="/Audio/:id" render={props => <ContentPage artifact={demoContent[0]} suggestedContent={demoContent} {...props} />} />
						<Route path="/Video/:id" render={props => <ContentPage artifact={demoContent[1]} suggestedContent={demoContent} {...props} />} />
						<Route path="/img/:id" render={props => <ContentPage artifact={demoContent[2]} suggestedContent={demoContent}  {...props} />} />
						<Route path="/text/:id" render={props => <ContentPage artifact={demoContent[3]} suggestedContent={demoContent}  {...props} />} />
						<Route path="/pdf/:id" render={props => <ContentPage artifact={demoContent[4]} suggestedContent={demoContent} {...props} />} />
						<Route path="/web/:id" render={props => <ContentPage artifact={demoContent[5]} suggestedContent={demoContent} {...props} />} />
						<Route path="/game/:id" render={props => <ContentPage artifact={demoContent[6]} suggestedContent={demoContent} {...props} />} />
						<Route path="/code/:id" render={props => <ContentPage artifact={demoContent[7]} suggestedContent={demoContent} {...props} />} />
						*/}

						<Route path="/user/:page/:type/:id" component={UserPage} />
						<Route path="/user/:page/:type" component={UserPage} />
						<Route path="/user/:page" component={UserPage} />

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
