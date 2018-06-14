import React from 'react';

import PublishContainer from './PublishContainer.js';
import MyArtifactsContainer from './MyArtifactsContainer.js';
import AnalyticsContainer from './AnalyticsContainer.js';
import WalletContainer from './WalletContainer.js';
import SettingsContainer from './SettingsContainer.js';
import ViewArtifactContainer from './ViewArtifactContainer.js';
import EditArtifactContainer from './EditArtifactContainer.js';

const UserPage = (props) => {
		return (
			<div>
			{(() => {
				switch(props.match.params.page){
					case "artifacts":
						switch(props.match.params.type){
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
						return <WalletContainer />
					case "settings":
						return <SettingsContainer />
					default:
						return <div>404</div>
				}
			})()}
		</div>
		);
}

export default UserPage;