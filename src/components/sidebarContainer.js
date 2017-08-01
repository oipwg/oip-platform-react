import React, { Component } from 'react';

import {
	Link
} from 'react-router-dom'

class SidebarContainer extends Component {
	render() {
		return (
			<div className="row">
				<div className="col-xl-2 col-lg-3 col-md-4 hidden-sm-down">
					<div className="list-group">
						<Link to="/user/upload/"><button className="list-group-item list-group-item-action list-group-item-warning"><span className="icon icon-pad-right icon-upload-to-cloud"></span> Upload Artifact</button></Link>
						<Link to="/user/artifacts/"><button className="list-group-item list-group-item-action"><span className="icon icon-pad-right icon-classic-computer"></span> My Artifacts</button></Link>
						<Link to="/user/analytics/"><button className="list-group-item list-group-item-action"><span className="icon icon-pad-right icon-line-graph"></span> Analytics</button></Link>
						<Link to="/user/wallet/"><button className="list-group-item list-group-item-action"><span className="icon icon-pad-right icon-wallet"></span> Wallet</button></Link>
						<Link to="/user/settings/"><button className="list-group-item list-group-item-action"><span className="icon icon-pad-right icon-cog"></span> Settings</button></Link>
					</div>
				</div>
				<div className="col-xl-10 col-lg-9 col-md-8 col-12" style={{marginTop:"30px"}}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default SidebarContainer;