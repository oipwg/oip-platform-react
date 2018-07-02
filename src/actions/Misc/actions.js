export const SET_PAGE_TYPE = 'SET_PAGE_TYPE'
export const SEARCH_FOR_ARTIFACTS = "SEARCH_FOR_ARTIFACTS";
export const UPDATE_COIN = 'UPDATE_COIN'

export const setPageType = pg_type => ({
    type: SET_PAGE_TYPE,
    pg_type
});