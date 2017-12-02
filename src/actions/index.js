//import Core from 'alexandria-core';

export const SET_PAGE_TYPE = 'SET_PAGE_TYPE'

export const SEARCH_FOR_ARTIFACTS = "SEARCH_FOR_ARTIFACTS";
export const RANDOM_ARTIFACT_LIST = 'RANDOM_ARTIFACT_LIST'

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
export const BUY_IN_PROGRESS = 'BUY_IN_PROGRESS'
export const BUY_ERROR = 'BUY_ERROR'
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
export const UPDATE_COIN = 'UPDATE_COIN'

export const CHANGE_VOLUME = 'CHANGE_VOLUME'
export const CHANGE_MUTE = 'CHANGE_MUTE'

export const LATEST_CONTENT_LIST = 'LATEST_CONTENT_LIST'
export const SEARCH_PAGE_LIST = 'SEARCH_PAGE_LIST'

export const LOGIN_FETCHING = 'LOGIN_FETCHING'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'
export const PROMPT_LOGIN = 'PROMPT_LOGIN'
export const REGISTER_START = 'REGISTER_START'
export const REGISTER_ERROR = 'REGISTER_ERROR'

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
			dispatch(recieveArtifactList(list_id, artifacts.slice(0,100)));
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
		Core.Index.getRandomSuggested(function(results){
			dispatch(recieveArtifactList(list_id, results))
		})
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

export const buyInProgress = uid => ({
	type: BUY_IN_PROGRESS,
	uid
})

