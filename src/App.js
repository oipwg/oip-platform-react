// Import React components
import React, { Component } from 'react';

import {
    Route,
    Switch,
	Redirect
} from 'react-router-dom'

import { connect } from 'react-redux';
import { setupWalletEvents, setCoreToStore, login, setNotificationSys } from './actions';

import { CSSTransitionGroup } from 'react-transition-group'

import createBrowserHistory from 'history/createBrowserHistory'
import { ConnectedRouter, push } from 'react-router-redux'
import { Provider } from 'react-redux'

import PiwikReactRouter from 'piwik-react-router';

// Import Boostrap v4.0.0-alpha.6
import 'bootstrap/dist/css/bootstrap.css';
// Import custom entypo css class & Alexandria css class
import './assets/css/entypo.css';
import './assets/css/alexandria.css';

// Import Bootstrap 4 JS
import 'jquery/dist/jquery';
import 'popper.js/dist/umd/popper';
import 'bootstrap/dist/js/bootstrap.js';
// Import custom CSS to override Bootstrap
import './assets/css/custom.css';
// Import Font Awesome 5 SVG
import './assets/js/fontawesome-all.min';

import Navbar from './components/Navbar.js';

import Homepage from './components/Homepage.js';
import MiniMusicPlayer from './components/MiniMusicPlayer.js';
import ContentPage from './components/ContentPage.js';
import PublisherPage from './components/PublisherPage.js';
import UserPage from './components/UserPage.js';

import LoginPage from './components/LoginPage.js';
import RegisterPage from './components/RegisterPage.js';

import DMCAForm from './components/DMCAForm.js';

import SearchPage from './components/SearchPage.js';

import LoginPrompt from './components/LoginPrompt.js'
import SwapPrompt from './components/SwapPrompt.js'
import BuyPrompt from './components/BuyPrompt.js'
import DailyFaucetPrompt from './components/DailyFaucetPrompt.js';

const piwik = PiwikReactRouter({
	url: 'piwik.alexandria.io',
	siteId: 1
})

const history = createBrowserHistory()

class App extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(){
		this.props.setupWalletEvents(this.props.Core);
        this.props.setNotificationSys(this.refs.NotificationSystem);

		try {
			if (localStorage.username && localStorage.pw){
				this.props.login(this.props.Core, localStorage.username, localStorage.pw);
			}
		} catch (e) {}

	}

	render() {
		piwik.connectToHistory(history);

        return (
			<Provider store={this.props.store}>
				<ConnectedRouter history={history}>
					<div className="App">
						{/* This is to add transitions to the app, fade, etc. */}
						<CSSTransitionGroup
							transitionName="fade"
							transitionEnterTimeout={300}
							transitionLeaveTimeout={300}
						/>

						{/* Include all components that need to be rendered above the main container content */}
						<Navbar />

						<LoginPrompt />
						<DailyFaucetPrompt />
						<SwapPrompt />
						<BuyPrompt />
						<NotificationSystem ref="NotificationSystem" />

						{/* Include all components that need to be rendered in the main container content */}
						<div className="Main">
                            <Switch>
                                <Route exact path="/" component={Homepage} />
                                <Route exact path="/login" component={LoginPage} />
                                <Route path="/dmca" component={DMCAForm} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/search/:id" render={props => <SearchPage  {...props} />} />
                                <Route path="/pub/:id" render={props => <PublisherPage {...props} />} />
                                <Route path="/user/:page" render={props => ( this.props.User.isLoggedIn ? ( <UserPage {...props} /> ) : ( <Redirect to="/"/> ))} />
								<Route path="/user/:page/:type" render={props => ( this.props.User.isLoggedIn ? ( <UserPage {...props} /> ) : ( <Redirect to="/"/> ))} />
								<Route path="/user/:page/:type/:id" render={props => ( this.props.User.isLoggedIn ? ( <UserPage {...props} /> ) : ( <Redirect to="/"/> ))} />


                                <Route path="/:id" render={props =>
                                    <ContentPage {...props} store={this.props.store}  piwik={piwik} NotificationSystem={this.props.NotificationSystem} />}
                                />

                                {/* The switch will render the last Route if no others are found (aka 404 page.) */}
                                <Route component={NoMatch} />
                            </Switch>
						</div>

						{/* Include all components that need to be rendered after the main container content */}
						<MiniMusicPlayer display="false" />
					</div>
				</ConnectedRouter>
			</Provider>
		);
	}
}

const NoMatch = ({ match }) => (
	<div className="container justify-content-center text-center">
		<h1 style={{marginTop: "75px", fontSize: "120px"}}>404</h1>
		{match.pathname ? <h3>No match for <code>{match.pathname}</code></h3> : "Page not found"}
	</div>
)

function mapStateToProps(state) {
    return {
        User: state.User,
        Core: state.Core.Core,
        NotificationSystem: state.NotificationSystem.NotificationSystem
    }
}

const mapDispatchToProps = {
    login,
	setupWalletEvents,
    setCoreToStore,
    setNotificationSys
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
