import {
    recieveCurrentArtifact,
    requestCurrentArtifact,
    requestCurrentArtifactError,
    setComments
} from "./actions";

import { addFileToPlaylist, setActiveFileInPlaylist } from "../FilePlaylist/actions";

// -------------------------------------------------------------------------------------------------
// SELECT CURRENT ARTIFACT

export const selectCurrentArtifact = (txid) => (dispatch, getState) => {
    dispatch(requestCurrentArtifact());

    let state = getState();
    state.OIPIndex.Index.getArtifact(txid)
        .then(art => {
            dispatch(recieveCurrentArtifact(art));
            console.log("Fetched current artifact: ", art)
            let files = art.getFiles();
            let publisher = art.getMainAddress();
            let txid = art.getTXID();
            console.log("TXID: ", txid)
            for (let i = 0; i < files.length; i++) {
                dispatch(addFileToPlaylist(files[i], txid + "|" + i));
            }
            if (art.getSubtype() === 'Tomogram') {
                for (var i = 0; i < files.length; i++) {
                    let splitFilename = files[i].getFilename().split(".");
                    let indexToGrab = splitFilename.length - 1;
                    const extension = splitFilename[indexToGrab].toLowerCase();
                    if (extension === 'mp4') {
                        dispatch(setActiveFileInPlaylist(txid + "|" + i));
                    }
                }
            } else {
                dispatch(setActiveFileInPlaylist(txid + "|" + 0));
            }
            //
            // dispatch(getComments(state.Core.Core, txid));
            //
            // state.Piwik.piwik.push(['trackContentImpression', publisher, txid, ""])

        })
        .catch(err => {
            console.log("Could not get current artifact: ", err)
            dispatch(requestCurrentArtifactError(err));
        })
};

// -------------------------------------------------------------------------------------------------
// GET COMMENTS

export const getComments = (Core, url) => dispatch => {
    Core.Comments.get(url, function(res){
        if (res && res.data && res.data.replies){
            dispatch(setComments(res.data.replies))
        }
    })
}

// -------------------------------------------------------------------------------------------------
// ADD COMMENT

export const addComment = (url, comment) => (dispatch, getState) => {
    let state = getState();

    state.Core.Core.Comments.add(url, comment, function(res){
        dispatch(getComments(state.Core, url));
    })
}