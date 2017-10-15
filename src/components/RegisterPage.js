import React, { Component } from 'react';

class RegisterPage extends Component {
	constructor(props){
		super(props);
	}
	render() {
		let _this = this;
		return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12 col-sm-12 col-md-8 col-lg-7 col-xl-6">
				    	<div style={{height: "50px"}}></div>
						<h2>Please Register</h2>
						<hr className="colorgraph" />
						<div className="form-group">
							<input type="text" name="username" id="username" className="form-control input-lg" placeholder="Username*" tabIndex="1" />
							<div className="invalid-feedback" id="feedback_username">
								Please provide a Username.
							</div>
						</div>
						<div className="form-group">
							<input type="email" name="email" id="email" className="form-control input-lg" placeholder="Email Address" tabIndex="2"  />
							<div className="invalid-feedback" id="feedback_email">
								Email is invalid or is already in use, please choose another one.
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12 col-sm-6 col-md-6">
								<div className="form-group">
									<input type="password" name="password" id="password" className="form-control input-lg" placeholder="Password*" tabIndex="3"  />
									<div className="warning-feedback" id="passwordValidation" style={{display:"none"}}>
										We suggest your password contain a minimum of:
										<ul>
											<li id="pwval-eight"><span className="icon icon-cross"></span> 8 Characters</li>
											<li id="pwval-upper"><span className="icon icon-cross"></span> 1 Uppercase Letter</li>
											<li id="pwval-lower"><span className="icon icon-cross"></span> 1 Lowercase Letter</li>
											<li id="pwval-number"><span className="icon icon-cross"></span> 1 Number</li>
											<li id="pwval-sc"><span className="icon icon-cross"></span> 1 Special Character</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-xs-12 col-sm-6 col-md-6">
								<div className="form-group">
									<input type="password" name="password_confirmation" id="password_confirmation" className="form-control input-lg" placeholder="Confirm Password*" tabIndex="4"  />
									<div className="invalid-feedback" id="feedback_password_confirmation">
										Passwords must match
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-12 text-center" style={{fontSize: "13.5px", padding: "0px"}}>
								<p>
									Save your password now!
									<br />
									<strong>Password recovery is NOT possible</strong>
									<br />
									(passwords never touch our servers)
								</p>
							</div>
							<div className="col-12" style={{margin: "0px 0px"}}>
								<center>
									<span className="button-checkbox">
										<button type="button" className="btn text-left btn-outline-secondary" data-color="secondary" tabIndex="7" style={{fontSize: "12px", width: "300px", height: "50px"}}><i className="state-icon fa fa-square-o" style={{fontSize: "25px", verticalAlign: "-5px"}}></i> I have taken responsibility for my password</button>
				                        <input type="checkbox" name="passwordCheckbox" id="passwordCheckbox" className="d-none" value="1" />
									</span>
									<p id="passwordResponsibilityCheckbox" style={{color: "#dc3545", fontSize: "13.5px", marginTop: "5px", marginBottom: "0px", display: "none"}}>Please agree that you have saved your password safely!</p>
								</center>
							</div>
						</div>
						<div className="row">
							<div className="g-recaptcha" data-sitekey="6LdpKBYUAAAAACnfrr-0wEfMrLXURVs-pV5vhvM_" style={{margin: "0px auto", marginTop: "10px", marginBottom: "-5px"}}></div>
						</div>
						<br />
						<div className="row">
							<div className="col-12" style={{fontSize: "13.5px", margin: "0px 0px", marginBottom: "-10px"}}>
								By <strong>Registering</strong>, you agree to the <a href="#" data-toggle="modal" data-target="#t_and_c_m" data-ytta-id="-">Terms and Conditions</a>, including our Cookie Use.<p></p>
							</div>
						</div>
						<hr className="colorgraph" />
						<div className="row">
							<div className="col-xs-12 col-md-3 order-2 order-sm-1"><a href="/login" className="btn btn-outline-secondary btn-block btn-lg" data-ytta-id="-">Login</a></div>
							<div className="col-xs-12 col-md-9 order-1 order-sm-2"><button id="register" className="btn btn-success btn-block btn-lg" onclick="onRegisterClick();" tabIndex="5">Register</button></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RegisterPage;