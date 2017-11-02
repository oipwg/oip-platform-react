{
	page_type: "ARTIFACT_LIST" || "ARTIFACT_VIEW",
	entities: {
		publishers: {
			1: {
				// pub json
			}
		},
		artifacts: {
			1: {
				// artifact JSON
			}
		}
	},
	ArtifactLists: {
		"LATEST_POSTS": {
			isFetching: true || false,
			didInvalidate: true || false,
			ids: [1, 2, 3] // contains the txids or the raw id stored in the entities arrays above
		},
		id: { /* artifact list */ }
	},
	CurrentArtifact: {
		isFetching: false,
		didInvalidate: false,
		id: 1
	},
	FilePlaylist: {
		currentFile: 0, // id in array
		list: [{
			isPaid: true || false,
			hasPaid: true || false,
			explicitAction: true || false, // tracks if the user explicitly clicked on a payment button or if code added it
			artifact_id: 1,
			info: {
				// file JSON struct
			},
			playState: "PLAYING" || "PAUSED",
			duration: 123,
			currentTime: 61
		}]
	}
}

Actions:
	SET_PAGE_TYPE
	REQUEST_ARTIFACT_LIST
	RECIEVE_ARTIFACT_LIST
	INVALIDATE_ARTIFACT_LIST
	SELECT_ARTIFACT
	REQUEST_ARTIFACT
	RECIEVE_ARTIFACT
	PLAY_FILE_NOW
	ADD_FILE_TO_PLAYLIST
	PLAYLIST_SKIP_BACK
	PLAYLIST_SKIP_FORWARD
	PLAYLIST_PAUSE
	PLAYLIST_PLAY
Reducers:
	page_type
	ArtifactList
	CurrentArtifact
	FilePlaylist
