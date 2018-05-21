import { ArtifactLists } from './ArtifactLists.js';
import { CurrentArtifact } from './CurrentArtifact.js';
import { FilePlaylist } from './FilePlaylist.js';
import { VolumeControls } from './VolumeControls.js';
import { Wallet } from './Wallet.js';
import { User } from './User.js';
import { Core } from './Core.js'
import { NotificationSystem } from "./NotificationSystem";
import { PublisherPage } from './PublisherPage';
import {Piwik} from './Piwik';

const pageType = (state = 'ARTIFACT_LIST', action) => {
    switch (action.type) {
        case action.page_type:
            return action.page_type
        default:
            return state
    }
}

const rootReducer = {
	User,
	Wallet,
	pageType,
	ArtifactLists,
	CurrentArtifact,
	FilePlaylist,
	VolumeControls,
	Core,
	NotificationSystem,
	PublisherPage,
	Piwik
}

export default rootReducer