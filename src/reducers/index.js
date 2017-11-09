import { combineReducers } from 'redux'
import * as actions from '../actions'

import { ArtifactLists } from './ArtifactLists.js';
import { CurrentArtifact } from './CurrentArtifact.js';
import { FilePlaylist } from './FilePlaylist.js';
import { VolumeControls } from './VolumeControls.js';

const pageType = (state = 'ARTIFACT_LIST', action) => {
	switch (action.type) {
		case action.page_type:
			return action.page_type
		default:
			return state
	}
}

const rootReducer = combineReducers({
	pageType,
	ArtifactLists,
	CurrentArtifact,
	FilePlaylist,
	VolumeControls
})

export default rootReducer