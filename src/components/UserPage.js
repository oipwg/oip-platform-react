import React, { Component } from 'react';

import SidebarContainer from './sidebarContainer.js';
import PublishContainer from './publishContainer.js';
import MyArtifactsContainer from './myArtifactsContainer.js';
import AnalyticsContainer from './analyticsContainer.js';
import WalletContainer from './walletContainer.js';
import SettingsContainer from './settingsContainer.js';
import ViewArtifactContainer from './viewArtifactContainer.js';
import EditArtifactContainer from './editArtifactContainer.js';
import PublisherPage from './PublisherPage.js';

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
						return <WalletContainer Core={this.props.Core} store={this.props.store} />
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