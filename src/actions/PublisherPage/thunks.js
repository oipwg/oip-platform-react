import {setPublisherPagePublisher} from "./actions";
import {fetchArtifactList} from '../ArtifactLists/thunks';

// FETCH PUBLISHER PAGE-----------------------------------------------------------------------------

export const fetchPublisherPage = (list_id, pubId) => (dispatch, getState) => {
    let state = getState();
    state.Core.Core.Index.getPublisher(pubId, (success) => {
        console.log("getPublisher Success", success)
        dispatch(fetchArtifactList(list_id, { "search-for": success.address}))
        dispatch(setPublisherPagePublisher(success))
    }, (error) => {console.error("getPublisher error:", error)})
}

