import {updateUSD} from "./actions";
import {swapPrompt} from "./actions";
import {updateWallet} from "./actions";
import {buyPrompt} from "./actions";
import {faucetPrompt, setTryFaucet} from "./actions";


// -------------------------------------------------------------------------------------------------
// SETUP WALLET EVENTS

export const setupWalletEvents = (Core) => dispatch => {
    Core.Wallet.on("bal-update", function(newState){
        dispatch(updateWalletFunc(newState));

        Core.Data.getBTCPrice(function(price){
            if (newState.bitcoin && newState.bitcoin.balance && newState.bitcoin.balance > 0)
                dispatch(updateUSD('bitcoin', parseFloat(price * newState.bitcoin.balance)))
        })

        Core.Data.getFLOPrice(function(price){
            if (newState.florincoin && newState.florincoin.balance && newState.florincoin.balance > 0)
                dispatch(updateUSD('florincoin', parseFloat(price * newState.florincoin.balance)))
        })

        Core.Data.getLTCPrice(function(price){
            if (newState.litecoin && newState.litecoin.balance && newState.litecoin.balance > 0)
                dispatch(updateUSD('litecoin', parseFloat(price * newState.litecoin.balance)))
        })
    })
}

// -------------------------------------------------------------------------------------------------
// PROMPT SWAP

export const promptSwap = (coin, fiat, fiat_amount, paymentAddresses, onSuccess, onError) => (dispatch, getState) => {
    dispatch(swapPrompt(true));

    var succeeded = false;
    let checkSwap = setInterval(() => {
        let state = getState();
        for (var coin in paymentAddresses){
            if (state.Wallet[coin][fiat] >= fiat_amount && !succeeded){
                succeeded = true;
                clearInterval(checkSwap);
                dispatch(swapPrompt(false));
                onSuccess();
            }
        }
    }, 1000)
}

// -------------------------------------------------------------------------------------------------
// UPDATE WALLET

export const updateWalletFunc = walletState => (dispatch, getState) => {
    let newState = walletState;
    let prevState = getState().Wallet;

    for (var coin in prevState){
        // console.log(coin, )
        if (newState[coin] && newState[coin].usd === 0 && prevState[coin] && prevState[coin].usd && prevState[coin].usd > 0){
            newState[coin].usd = prevState[coin].usd
        }
        if (typeof prevState[coin] !== "object"){
            newState[coin] = prevState[coin];
        }
    }

    dispatch(updateWallet(newState));
}

// -------------------------------------------------------------------------------------------------
//  PROMPT CURRENCY BUY

export const promptCurrencyBuy = (coin, fiat, fiat_amount, paymentAddresses, onSuccess, onError) => (dispatch, getState) => {
    dispatch(buyPrompt(true));

    var succeeded = false;
    let checkBuy = setInterval(() => {
        let state = getState();
        for (var coin in paymentAddresses){
            if (state.Wallet[coin][fiat] >= fiat_amount && !succeeded){
                succeeded = true;
                clearInterval(checkBuy);
                dispatch(buyPrompt(false));
                onSuccess();
            }
        }
    }, 1000)
}

// -------------------------------------------------------------------------------------------------
//  PROMPT TRY FAUCET

export const promptTryFaucet = (Core, onSuccess, onError) => (dispatch, getState) => {
    let intlState = getState();

    var succeeded = false;
    var heardFromCheck = false;
    let checkFaucet = setInterval(() => {
        let state = getState();
        if (state && state.Wallet && state.Wallet.florincoin){
            if (state.Wallet.tryFaucet === false && !succeeded && heardFromCheck){
                succeeded = true;
                clearInterval(checkFaucet);
                onSuccess();
            }
        }
    }, 200)

    Core.Wallet.checkDailyFaucet(intlState.Wallet.florincoin.mainAddress, (canReceive) => {
        if (canReceive){
            dispatch(faucetPrompt(true));
            heardFromCheck = true;
        } else {
            dispatch(setTryFaucet(false));
            clearInterval(checkFaucet);
            onSuccess();
        }
    }, (error) => {
        dispatch(setTryFaucet(false));
        onError(error);
    })
}

// -------------------------------------------------------------------------------------------------
//  TRY DAILY FAUCET

export const tryDailyFaucet = (Core, recaptcha, onSuccess, onError) => dispatch => {
    Core.Wallet.tryDailyFaucet(Core.Wallet.getMainAddress('florincoin'), recaptcha, function(success){
        console.log(success);
        dispatch(setTryFaucet(false));
        onSuccess();
    }, function(error){
        console.error(error);
        dispatch(setTryFaucet(false));
        onError(error);
    })
}