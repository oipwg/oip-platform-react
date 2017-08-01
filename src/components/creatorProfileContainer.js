import React, { Component } from 'react';

class CreatorProfileContainer extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-3">
						<img src="/assets/img/sky.jpg" className="rounded" style={{width: "200px", height: "200px"}} />
						<h4>OstlerDev <span className="badge badge-info" style={{fontSize: "14px", padding: "2px 2px"}}><span className="icon icon-check"></span></span></h4>
						<hr />
						<p><span className="icon icon-location"></span> San Diego, California</p>
					</div>
					<div className="col-9">
						
					</div>
				</div>
			</div>
		);
	}
}

export default CreatorProfileContainer;