import * as actions from '../actions/index.js'
import PiwikReactRouter from 'piwik-react-router';

export const Piwik = (state = {piwik: PiwikReactRouter({
        url: 'piwik.alexandria.io',
        siteId: 1
    })}, action) => {
    switch (action.type) {
        case actions.SET_PIWIK:
            console.log("ACTION :", action);
            return {
                ...state,
                piwik: action.piwik
            }
        default:
            return state
    }
}

