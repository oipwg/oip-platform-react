import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import {
	Link
} from 'react-router-dom'

class Navbar extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false
		};
	}

	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	}
	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-xl navbar-dark bg-dark fixed-top">
					<Link className="navbar-brand" to="/">
						<img src="/assets/img/logo-full.png" width="auto" height="32px" className="d-inline-block align-top" alt="" />
					</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div id="navbarToggle" className="collapse navbar-collapse">
						<div style={{margin: "0px auto"}}>
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
						<div>
							<Link to="/user/upload/"><button className="btn btn-sm btn-warning-light-bg btn-outline-warning"><span className="icon icon-upload-to-cloud"></span> Upload</button></Link>
							<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="btn-group">
								<DropdownToggle className="btn btn-outline-white" style={{color: "#fff", padding: "0px 3px", marginLeft: "10px"}}><div><img className="rounded-circle" src="/assets/img/nasa.jpg" style={{width:"30px",height:"30px"}} alt="" /><span style={{paddingLeft: "5px"}}>NASA Archive</span></div></DropdownToggle>
								<DropdownMenu style={this.state.dropdownOpen ? {display: "block"} : {}}>
									<Link to="/user/artifacts/"><DropdownItem><span className="icon icon-classic-computer"></span> My Artifacts</DropdownItem></Link>
									<Link to="/user/analytics/"><DropdownItem><span className="icon icon-line-graph"></span> Analytics <span className="badge badge-info">beta</span></DropdownItem></Link>
									<Link to="/user/upload/"><DropdownItem><span className="icon icon-upload-to-cloud"></span> Upload</DropdownItem></Link>
									<Link to="/user/wallet/"><DropdownItem><span className="icon icon-wallet"></span> Wallet</DropdownItem></Link>
									<Link to="/user/settings/"><DropdownItem><span className="icon icon-cog"></span> Settings</DropdownItem></Link>
									<div className="dropdown-divider"></div>
									<DropdownItem><span className="icon icon-log-out"></span> Logout</DropdownItem>
								</DropdownMenu>
								<Link to="/user/wallet/" className="btn btn-outline-success btn-bits-bg" style={{padding:"8px"}} id="bitCountBtn"><span id='bitCount'>15,623</span> bits</Link>
							</ButtonDropdown>
						</div>
					</div>
				</nav>
				<div style={{marginTop: "56px"}}></div>
			</div>
		);
	}
}

export default Navbar;