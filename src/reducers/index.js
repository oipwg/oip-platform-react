import { combineReducers } from 'redux'

import { ArtifactLists } from './ArtifactLists.js';
import { CurrentArtifact } from './CurrentArtifact.js';
import { FilePlaylist } from './FilePlaylist.js';
import { VolumeControls } from './VolumeControls.js';
import { Wallet } from './Wallet.js';
import { User } from './User.js';

const pageType = (state = 'ARTIFACT_LIST', action) => {
	switch (action.type) {
		case action.page_type:
			return action.page_type
		default:
			return state
	}
}

const rootReducer = combineReducers({
	User,
	Wallet,
	pageType,
	ArtifactLists,
	CurrentArtifact,
	FilePlaylist,
	VolumeControls
})

export default rootReducer