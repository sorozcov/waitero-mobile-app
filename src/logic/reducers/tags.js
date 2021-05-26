import { combineReducers } from 'redux'
import includes from 'lodash/includes';

import * as types from '../types/tags';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.TAG_FETCH_COMPLETED: {
            const { entities, order } = action.payload;
            const newState = { ...state };
            order.forEach(id => {
                newState[id] = {
                    ...entities[id],
                    isConfirmed: true,
                };
            });

            return newState;
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.TAG_FETCH_COMPLETED: {
            return [...state, ...action.payload.order.filter(newElement => !includes(state, newElement))];
        }
        default: {
            return state;
        }
    }
};

const selected = (state = null, action) => {
    switch (action.type) {
        case types.TAG_SELECTED: {
            return action.payload.id
        }
        default:{
            return state
        }
    }
}

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.TAG_FETCH_STARTED: {
            return true;
        }
        case types.TAG_FETCH_COMPLETED: {
            return false;
        }
        case types.TAG_FETCH_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.TAG_FETCH_FAILED: {
            return action.payload.error;
        }
        case types.TAG_FETCH_STARTED: {
            return null;
        }
        case types.TAG_FETCH_COMPLETED: {
            return null;
        }
        default: {
            return state;
        }
    }
};


export default combineReducers({
    byId,
    order,
    selected,
    isFetching,
    error,
});

export const getTag = (state, id) => state.byId[id];
export const getTags = state => state.order.map(id => getTag(state, id));
export const selectedTag = state => state.selected;
export const getIsFetching = state => state.isFetching;