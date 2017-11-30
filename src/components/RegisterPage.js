import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom'

import RegisterBlock from './RegisterBlock.js';

class RegisterPage extends Component {
	render() {
		return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12 col-sm-12 col-md-8 col-lg-7 col-xl-6">
				    	<div style={{height: "50px"}}></div>
						<RegisterBlock Core={this.props.Core} store={this.props.store} />
					</div>
				</div>
			</div>
		);
	}
}

export default RegisterPage;