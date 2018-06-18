import demoArtifacts from '../demoContent';

import * as actions from '../actions/Core/actions'
import { OIPJS } from "oip-js";

var _core = OIPJS({
    runIPFSJS: false,
    IPFSGatewayURL: "https://ipfs.oip.fun/ipfs/",
    debug: true
})

_core.Index.addToDb("SupportedArtifacts", demoArtifacts)

// console.log(JSON.stringify(demoArtifacts[0].toJSON()))

export const Core = (state = {Core: _core }, action) => {
    switch (action.type) {
        case actions.SET_CORE_TO_STORE:
            return {
                ...state,
                Core: action.Core
            }
        default:
            return state
    }
}

