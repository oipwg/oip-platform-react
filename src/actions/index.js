//import Core from 'alexandria-core';

export const SET_PAGE_TYPE = 'SET_PAGE_TYPE'

export const SEARCH_FOR_ARTIFACTS = "SEARCH_FOR_ARTIFACTS";

export const REQUEST_ARTIFACT_LIST = 'REQUEST_ARTIFACT_LIST'
export const RECIEVE_ARTIFACT_LIST = 'RECIEVE_ARTIFACT_LIST'
export const INVALIDATE_ARTIFACT_LIST = 'INVALIDATE_ARTIFACT_LIST'
export const REQUEST_ARTIFACT_LIST_ERROR = 'REQUEST_ARTIFACT_LIST_ERROR'

export const REQUEST_CURRENT_ARTIFACT = 'REQUEST_CURRENT_ARTIFACT'
export const RECIEVE_CURRENT_ARTIFACT = 'RECIEVE_CURRENT_ARTIFACT'
export const INVALIDATE_CURRENT_ARTIFACT = 'INVALIDATE_CURRENT_ARTIFACT'
export const REQUEST_CURRENT_ARTIFACT_ERROR = 'REQUEST_CURRENT_ARTIFACT_ERROR'

export const SET_ACTIVE_FILE_IN_PLAYLIST = 'SET_ACTIVE_FILE_IN_PLAYLIST'
export const SET_FILE_PLAYLIST = 'SET_FILE_PLAYLIST'
export const BUY_FILE = 'BUY_FILE'
export const PAY_FOR_FILE = 'PAY_FOR_FILE'
export const ADD_FILE_TO_PLAYLIST = 'ADD_FILE_TO_PLAYLIST'
export const PLAYLIST_SKIP_BACK = 'PLAYLIST_SKIP_BACK'
export const PLAYLIST_SKIP_FORWARD = 'PLAYLIST_SKIP_FORWARD'
export const PLAYLIST_PAUSE = 'PLAYLIST_PAUSE'
export const PLAYLIST_PLAY = 'PLAYLIST_PLAY'

export const LATEST_CONTENT_LIST = 'LATEST_CONTENT_LIST'
export const SEARCH_PAGE_LIST = 'SEARCH_PAGE_LIST'

export const PAUSED = 'PAUSED'

export const setPageType = pg_type => ({
	type: SET_PAGE_TYPE,
	pg_type
})

export const requestArtifactList = page => ({
	type: REQUEST_ARTIFACT_LIST,
	page
})

export const recieveArtifactList = (page, items) => ({
	type: RECIEVE_ARTIFACT_LIST,
	page,
	items,
	receivedAt: Date.now()
})

export const invalidateArtifactList = page => ({
	type: INVALIDATE_ARTIFACT_LIST,
	page
})

export const requestArtifactListError = (page, errorText) => ({
	type: REQUEST_ARTIFACT_LIST_ERROR,
	page,
	errorText
})

export const fetchArtifactList = (Core, list_id, options) => dispatch => {
	dispatch(requestArtifactList(list_id));

	if (list_id === LATEST_CONTENT_LIST){
		Core.Index.getSupportedArtifacts(function(artifacts){
			console.log("fetch:",artifacts);
			dispatch(recieveArtifactList(list_id, artifacts.slice(0,330)));
		}, function(err){
			dispatch(requestArtifactListError(list_id));
		})
	} else if (list_id === SEARCH_PAGE_LIST) {
		Core.Index.search(options, function(results){
			dispatch(recieveArtifactList(list_id, results));
		}, function(err){
			dispatch(requestArtifactListError(list_id, err));
		});
	} else {

	}
}

export const requestCurrentArtifact = () => ({
	type: REQUEST_CURRENT_ARTIFACT	
})

export const recieveCurrentArtifact = artifact => ({
	type: RECIEVE_CURRENT_ARTIFACT,
	artifact: {...artifact},
	receivedAt: Date.now()
})

export const invalidateCurrentArtifact = () => ({
	type: INVALIDATE_CURRENT_ARTIFACT
})

export const requestCurrentArtifactError = error => ({
	type: REQUEST_CURRENT_ARTIFACT_ERROR,
	error
})

export const addFileToPlaylist = (file, uid, Core) => ({
	type: ADD_FILE_TO_PLAYLIST,
	uid,
	isPaid: Core.Artifact.isFilePaid(file),
	file
})

export const setActiveFileInPlaylist = uid => ({
	type: SET_ACTIVE_FILE_IN_PLAYLIST,
	uid
})

export const payForFile = uid => ({
	type: PAY_FOR_FILE,
	uid
})

export const buyFile = uid => ({
	type: BUY_FILE,
	uid
})

export const selectCurrentArtifact = (Core, txid, piwik) => dispatch => {
	dispatch(requestCurrentArtifact());

	Core.Index.getArtifactFromID(txid, function(artifacts){
		dispatch(recieveCurrentArtifact(artifacts[0]));

		let files = Core.Artifact.getFiles(artifacts[0]);

		let publisher = Core.Artifact.getPublisher(artifacts[0]);
		let txid = Core.Artifact.getTXID(artifacts[0]);

		for (var i = 0; i < files.length; i++) {
			dispatch(addFileToPlaylist(files[i], txid + "|" + i, Core));
		}

		dispatch(setActiveFileInPlaylist(txid + "|" + 0));

		piwik.push(['trackContentImpression', publisher, txid, ""])
	}, function(err){
		dispatch(requestCurrentArtifactError(err));
	});
}

export const setCurrentFile = (Core, artifact, file) => dispatch => {
	let files = Core.Artifact.getFiles(artifact);

	for (var i = 0; i < files.length; i++) {
		if (files[i].fname === file.fname && files[i].dname === file.dname){
			dispatch(setActiveFileInPlaylist(Core.Artifact.getTXID(artifact) + "|" + i));
		}
	}
}

export const payForFileFunc = (Core, artifact, file, piwik) => dispatch => {
	let txid = Core.Artifact.getTXID(artifact);
	let publisher = Core.Artifact.getPublisher(artifact);
	let files = Core.Artifact.getFiles(artifact);

	for (var i = 0; i < files.length; i++) {
		if (files[i].fname === file.fname && files[i].dname === file.dname){
			let id = txid + "|" + i;

			dispatch(payForFile(id));
			dispatch(setActiveFileInPlaylist(id));

			try {
				piwik.push(["trackContentInteraction", "viewFile", publisher, txid, i]);
			} catch (e) {
				console.log(e);
			}	
		}
	}
}

export const buyFileFunc = (Core, artifact, file, piwik) => dispatch => {
	let txid = Core.Artifact.getTXID(artifact);
	let publisher = Core.Artifact.getPublisher(artifact);
	let files = Core.Artifact.getFiles(artifact);

	for (var i = 0; i < files.length; i++) {
		if (files[i].fname === file.fname && files[i].dname === file.dname){
			dispatch(buyFile(txid + "|" + i));
			dispatch(setActiveFileInPlaylist(txid + "|" + i));

			try {
				piwik.push(["trackContentInteraction", "buyFile", publisher, txid, i]);
			} catch (e) {
				console.log(e)
			}	
		}
	}
}











