import * as actions from '../actions/Piwik/actions'
import PiwikReactRouter from 'piwik-react-router';

export const Piwik = (state = {piwik: PiwikReactRouter({
        url: 'piwik.alexandria.io',
        siteId: 1
    })}, action) => {
    switch (action.type) {
        case actions.SET_PIWIK:
            return {
                ...state,
                piwik: action.piwik
            }
        default:
            return state
    }
}

