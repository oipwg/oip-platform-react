export const REQUEST_ARTIFACT_LIST = 'REQUEST_ARTIFACT_LIST'
export const RECIEVE_ARTIFACT_LIST = 'RECIEVE_ARTIFACT_LIST'
export const INVALIDATE_ARTIFACT_LIST = 'INVALIDATE_ARTIFACT_LIST'
export const REQUEST_ARTIFACT_LIST_ERROR = 'REQUEST_ARTIFACT_LIST_ERROR'

export const LATEST_CONTENT_LIST = 'LATEST_CONTENT_LIST'
export const SEARCH_PAGE_LIST = 'SEARCH_PAGE_LIST'
export const PUBLISHER_PAGE_LIST = "PUBLISHER_PAGE_LIST"
export const RANDOM_ARTIFACT_LIST = 'RANDOM_ARTIFACT_LIST'

// --------------------------------------------------------------------------------

export const requestArtifactList = page => ({
    type: REQUEST_ARTIFACT_LIST,
    page
})

export const recieveArtifactList = (page, items) => ({
    type: RECIEVE_ARTIFACT_LIST,
    page,
    items,
    receivedAt: Date.now()
})

export const invalidateArtifactList = page => ({
    type: INVALIDATE_ARTIFACT_LIST,
    page
})

export const requestArtifactListError = (page, errorText) => ({
    type: REQUEST_ARTIFACT_LIST_ERROR,
    page,
    errorText
})