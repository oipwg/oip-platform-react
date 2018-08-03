import {setPublisherPagePublisher} from "./actions";
import {fetchArtifactList} from '../ArtifactLists/thunks';

// FETCH PUBLISHER PAGE-----------------------------------------------------------------------------

export const fetchPublisherPage = (list_id, pubId) => (dispatch) => {
    dispatch(fetchArtifactList(list_id, pubId))
    dispatch(setPublisherPagePublisher(pubId))
}


