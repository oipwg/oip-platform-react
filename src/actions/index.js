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
export const PAYMENT_IN_PROGRESS = 'PAYMENT_IN_PROGRESS'
export const PAYMENT_ERROR = 'PAYMENT_ERROR'
export const CLEAR_PAY_PROGRESS_ERROR = 'CLEAR_PAY_PROGRESS_ERROR'
export const ADD_FILE_TO_PLAYLIST = 'ADD_FILE_TO_PLAYLIST'
export const PLAYLIST_SKIP_BACK = 'PLAYLIST_SKIP_BACK'
export const PLAYLIST_NEXT = 'PLAYLIST_NEXT'
export const PLAYLIST_PAUSE = 'PLAYLIST_PAUSE'
export const PLAYLIST_PLAY = 'PLAYLIST_PLAY'
export const UPDATE_CURRENT_TIME = 'UPDATE_CURRENT_TIME'
export const UPDATE_IS_PLAYING = 'UPDATE_IS_PLAYING'
export const UPDATE_IS_PLAYABLE = 'UPDATE_IS_PLAYABLE'
export const UPDATE_IS_SEEKABLE = 'UPDATE_IS_SEEKABLE'
export const UPDATE_DURATION = 'UPDATE_DURATION'

export const UPDATE_WALLET = 'UPDATE_WALLET'
export const UPDATE_USD = 'UPDATE_USD'
export const UPDATE_BALANCE = 'UPDATE_BALANCE'
export const UPDATE_ADDRESSES = 'UPDATE_ADDRESSES'

export const CHANGE_VOLUME = 'CHANGE_VOLUME'
export const CHANGE_MUTE = 'CHANGE_MUTE'

export const LATEST_CONTENT_LIST = 'LATEST_CONTENT_LIST'
export const SEARCH_PAGE_LIST = 'SEARCH_PAGE_LIST'

export const LOGIN_FETCHING = 'LOGIN_FETCHING'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'

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
			dispatch(recieveArtifactList(list_id, artifacts.slice(0,40)));
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

export const paymentInProgress = uid => ({
	type: PAYMENT_IN_PROGRESS,
	uid
})

export const paymentError = uid => ({
	type: PAYMENT_ERROR,
	uid
})

export const clearPaymentProgressError = uid => ({
	type: CLEAR_PAY_PROGRESS_ERROR,
	uid
})

export const updateFileCurrentTime = (uid, currentTime) => ({
	type: UPDATE_CURRENT_TIME,
	uid,
	currentTime
})

export const updateFileDuration = (uid, duration) => ({
	type: UPDATE_DURATION,
	uid,
	duration
})

export const isPlayingFile = (uid, isPlaying) => ({
	type: UPDATE_IS_PLAYING,
	uid,
	isPlaying
})

export const isPlayableFile = (uid, isPlayable) => ({
	type: UPDATE_IS_PLAYABLE,
	uid,
	isPlayable
})

export const isSeekableFile = (uid, isSeekable) => ({
	type: UPDATE_IS_SEEKABLE,
	uid,
	isSeekable
})

export const setVolume = volume => ({
	type: CHANGE_VOLUME,
	volume
})

export const setMute = mute => ({
	type: CHANGE_MUTE,
	isMuted: mute
})

export const updateWallet = walletState => ({
	type: UPDATE_WALLET,
	walletState
})

export const updateUSD = (coin, usd) => ({
	type: UPDATE_USD,
	coin,
	usd
})

export const updateBalance = (coin, balance) => ({
	type: UPDATE_BALANCE,
	coin,
	balance
})

export const updateAddresses = (coin, balance) => ({
	type: UPDATE_ADDRESSES,
	coin,
	balance
})

export const loginFetching = () => ({
	type: LOGIN_FETCHING
})

export const loginSuccess = (publisher) => ({
	type: LOGIN_SUCCESS,
	publisher
})

export const loginFailure = () => ({
	type: LOGIN_FAILURE
})

export const logout = () => ({
	type: LOGOUT
})

export const playlistNext = restrictions => (dispatch, getState) => {
	let FilePlaylist = getState().FilePlaylist;
	let active = FilePlaylist.active;

	let keys = Object.keys(FilePlaylist);

	for (var i = 0; i < keys.length; i++) {
		if (keys[i] === active){
			let nextI = i + 1;
			if (keys[nextI]){
				if (restrictions && restrictions.type){
					if (FilePlaylist[keys[nextI]].info.type === restrictions.type){
						dispatch(setActiveFileInPlaylist(keys[nextI]));
					}
				} else {
					dispatch(setActiveFileInPlaylist(keys[nextI]));
				}
			}
		}
	}
}

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

	let paymentAmount = file.sugPlay / Core.Artifact.getScale(artifact);

	let paymentAddresses = Core.Artifact.getPaymentAddresses(artifact, file);

	for (var i = 0; i < files.length; i++) {
		if (files[i].fname === file.fname && files[i].dname === file.dname){
			let id = txid + "|" + i;

			if (file.sugPlay && paymentAmount > 0){
				// If file has cost
				dispatch(paymentInProgress(id));

				Core.Wallet.sendPayment("USD", paymentAmount, paymentAddresses, (error, success) => {
					if (error){
						// console.error(error);
						dispatch(paymentError(id));
						// setTimeout(()=>{ dispatch(clearPaymentProgressError(id)); }, 2500)
					} else {
						dispatch(payForFile(id));
						dispatch(setActiveFileInPlaylist(id));
					}
				})
			} else {
				// If it is free
				dispatch(payForFile(id));
				dispatch(setActiveFileInPlaylist(id));
			}

			try {
				piwik.push(["trackContentInteraction", "viewFile", publisher, txid, i]);
			} catch (e) {
				//console.log(e);
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
				//console.log(e)
			}	
		}
	}
}

export const setupWalletEvents = (Core) => dispatch => {
	Core.Events.on("wallet-bal-update", function(newState){
		dispatch(updateWallet(newState));

		Core.Data.getBTCPrice(function(price){
			dispatch(updateUSD('bitcoin', (price * newState.bitcoin.balance).toFixed(4)))
		})

		Core.Data.getFLOPrice(function(price){
			dispatch(updateUSD('florincoin', (price * newState.florincoin.balance).toFixed(4)))
		})
	})
}

export const login = (Core, identifier, password) => dispatch => {
	dispatch(loginFetching());

	Core.User.Login(identifier, password, (publisher) => {
		// On Success
		dispatch(loginSuccess(publisher));
	}, (error) => {
		// On Error
		dispatch(loginFailure());
	})
}








