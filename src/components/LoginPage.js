import React, { Component } from 'react';

import {
	Redirect
} from 'react-router-dom'

import LoginBlock from './LoginBlock.js';


class LoginPage extends Component {
	constructor(props){
		super(props);

		this.state = {
			User: {},
		}

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let User = newState.User;

		this.setState({
			User
		});
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	render() {
		return (
			<div className="container">
				{this.state.User.isLoggedIn ? <Redirect push to={"/"} /> : ""}
				<div className="row justify-content-center">
					<div className="col-12 col-sm-12 col-md-8 col-lg-7 col-xl-6">
						<div style={{height: "75px"}}></div>
						<fieldset>
							<LoginBlock Core={this.props.Core} store={this.props.store} />
						</fieldset>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginPage;