import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { logout } from '../actions';

import {
	Link,
	Redirect
} from 'react-router-dom'

import LogoImg from '../assets/img/logo-full.png';

class Navbar extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.toggle2 = this.toggle2.bind(this);
		this.searchForArtifacts = this.searchForArtifacts.bind(this);
		this.updateTextInput = this.updateTextInput.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.onNavbarToggleClick = this.onNavbarToggleClick.bind(this);
		this.logout = this.logout.bind(this);

		this.state = {
			dropdownOpen: false,
			dropdown2Open: false,
			navDropdownOpen: false,
			User: {},
			Wallet: {
				florincoin: { balance: 0, usd: 0 },
				bitcoin: { balance: 0, usd: 0 },
				litecoin: { balance: 0, usd: 0 }
			},
			searchTerm: "test",
			search: false
		};

		this.stateDidUpdate = this.stateDidUpdate.bind(this);

		let _this = this;

		this.unsubscribe = this.props.store.subscribe(() => {
			_this.stateDidUpdate();
		});
	}
	stateDidUpdate(){
		let newState = this.props.store.getState();

		let User = newState.User;
		let Wallet = newState.Wallet;

		this.setState({
			User,
			Wallet
		});
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	componentDidMount(){
		this.stateDidUpdate();
	}
	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	}
	toggle2() {
		this.setState({
			dropdown2Open: !this.state.dropdown2Open
		});
	}
	searchForArtifacts(){
		this.setState({search: true});
		let _this = this;
		setTimeout(function(){
			_this.setState({search: false});
		}, 100)
	}
	updateTextInput(e){
		this.setState({search: false, searchTerm: this.refs.search.value});
	}
	handleKeyPress(event){
		if(event.key === 'Enter'){
			event.preventDefault();
			this.searchForArtifacts();
		}
	}
	logout(){
		console.log("LOGOUT");
		try {
			this.props.store.dispatch(logout("test"));
		} catch(e){
			console.error(e);
		}
	}
	onNavbarToggleClick(){
		this.setState({
			navDropdownOpen: !this.state.navDropdownOpen
		})
	}
	render() {
		let totalbalance = 0;

		if (this.state && this.state.Wallet){
			let flobalance = 0, btcbalance = 0, ltcbalance = 0;

			if (this.state.Wallet.florincoin && this.state.Wallet.florincoin.usd)
				flobalance = parseFloat(this.state.Wallet.florincoin.usd);
			if (this.state.Wallet.bitcoin && this.state.Wallet.bitcoin.usd)
				btcbalance = parseFloat(this.state.Wallet.bitcoin.usd);
			if (this.state.Wallet.litecoin && this.state.Wallet.litecoin.usd)
				ltcbalance = parseFloat(this.state.Wallet.litecoin.usd);

			totalbalance = flobalance + btcbalance + ltcbalance;
		}

		return (
			<div>
				{this.state.search ? <Redirect push to={"/search/" + this.state.searchTerm} /> : ""}
				<nav className="navbar navbar-expand-xl navbar-dark bg-dark fixed-top">
					<Link className="navbar-brand" to="/">
						<img src={LogoImg} width="auto" height="32px" className="d-inline-block align-top" alt="" />
					</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation" onClick={this.onNavbarToggleClick}>
						<span className="navbar-toggler-icon"></span>
						{this.state.User.isLoggedIn ? <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className={this.state.navDropdownOpen ? "btn-group d-none" : "btn-group d-none d-sm-inline-flex"}>
							<DropdownToggle className="btn btn-outline-white" style={{color: "#fff", padding: "0px 3px", marginLeft: "10px"}}>
								<div>
									{/* <img className="rounded-circle" src="/assets/img/nasa.jpg" style={{width:"30px",height:"30px"}} alt="" /> */}
									<span style={{padding: "0px 5px"}}>{this.state.User.publisher.name}</span>
								</div>
							</DropdownToggle>
							<DropdownMenu style={this.state.dropdownOpen ? {display: "block"} : {}}>
								{/*<Link to="/user/artifacts/"><DropdownItem><span className="icon icon-classic-computer"></span> My Artifacts</DropdownItem></Link>
								<Link to="/user/analytics/"><DropdownItem><span className="icon icon-line-graph"></span> Analytics <span className="badge badge-info">beta</span></DropdownItem></Link>*/}
								<Link to="/user/upload/"><DropdownItem><span className="icon icon-upload-to-cloud"></span> Upload</DropdownItem></Link>
								<Link to="/user/wallet/"><DropdownItem><span className="icon icon-wallet"></span> Wallet</DropdownItem></Link>
								<Link to="/user/settings/"><DropdownItem><span className="icon icon-cog"></span> Settings</DropdownItem></Link>
								<div className="dropdown-divider"></div>
								<DropdownItem onClick={this.logout}><span className="icon icon-log-out"></span> Logout</DropdownItem>
							</DropdownMenu>
							<Link to="/user/wallet/" className="btn btn-outline-success btn-bits-bg" style={{padding:"8px"}} id="bitCountBtn"><span id='bitCount'>{this.state.User.isFetching ? "" : "$" + parseFloat(totalbalance).toFixed(2)}</span></Link>
						</ButtonDropdown> : <Link to="/login"><button className={this.state.navDropdownOpen ? "btn btn-outline-white d-none" : "btn btn-outline-white d-none d-sm-inline-flex"} style={{margin: "auto 10px"}}>{this.state.User.isFetching ? "logging in..." : "Login"}</button></Link>}
					</button>
					<div id="navbarToggle" className="collapse navbar-collapse">
						<div style={{margin: "0px auto"}}>
							<ul className="navbar-nav mr-auto alexandria-nav">
								<li style={{display:"inline-block"}}>
									<form className="form-inline">
										<div className="input-group">
											<input ref="search" type="text" className="form-control outline-white" placeholder="Search..." style={{width: "350px"}} onInput={this.updateTextInput} onKeyPress={this.handleKeyPress} />
											<span className="input-group-btn">
												<button className="btn btn-outline-white" type="button" onClick={this.searchForArtifacts}>Search</button>
											</span>
										</div>
									</form>
								</li>
							</ul>
						</div>
						<div className="login-profile-btn">
							<Link to="/user/upload/"><button className="btn btn-sm btn-warning-light-bg btn-outline-warning"><span className="icon icon-upload-to-cloud"></span> Upload</button></Link>
							{this.state.User.isLoggedIn ? <ButtonDropdown isOpen={this.state.dropdown2Open} toggle={this.toggle2} className="btn-group">
								<DropdownToggle className="btn btn-outline-white" style={{color: "#fff", padding: "0px 3px", marginLeft: "10px"}}>
									<div>
										{/* <img className="rounded-circle" src="/assets/img/nasa.jpg" style={{width:"30px",height:"30px"}} alt="" /> */}
										<span style={{padding: "0px 5px"}}>{this.state.User.publisher.name}</span>
									</div>
								</DropdownToggle>
								<DropdownMenu style={this.state.dropdown2Open ? {display: "block"} : {}}>
									{/*<Link to="/user/artifacts/"><DropdownItem><span className="icon icon-classic-computer"></span> My Artifacts</DropdownItem></Link>
									<Link to="/user/analytics/"><DropdownItem><span className="icon icon-line-graph"></span> Analytics <span className="badge badge-info">beta</span></DropdownItem></Link>*/}
									<Link to="/user/upload/"><DropdownItem><span className="icon icon-upload-to-cloud"></span> Upload</DropdownItem></Link>
									<Link to="/user/wallet/"><DropdownItem><span className="icon icon-wallet"></span> Wallet</DropdownItem></Link>
									<Link to="/user/settings/"><DropdownItem><span className="icon icon-cog"></span> Settings</DropdownItem></Link>
									<div className="dropdown-divider"></div>
									<DropdownItem onClick={this.logout}><span className="icon icon-log-out"></span> Logout</DropdownItem>
								</DropdownMenu>
								<Link to="/user/wallet/" className="btn btn-outline-success btn-bits-bg" style={{padding:"8px"}} id="bitCountBtn"><span id='bitCount'>{this.state.User.isFetching ? "" : "$" + parseFloat(totalbalance).toFixed(2)}</span></Link>
							</ButtonDropdown> : <Link to="/login"><button className="btn btn-outline-white" style={{margin: "auto 10px"}}>{this.state.User.isFetching ? "logging in..." : "Login"}</button></Link>}
						</div>
					</div>
				</nav>
				<div style={{marginTop: "56px"}}></div>
			</div>
		);
	}
}

export default Navbar;