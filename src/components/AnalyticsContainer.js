import React, { Component } from 'react';

class AnalyticsContainer extends Component {
	render() {
		return (
			<div className="container">
				<h1>Analytics <span className="badge badge-info" style={{fontSize: '16px', position: "absolute", top: 5, marginLeft: "5px"}}>beta</span></h1>
				<p>This page is under active construction and may not be fully functional.</p>
				<hr />
				<div className="">
					<p>There should be the following analytics</p>
					<ul>
						<li>Earning Info</li>
						<li>Views</li>
						<li>Follows</li>
						<li>Comments</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default AnalyticsContainer;