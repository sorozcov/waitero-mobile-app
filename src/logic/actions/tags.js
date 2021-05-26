import * as types from '../types/tags';

export const startFetchingTags = () => ({
    type: types.TAG_FETCH_STARTED,
});

export const completeFetchingTags = (entities, order) => ({
    type: types.TAG_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingTags = error => ({
    type: types.TAG_FETCH_FAILED,
    payload: {
        error,
    },
});

export const selectTag = id => ({
    type: types.TAG_SELECTED,
    payload: {
        id
    }
})