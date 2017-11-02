//import Core from 'alexandria-core';

export const SET_PAGE_TYPE = 'SET_PAGE_TYPE'

export const SEARCH_FOR_ARTIFACTS = "SEARCH_FOR_ARTIFACTS";

export const REQUEST_ARTIFACT_LIST = 'REQUEST_ARTIFACT_LIST'
export const RECIEVE_ARTIFACT_LIST = 'RECIEVE_ARTIFACT_LIST'
export const INVALIDATE_ARTIFACT_LIST = 'INVALIDATE_ARTIFACT_LIST'
export const REQUEST_ARTIFACT_LIST_ERROR = 'REQUEST_ARTIFACT_LIST_ERROR'

export const SELECT_ARTIFACT = 'SELECT_ARTIFACT'
export const REQUEST_ARTIFACT = 'REQUEST_ARTIFACT'
export const RECIEVE_ARTIFACT = 'RECIEVE_ARTIFACT'

export const PLAY_FILE_NOW = 'PLAY_FILE_NOW'
export const ADD_FILE_TO_PLAYLIST = 'ADD_FILE_TO_PLAYLIST'
export const PLAYLIST_SKIP_BACK = 'PLAYLIST_SKIP_BACK'
export const PLAYLIST_SKIP_FORWARD = 'PLAYLIST_SKIP_FORWARD'
export const PLAYLIST_PAUSE = 'PLAYLIST_PAUSE'
export const PLAYLIST_PLAY = 'PLAYLIST_PLAY'

export const LATEST_CONTENT_LIST = "LATEST_CONTENT_LIST"
export const SEARCH_ARTIFACTS_LIST = "SEARCH_ARTIFACTS_LIST"

export const setPageType = pg_type => ({
    type: SET_PAGE_TYPE,
    pg_type
})

export const requestArtifactList = page => ({
    type: REQUEST_ARTIFACT_LIST,
    page
})

export const recieveArtifactList = (page, artifacts) => ({
    type: RECIEVE_ARTIFACT_LIST,
    page,
    artifacts,
    receivedAt: Date.now()
})

export const invalidateArtifactList = page => ({
    type: INVALIDATE_ARTIFACT_LIST,
    page
})

export const requestArtifactListError = page => ({
    type: REQUEST_ARTIFACT_LIST_ERROR,
    page
})

export const fetchArtifactList = (Core, list_id, options) => dispatch => {
    dispatch(requestArtifactList(list_id));

    if (list_id === LATEST_CONTENT_LIST){
        Core.Index.getSupportedArtifacts(function(artifacts){
            console.log(artifacts);
            dispatch(recieveArtifactList(list_id, artifacts.slice(0,50)));
        }, function(err){
            dispatch(requestArtifactListError(list_id));
        })
    } else if (list_id === SEARCH_ARTIFACTS_LIST) {

    } else {

    }
}
