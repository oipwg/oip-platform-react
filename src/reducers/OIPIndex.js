import * as actions from '../actions/OIPIndex/actions'
import { Index } from "oip-index";

let Network = new Index()

export const OIPIndex = (state = {Index: Network }, action) => {
    switch (action.type) {
        case actions.SET_OIPINDEX_TO_STORE:
            return {
                ...state,
                Index: action.OIPIndex
            }
        default:
            return state
    }
}

