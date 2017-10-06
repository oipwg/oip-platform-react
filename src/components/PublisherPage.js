import React, { Component } from 'react';

import ContentCard from './contentCard.js';

class PublisherPage extends Component {
	render() {
		let _this = this;
		return (
			<div>
				{/* Top user profile banner image */}
				<div style={{height: "300px", backgroundImage: "url('https://i.redd.it/ial0d7teph7y.jpg')", backgroundSize: "cover", backgroundPosition: "50% 50%"}}>
					{/* Profile Picture */}					
				</div>
				{/* Artifacts content box */}
				<div className="container">
					{/* Profile Info */}
					<div className="row" style={{height: "100px", overflowY: "hidden"}}>	
						<div className="col-12 col-sm-12 col-md-7 col-lg-5 col-xl-5" style={{height: "100px", padding: "20px"}}>
							<img style={{height: "100%"}} className="rounded-circle" src="https://static-cdn.jtvnw.net/jtv_user_pictures/bobross-profile_image-0b9dd167a9bb16b5-300x300.jpeg" />
							<h5 style={{display: "inline", marginLeft: "20px", verticalAlign: "middle"}}>Bob Ross</h5>
							<div className="btn-group" style={{display: "inline-block", marginTop: "10px", marginBottom: "10px"}}>
								<button className="btn btn-sm btn-outline-warning" style={{marginLeft: "10px"}}><span className="icon-pin icon"></span>Follow</button>
								<button className="btn btn-sm btn-outline-secondary" disabled>10 Followers</button>
							</div>
						</div>
						<div className="col-12 col-sm-12 col-md-5 col-lg-7 col-xl-7" style={{padding: "20px"}}>
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
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