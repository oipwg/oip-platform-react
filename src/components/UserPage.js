import React, { Component } from 'react';

import SidebarContainer from './SidebarContainer.js';
import PublishContainer from './PublishContainer.js';
import MyArtifactsContainer from './MyArtifactsContainer.js';
import AnalyticsContainer from './AnalyticsContainer.js';
import WalletContainer from './WalletContainer.js';
import SettingsContainer from './SettingsContainer.js';
import ViewArtifactContainer from './ViewArtifactContainer.js';
import EditArtifactContainer from './EditArtifactContainer.js';

class UserPage extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}
	}
	componentDidMount(){
		
	}
	componentWillUnmount() {
		
	}
	render() {
		return (
			<SidebarContainer>
			{(() => {
				switch(this.props.match.params.page){
					case "artifacts":
						switch(this.props.match.params.type){
							case 'view':
								return <ViewArtifactContainer />
							case 'edit':
								return <EditArtifactContainer />
							default:
								return <MyArtifactsContainer />
						}
					case "analytics":
						return <AnalyticsContainer />
					case "upload":
						return <PublishContainer />
					case "wallet":
						return <WalletContainer Core={this.props.Core} store={this.props.store} NotificationSystem={this.state.NotificationSystem} />
					case "settings":
						return <SettingsContainer />
					default:
						return <div>404</div>
				}
			})()}
		</SidebarContainer>
		);
	}
}

export default UserPage;