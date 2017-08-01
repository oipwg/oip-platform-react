import React, { Component } from 'react';

class SettingsContainer extends Component {
	render() {
		return (
			<div className="row">
				<div className="col-xl-2 col-lg-3 col-md-4 hidden-sm-down">
					<div class="list-group">
						<button className="list-group-item list-group-item-action list-group-item-warning"><span className="icon icon-upload-to-cloud"></span> Upload</button>
						<button className="list-group-item list-group-item-action"><span className="icon icon-pad-right icon-classic-computer"></span> My Artifacts</button>
						<button className="list-group-item list-group-item-action"><span className="icon icon-pad-right icon-line-graph"></span> Analytics</button>
						<button className="list-group-item list-group-item-action"><span className="icon icon-pad-right icon-wallet"></span> Wallet</button>
						<button className="list-group-item list-group-item-action"><span className="icon icon-pad-right icon-cog"></span> Settings</button>
					</div>
				</div>
				<div className="col-xl-10 col-lg-9 col-md-8 col-12">
					
				</div>
			</div>
		);
	}
}

export default SettingsContainer;