export const buyError = uid => ({
	type: BUY_ERROR,
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

export const updateWalletFunc = walletState => (dispatch, getState) => {
	let newState = walletState;
	let prevState = getState();

	for (var coin in prevState){
		if (newState[coin] && newState[coin].usd === 0 && prevState[coin] && prevState[coin].usd && prevState[coin].usd > 0){
			newState[coin].usd = prevState[coin].usd
		}
	}

	dispatch(updateWallet(newState));
}

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

export const logoutAction = () => ({
	type: LOGOUT
})

export const logout = () => (dispatch) => {
	try {
		localStorage.username = "";
		localStorage.pw = "";
	} catch(e){ console.error(e) }
	dispatch(logoutAction())
}

export const loginPrompt = () => ({
	type: PROMPT_LOGIN
})

export const registerStarting = () => ({
	type: REGISTER_START
})

export const promptLogin = (Core, artifact, file, piwik, NotificationSystem, onSuccess, onError) => (dispatch, getState) => {
	dispatch(loginPrompt());

	var succeeded = false;
	let checkLogin = setInterval(() => {
		let state = getState();
		if (state.User.isLoggedIn && !succeeded){
			onSuccess(Core, artifact, file, piwik, NotificationSystem);
			succeeded = true;
			checkLogin = undefined;
		}
	}, 1000)
}

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

export const tipFunc = (Core, artifact, paymentAmount, piwik, NotificationSystem, onSuccess, onError) => dispatch => {
	let txid = Core.Artifact.getTXID(artifact);
	let publisher = Core.Artifact.getPublisher(artifact);
	let publisherName = Core.Artifact.getPublisherName(artifact);

	let paymentAddresses = Core.Artifact.getPaymentAddresses(artifact);

	let id = txid;

	if (paymentAmount > 0){
		Core.Wallet.sendPayment("USD", paymentAmount, paymentAddresses, (success) => {	
			if (NotificationSystem){
				NotificationSystem.addNotification({title: "Tip Success!", message: "Tipped $" + Core.util.createPriceString(paymentAmount) + " to " + publisherName, level: "success", position: "tr", autoDismiss: 2})
			}	

			onSuccess(success)
		}, (error) => {
			onError(error);
		})
	}

	try {
		piwik.push(["trackContentInteraction", "viewFile", publisher, txid]);
	} catch (e) {
		//console.log(e);
	}
}

export const payForFileFunc = (Core, artifact, file, piwik, NotificationSystem, onSuccess, onError) => dispatch => {
	let txid = Core.Artifact.getTXID(artifact);
	let publisher = Core.Artifact.getPublisher(artifact);
	let publisherName = Core.Artifact.getPublisherName(artifact);
	let files = Core.Artifact.getFiles(artifact);

	let paymentAmount = file.sugPlay / Core.Artifact.getScale(artifact);

	let paymentAddresses = Core.Artifact.getPaymentAddresses(artifact, file);

	for (var i = 0; i < files.length; i++) {
		if (files[i].fname === file.fname && files[i].dname === file.dname){
			let id = txid + "|" + i;

			if (file.sugPlay && paymentAmount > 0){
				// If file has cost
				dispatch(paymentInProgress(id));

				Core.Wallet.sendPayment("USD", paymentAmount, paymentAddresses, (success) => {	
					if (NotificationSystem){
						NotificationSystem.addNotification({title: "Payment Success!", message: "Paid $" + Core.util.createPriceString(paymentAmount) + " to " + publisherName, level: "success", position: "tr", autoDismiss: 2})
					}	
					dispatch(payForFile(id));
					dispatch(setActiveFileInPlaylist(id));

					onSuccess(success)
				}, (error) => {
					dispatch(paymentError(id));
					onError(error);
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

export const buyFileFunc = (Core, artifact, file, piwik, NotificationSystem, onSuccess, onError) => dispatch => {
	let txid = Core.Artifact.getTXID(artifact);
	let publisher = Core.Artifact.getPublisher(artifact);
	let publisherName = Core.Artifact.getPublisherName(artifact);
	let files = Core.Artifact.getFiles(artifact);

	let paymentAmount = file.sugBuy / Core.Artifact.getScale(artifact);

	let paymentAddresses = Core.Artifact.getPaymentAddresses(artifact, file);

	let filei = 0;

	for (var i = 0; i < files.length; i++) {
		if (files[i].fname === file.fname && files[i].dname === file.dname){
			filei = i;
			if (file.sugBuy && paymentAmount > 0){
				// If file has cost
				dispatch(buyInProgress(txid));

				Core.Wallet.sendPayment("USD", paymentAmount, paymentAddresses, (success) => {	
					if (NotificationSystem){
						NotificationSystem.addNotification({title: "Payment Success!", message: "Paid $" + Core.util.createPriceString(paymentAmount) + " to " + publisherName, level: "success", position: "tr", autoDismiss: 2})
					}	
					dispatch(setActiveFileInPlaylist(txid + "|" + filei));
					dispatch(buyFile(txid + "|" + filei));

					onSuccess(success)
				}, (error) => {
					dispatch(buyError(txid));
					onError(error);
				})
			} else {
				// If it is free
				dispatch(setActiveFileInPlaylist(txid + "|" + filei));
				dispatch(buyFile(txid + "|" + filei));
			}

			try {
				piwik.push(["trackContentInteraction", "buyFile", publisher, txid, filei]);
			} catch (e) {
				//console.log(e)
			}	
		}
	}
}

export const setupWalletEvents = (Core) => dispatch => {
	Core.Wallet.on("bal-update", function(newState){
		dispatch(updateWalletFunc(newState));

		Core.Data.getBTCPrice(function(price){
			dispatch(updateUSD('bitcoin', (price * newState.bitcoin.balance).toFixed(4)))
		})

		Core.Data.getFLOPrice(function(price){
			dispatch(updateUSD('florincoin', (price * newState.florincoin.balance).toFixed(4)))
		})

		Core.Data.getLTCPrice(function(price){
			dispatch(updateUSD('litecoin', (price * newState.litecoin.balance).toFixed(4)))
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

export const register = (Core, username, email, password, onSuccess, onError) => dispatch => {
	dispatch(registerStarting());

	Core.User.Register(email, password, function(identifier){
		Core.Wallet.tryFaucet(function(txid){
			Core.Publisher.Register(username, function(txid){
				onSuccess();
			}, function(error){
				onError(error);
			})
		}, function(error){
			onError(error);
		})
	}, function(error){
		onError(error);
	})
}






