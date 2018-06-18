import {loginFailure, loginFetching, loginSuccess, registerStarting, logoutAction, loginPrompt} from "./actions";

// -------------------------------------------------------------------------------------------------
// LOGIN

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

// -------------------------------------------------------------------------------------------------
// LOGOUT

export const logout = () => (dispatch) => {
    try {
        localStorage.username = "";
        localStorage.pw = "";
    } catch(e){ console.error(e) }
    dispatch(logoutAction())
}

// -------------------------------------------------------------------------------------------------
// PROMPT LOGIN

export const promptLogin = (onSuccess, onError) => (dispatch, getState) => {
    dispatch(loginPrompt(true));

    var succeeded = false;
    let checkLogin = setInterval(() => {
        let state = getState();
        if (state.User.isLoggedIn && !succeeded){
            let shouldContinue = true;
            for (var coin in state.Wallet) {
                if (state.Wallet[coin].balance > 0 && (!state.Wallet[coin].usd || state.Wallet[coin].usd === 0)){
                    shouldContinue = false;
                }
            }
            if (shouldContinue){
                succeeded = true;
                clearInterval(checkLogin);
                onSuccess();
            }
        }
    }, 1000)
}

// -------------------------------------------------------------------------------------------------
// REGISTER

export const register = (Core, username, email, password, recaptcha, onSuccess, onError) => (dispatch, getState) => {
    dispatch(registerStarting());

    Core.User.Register(email, password, function(wallet){
        var state = getState();

        let floAddress = "";
        try {
            floAddress = state.Wallet.florincoin.mainAddress;
        } catch (e) {
            console.error(e);
        }

        if (floAddress === ""){
            onError("Error, cannot get FLo Address")
            return;
        }

        Core.Wallet.tryOneTimeFaucet(floAddress, recaptcha, function(res, txinfo){
            Core.Publisher.Register(username, floAddress, email, function(pub){
                console.log(pub);
                dispatch(loginSuccess(pub));
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