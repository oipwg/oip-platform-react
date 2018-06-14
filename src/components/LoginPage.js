import React from 'react';
import { Redirect } from 'react-router-dom'
import {connect} from "react-redux";

import LoginBlock from './LoginBlock.js';

const LoginPage = (props) => {
	return (
		<div className="container">
			{props.User.isLoggedIn ? <Redirect push to={"/"} /> : ""}
			<div className="row justify-content-center">
				<div className="col-12 col-sm-12 col-md-8 col-lg-7 col-xl-6">
					<div style={{height: "75px"}}></div>
					<fieldset>
						<LoginBlock Core={props.Core} User={props.User} />
					</fieldset>
				</div>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
    return {
        User: state.User,
		Core: state.Core.Core
    }
}

export default connect(mapStateToProps)(LoginPage);
