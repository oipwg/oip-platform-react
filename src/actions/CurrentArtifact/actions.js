export const REQUEST_CURRENT_ARTIFACT = 'REQUEST_CURRENT_ARTIFACT'
export const RECIEVE_CURRENT_ARTIFACT = 'RECIEVE_CURRENT_ARTIFACT'
export const INVALIDATE_CURRENT_ARTIFACT = 'INVALIDATE_CURRENT_ARTIFACT'
export const REQUEST_CURRENT_ARTIFACT_ERROR = 'REQUEST_CURRENT_ARTIFACT_ERROR'
export const SET_COMMENTS = 'SET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'

// --------------------------------------------------------------------------------

export const requestCurrentArtifact = () => ({
    type: REQUEST_CURRENT_ARTIFACT
})

export const receiveCurrentArtifact = artifact => ({
    type: RECIEVE_CURRENT_ARTIFACT,
    artifact: artifact,
    receivedAt: Date.now()
})

export const invalidateCurrentArtifact = () => ({
    type: INVALIDATE_CURRENT_ARTIFACT
})

export const requestCurrentArtifactError = error => ({
    type: REQUEST_CURRENT_ARTIFACT_ERROR,
    error
})

export const setComments = (comments) => ({
    type: SET_COMMENTS,
    comments
})

export const addSingleComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})


