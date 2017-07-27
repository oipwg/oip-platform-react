import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom'

class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
				<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<Link className="navbar-brand" to="/">
					<img src="/assets/img/logo-full.png" width="auto" height="32px" className="d-inline-block align-top" alt="" />
				</Link>

				<div className="collapse navbar-collapse" id="navbarsExampleDefault">
					<ul className="navbar-nav mr-auto alexandria-nav">
						<li style={{display:"inline-block"}}>
							<form className="form-inline">
								<div className="input-group">
									<input type="text" className="form-control outline-white" placeholder="Search..." style={{width: "350px"}} />
									<span className="input-group-btn">
										<button className="btn btn-outline-white" type="button">Search</button>
									</span>
								</div>
							</form>
						</li>
					</ul>
				</div>
				<button className="btn btn-sm btn-outline-warning" style={{marginRight: "10px"}}><span className="icon icon-upload-to-cloud"></span> Upload</button>
				<div>
					<div className="btn-group">
						<button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-outline-white" style={{marginLeft: "10px", padding:"0px"}}><img className="rounded-circle" src="/assets/img/sky.jpg" style={{width:"30px",height:"30px"}} /></button>
						<button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn btn-outline-white" style={{color: "#fff", padding: "8px"}}>OstlerDev</button>
						<div className="dropdown-menu">
							<a className="dropdown-item narrow" href="#"><span className="icon icon-classic-computer"></span> My Artifacts</a>
							<a className="dropdown-item narrow" href="#"><span className="icon icon-line-graph"></span> Analytics <span className="badge badge-info">beta</span></a>
							<a className="dropdown-item narrow" href="#"><span className="icon icon-upload-to-cloud"></span> Upload</a>
							<a className="dropdown-item narrow" href="#"><span className="icon icon-wallet"></span> Wallet</a>
							<a className="dropdown-item narrow" href="#"><span className="icon icon-cog"></span> Settings</a>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item narrow" href="#"><span className="icon icon-log-out"></span> Logout</a>
						</div>
						<button className="btn btn-outline-success" style={{padding:"8px"}} id="bitCountBtn"><span id='bitCount'>503</span> bits</button>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;