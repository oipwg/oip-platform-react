import {setActiveFileInPlaylist} from "./actions";

// -------------------------------------------------------------------------------------------------
// Playlist Next

export const playlistNext = restrictions => (dispatch, getState) => {
    let FilePlaylist = getState().FilePlaylist;
    let active = FilePlaylist.active;

    let keys = Object.keys(FilePlaylist);

    for (var i = 0; i < keys.length; i++) {
        if (keys[i] === active){
            let nextI = i + 1;
            if (keys[nextI]){
                if (restrictions && restrictions.type){
                    if (FilePlaylist[keys[nextI]].info.type === restrictions.type){
                        dispatch(setActiveFileInPlaylist(keys[nextI]));
                    }
                } else {
                    dispatch(setActiveFileInPlaylist(keys[nextI]));
                }
            }
        }
    }
}

// -------------------------------------------------------------------------------------------------
// Set Current File

export const setCurrentFile = (artifact, file) => dispatch => {
    let files = artifact.getFiles();

    for (var i = 0; i < files.length; i++) {
        if (files[i].getFilename() === file.info.getFilename() && files[i].getDisplayName() === file.info.getDisplayName()){
            console.log("current file: ", artifact.getTXID() + "|" + i, files[i].getFilename(), file.info.getFilename())
            dispatch(setActiveFileInPlaylist(artifact.getTXID() + "|" + i));
        }
    }
}

// -------------------------------------------------------------------------------------------------
