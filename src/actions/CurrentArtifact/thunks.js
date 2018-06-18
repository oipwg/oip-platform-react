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
    state.Core.Core.Index.getArtifactFromID(txid, function(artifact){
        dispatch(recieveCurrentArtifact(artifact));

        let files = artifact.getFiles();

        let publisher = artifact.getMainAddress();
        let txid = artifact.getTXID();

        for (var i = 0; i < files.length; i++) {
            dispatch(addFileToPlaylist(files[i], txid + "|" + i, state.Core.Core));
        }

        if (artifact.getSubtype() === 'Tomogram') {
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


        dispatch(getComments(state.Core.Core, txid));

        state.Piwik.piwik.push(['trackContentImpression', publisher, txid, ""])
    }, function(err){
        console.error("selectCurrentArtifact error: ", err)
        dispatch(requestCurrentArtifactError(err));
    });
}

// -------------------------------------------------------------------------------------------------
// GET COMMENTS

export const getComments = (Core, url) => dispatch => {
    Core.Comments.get(url, function(res){
        if (res && res.data && res.data.replies){
            dispatch(setComments(res.data.replies))
        }
    })
}