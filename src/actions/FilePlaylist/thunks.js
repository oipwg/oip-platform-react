import {buyError, buyInProgress, buyFile, setActiveFileInPlaylist, payForFile, paymentError, paymentInProgress} from "./actions";
import {tryPaymentSend} from "../index"; // from '../PaymentLogic (this needs to change)

// -------------------------------------------------------------------------------------------------
// BUY FILE

export const buyFileFunc = (artifact, file, onSuccess, onError) => (dispatch, getState) => {
    let state = getState();

    let txid = artifact.getTXID();
    let publisher = artifact.getMainAddress();
    let publisherName = artifact.getPublisherName();
    let files = artifact.getFiles();

    let paymentAmount = file.getSuggestedBuyCost() / artifact.getPaymentScale();

    let paymentAddresses = artifact.getPaymentAddresses();

    let filei = 0;

    for (var i = 0; i < files.length; i++) {
        if (files[i].getFilename() === file.getFilename() && files[i].getDisplayName() === file.getDisplayName()){
            filei = i;
            if (file.getSuggestedBuyCost() && paymentAmount > 0){
                // If file has cost
                dispatch(buyInProgress(txid));
                dispatch(tryPaymentSend(state.Core.Core, state.NotificationSystem.NotificationSystem, paymentAddresses, "usd", paymentAmount, "pay", publisherName, (success) => {
                    dispatch(setActiveFileInPlaylist(txid + "|" + filei));
                    dispatch(buyFile(txid + "|" + filei));

                    onSuccess(success);
                }, (error) => {
                    dispatch(buyError(txid));
                    onError(error);
                }));
            } else {
                // If it is free
                dispatch(setActiveFileInPlaylist(txid + "|" + filei));
                dispatch(buyFile(txid + "|" + filei));
            }

            try {
                state.Piwik.piwik.push(["trackContentInteraction", "buyFile", publisher, txid, filei]);
            } catch (e) {
                //console.log(e)
            }
        }
    }
}

// -------------------------------------------------------------------------------------------------
// Playlist Next

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

// -------------------------------------------------------------------------------------------------
// Set Current File

export const setCurrentFile = (artifact, file) => dispatch => {
    let files = artifact.getFiles();

    for (var i = 0; i < files.length; i++) {
        if (files[i].getFilename() === file.info.getFilename() && files[i].getDisplayName() === file.info.getDisplayName()){
            dispatch(setActiveFileInPlaylist(artifact.getTXID() + "|" + i));
        }
    }
}

// -------------------------------------------------------------------------------------------------
// Pay For File

export const payForFileFunc = (artifact, file, onSuccess, onError) => (dispatch, getState) => {
    let state = getState();

    let txid = artifact.getTXID();
    let publisher = artifact.getMainAddress();
    let publisherName = artifact.getPublisherName();
    let files = artifact.getFiles();

    let paymentAmount = file.getSuggestedPlayCost() / artifact.getPaymentScale();

    let paymentAddresses = artifact.getPaymentAddresses(file);

    for (var i = 0; i < files.length; i++) {
        if (files[i].getFilename() === file.getFilename() && files[i].getDisplayName() === file.getDisplayName()){
            let id = txid + "|" + i;

            if (file.getSuggestedPlayCost() && paymentAmount > 0){
                // If file has cost
                dispatch(paymentInProgress(id));

                dispatch(tryPaymentSend(state.Core.Core, state.NotificationSystem.NotificationSystem, paymentAddresses, "usd", paymentAmount, "pay", publisherName, (success) => {
                    dispatch(payForFile(id));
                    dispatch(setActiveFileInPlaylist(id));

                    onSuccess(success)
                }, (error) => {
                    dispatch(paymentError(id));
                    onError(error);
                }));
            } else {
                // If it is free
                dispatch(payForFile(id));
                dispatch(setActiveFileInPlaylist(id));
            }

            try {
                state.Piwik.piwik.push(["trackContentInteraction", "viewFile", publisher, txid, i]);
            } catch (e) {
                //console.log(e);
            }
        }
    }
}

