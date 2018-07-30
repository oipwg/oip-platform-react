import {
    LATEST_CONTENT_LIST,
    PUBLISHER_PAGE_LIST,
    SEARCH_PAGE_LIST,
    recieveArtifactList,
    requestArtifactList,
    requestArtifactListError,
} from "./actions";

// FETCH ARTIFACT LIST------------------------------------------------------------------------------

export const fetchArtifactList = (list_id, options) => (dispatch, getState) => {
    dispatch(requestArtifactList(list_id));
    let state = getState();

    let filteredArtifacts = [];
    const filterArtifacts = (artifacts) => {
        for (let art of artifacts) {
            if (!art.getNSFW()) {filteredArtifacts.push(art)}
        }
    }
    if (list_id === LATEST_CONTENT_LIST){
        state.OIPIndex.Index.getLatestArtifacts(100)
            .then(arts => {
                filterArtifacts(arts)
                dispatch(recieveArtifactList(list_id, filteredArtifacts));
            })
            .catch(err => {
                dispatch(requestArtifactListError(list_id, err));
            })
    } else if (list_id === SEARCH_PAGE_LIST) {
        //@ToDo::ElasticSearch
    } else if (list_id === PUBLISHER_PAGE_LIST) {
        state.OIPIndex.Index.getArtifacts(undefined, undefined, undefined, undefined, options)
            .then(arts => {
                filterArtifacts(arts)
                dispatch(recieveArtifactList(list_id, filteredArtifacts));
            })
            .catch(err => {
                dispatch(requestArtifactListError(list_id, err));
            })
    } else {
        state.OIPIndex.Index.getLatestArtifacts(33)
            .then(arts => {
                filterArtifacts(arts)
                dispatch(recieveArtifactList(list_id, filteredArtifacts));
            })
            .catch(err => {
                dispatch(requestArtifactListError(list_id, err));
            })
    }
};