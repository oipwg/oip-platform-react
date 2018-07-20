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

    if (list_id === LATEST_CONTENT_LIST){
        state.OIPIndex.Index.getLatestArtifacts(100)
            .then(arts => {
                dispatch(recieveArtifactList(list_id, arts));
            })
            .catch(err => {
                dispatch(requestArtifactListError(list_id, err));
                console.log(err)
            })
    } else if (list_id === SEARCH_PAGE_LIST) {
        //@ToDo::ElasticSearch
    } else if (list_id === PUBLISHER_PAGE_LIST) {
        state.OIPIndex.Index.getArtifacts(undefined, undefined, undefined, undefined, options)
            .then(arts => {
                dispatch(recieveArtifactList(list_id, arts));
            })
            .catch(err => {
                dispatch(requestArtifactListError(list_id, err));
                console.log(err)
            })
    } else {
        state.OIPIndex.Index.getLatestArtifacts(33)
            .then(arts => {
                dispatch(recieveArtifactList(list_id, arts));
            })
            .catch(err => {
                dispatch(requestArtifactListError(list_id, err));
                console.log(err)
            })
    }
};