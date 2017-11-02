import React, { Component } from 'react';

import { Nav, NavItem, NavLink } from 'reactstrap';

import ContentCard from './contentCard.js';

class PublisherPage extends Component {
	constructor(props){
		super(props);

		this.state = {
			active: "Home"
		}

		this.setActiveTab = this.setActiveTab.bind(this);
	}
	setActiveTab(tab){
		this.setState({
			active: tab
		})
	}
	render() {
		let _this = this;
		return (
			<div>
				{/* Top user profile banner image */}
				<div style={{height: "300px", backgroundImage: "url('https://i.redd.it/ial0d7teph7y.jpg')", backgroundSize: "cover", backgroundPosition: "50% 50%"}}>
					{/* Profile Picture */}					
				</div>
				<Nav tabs className="justify-content-center" style={{marginTop: "-42px"}}>
					<NavItem>
						<NavLink href="#" onClick={() => {_this.setActiveTab("Home")}} active={this.state.active === "Home"}>Home</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="#" onClick={() => {_this.setActiveTab("About")}} active={this.state.active === "About"}>About</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="#" onClick={() => {_this.setActiveTab("Playlists")}} active={this.state.active === "Playlists"}>Playlists</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="#" onClick={() => {_this.setActiveTab("Support")}} active={this.state.active === "Support"}>Support</NavLink>
					</NavItem>
		        </Nav>
				{/* Artifacts content box */}
				<div className="container">
					{/* Profile Info */}
					<div className="row" style={{height: "80px", overflowY: "hidden"}}>	
						<div className="col-12" style={{height: "100px", padding: "20px"}}>
							<img style={{height: "100%"}} className="rounded-circle" src="https://static-cdn.jtvnw.net/jtv_user_pictures/bobross-profile_image-0b9dd167a9bb16b5-300x300.jpeg" alt="profilepic" />
							<h5 style={{display: "inline", marginLeft: "20px", verticalAlign: "middle"}}>Bob Ross</h5>
							<div className="btn-group" style={{display: "inline-block", marginTop: "10px", marginBottom: "10px"}}>
								<button className="btn btn-sm btn-outline-warning" style={{marginLeft: "10px"}}><span className="icon-pin icon"></span>Follow</button>
								<button className="btn btn-sm btn-outline-secondary" disabled>10 Followers</button>
							</div>
							<div className="btn-group pull-right" style={{margin: "10px auto"}}>
								<button className="btn btn-sm btn-outline-success" style={{marginLeft: "10px"}}><span className="icon icon-credit"></span> Support</button>
								<button className="btn btn-sm btn-outline-success" disabled>12 Monthly Supporters!</button>
							</div>
						</div>
					</div>
					<hr />
					<div className="row">
						{/* col-12 Featured Artifacts */}
						<div className="col-12">
							<div className="row">
								{this.props.suggestedContent.slice(0,4).map(function(artJSON, i){
									return <ContentCard 
										key = {i}
										artifact = {artJSON}
										Core = {_this.props.Core}
										size = {i === 0 ? "large" : "small"}
									/>
								})}
							</div>
						</div>
					</div>
					<hr />
					<div className="row">
						{/* col-8 Artifact/Playlist lists */}
						<div className="col-8">
							<div className="row">
								{/* Artifact Cards */}
								{this.props.suggestedContent.map(function(artJSON, i){
									return <ContentCard 
										key = {i}
										artifact = {artJSON}
										Core = {_this.props.Core}
										size = {"large"}
									/>
								})}
							</div>
						</div>
						{/* col-4 Featured Cards (Top Donators, Featured Publishers, Info box, etc) */}
						<div className="col-4">

						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PublisherPage;