import {buyInProgress, buyError, buyFile, setActiveFileInPlaylist, payForFile, paymentError, paymentInProgress} from "../FilePlaylist/actions";
import {
    promptCurrencyBuy,
    promptSwap,
    promptTryFaucet,
} from "../Wallet/thunks";

import {promptLogin} from "../User/thunks";

// -------------------------------------------------------------------------------------------------
// Buy File

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
// Try Payment Send

export const tryPaymentSend = (Core, NotificationSystem, paymentAddresses, fiat, fiat_amount, type, paymentName, onSuccess, onError) => (dispatch, getState) => {
    let retryTryPaymentSend = function(){
        dispatch(tryPaymentSend(Core, NotificationSystem, paymentAddresses, fiat, fiat_amount, type, paymentName, onSuccess, onError));
    }
    let processTransaction = function(addrList){
        dispatch(sendPayment(Core, NotificationSystem, addrList, fiat, fiat_amount, type, paymentName, onSuccess, onError));
    }

    let state = getState();

    if (state.User.isLoggedIn){
        // @TODO: Re-add payment logic
        // Removed by Sky Young 6/11/2018
        // var canProcessWith = {};
        // for (var acceptedCoin in paymentAddresses){
        // 	var tmpFiat = fiat;

        // 	// If we are using the coin, then just check against the balance
        // 	if (fiat === acceptedCoin)
        // 		tmpFiat = "balance";

        // 	if (state.Wallet[acceptedCoin] && state.Wallet[acceptedCoin][tmpFiat] && state.Wallet[acceptedCoin][tmpFiat] >= fiat_amount){
        // 		canProcessWith[acceptedCoin] = paymentAddresses[acceptedCoin];
        // 	}
        // }

        // if (Object.keys(canProcessWith).length > 0){
        if (true) {
            processTransaction({});
        } else {
            let swapFrom = [];
            let swapTo = [];

            for (var coin in state.Wallet) {
                console.log(state.Wallet[coin][fiat], fiat_amount);
                if (state.Wallet[coin][fiat] >= fiat_amount){
                    swapFrom.push(coin);
                }
            }

            for (var coin in paymentAddresses) {
                swapTo.push(coin)
            }

            if (swapFrom.length > 0){
                dispatch(promptSwap(coin, fiat, fiat_amount, paymentAddresses, retryTryPaymentSend, onError));
            } else {
                var faucetUSDValue = 0.005;

                var canProcessWithIfFaucet = {};

                for (var acceptedCoin in paymentAddresses){
                    if (state.Wallet[acceptedCoin] && state.Wallet[acceptedCoin][fiat]){
                        var currentBalance = state.Wallet[acceptedCoin][fiat];
                        if (parseFloat(currentBalance) + faucetUSDValue >= fiat_amount){
                            canProcessWithIfFaucet[acceptedCoin] = paymentAddresses[acceptedCoin];
                        }
                    }
                }

                if (state.Wallet.tryFaucet && Object.keys(canProcessWithIfFaucet).length > 0){
                    dispatch(promptTryFaucet(Core, retryTryPaymentSend, onError))
                } else {
                    dispatch(promptCurrencyBuy(coin, fiat, fiat_amount, paymentAddresses, retryTryPaymentSend, onError))
                }
            }
        }
    } else {
        dispatch(promptLogin(retryTryPaymentSend, onError));
    }
}

// -------------------------------------------------------------------------------------------------
// Send Payment

export const sendPayment = (Core, NotificationSystem, paymentAddresses, fiat, fiat_amount, type, paymentName, onSuccess, onError) => (dispatch, getState) => {
    console.log("sendPayment", paymentAddresses, fiat, fiat_amount, type, paymentName);
    let state = getState();

    onSuccess("Done!")

    // Default send with lowest fee, this is just hardcoded for now...

    // @TODO: Add this payment logic back
    // Sky Young 6/11/2018
    // let coin = "";

    // if (paymentAddresses.florincoin){
    // 	coin = "florincoin"
    // } else if (paymentAddresses.litecoin){
    // 	coin = "litecoin"
    // } else if (paymentAddresses.bitcoin){
    // 	coin = "bitcoin"
    // } else if (paymentAddresses === {}){
    // 	onError("not enough balance in selected wallets...");
    // 	return;
    // }

    // if (!paymentAddresses[coin])
    // 	return;

    // Core.Wallet.sendPayment(coin, fiat, fiat_amount, paymentAddresses[coin], (success) => {
    // 	if (NotificationSystem){
    // 		let titleStr = "Payment";
    // 		let msgStr = "Paid";

    // 		if (type && type === "tip"){
    // 			titleStr = "Tip";
    // 			msgStr = "Tipped";
    // 		}
    // 		NotificationSystem.addNotification({title: titleStr + " Success!", message: msgStr + " $" + Core.util.createPriceString(fiat_amount) + " to " + paymentName, level: "success", position: "tr", autoDismiss: 2})
    // 	}

    // 	onSuccess(success)
    // }, (error) => {
    // 	onError(error);
    // })
}

// -------------------------------------------------------------------------------------------------
// TIP

export const tipFunc = (Core, artifact, paymentAmount, piwik, NotificationSystem, onSuccess, onError) => dispatch => {
    let txid = artifact.getTXID();
    let publisher = artifact.getMainAddress();
    let publisherName = artifact.getPublisherName();

    let paymentAddresses = artifact.getPaymentAddresses();

    let id = txid;

    if (paymentAmount > 0){
        dispatch(tryPaymentSend(Core, NotificationSystem, paymentAddresses, "usd", paymentAmount, "tip", publisherName, onSuccess, onError));
    }

    try {
        piwik.push(["trackContentInteraction", "viewFile", publisher, txid]);
    } catch (e) {
        //console.log(e);
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