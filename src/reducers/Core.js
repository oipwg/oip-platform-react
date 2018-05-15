import * as actions from '../actions/index.js'
import {OIPJS} from "oip-js";

export const Core = (state = {Core: OIPJS({
        runIPFSJS: false,
        OIPdURL: "https://snowflake.oip.fun/alexandria/v2",
        IPFSGatewayURL: "https://ipfs.oip.fun/ipfs/"
    })}, action) => {
    switch (action.type) {
        case actions.SET_CORE_TO_STORE:
            console.log("ACTION :", action);
            return {
                ...state,
                Core: action.Core
            }
        default:
            return state
    }
}

