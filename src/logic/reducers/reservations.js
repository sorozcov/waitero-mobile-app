import { combineReducers } from 'redux';

import * as types from '../types/reservations';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.RESERVATION_COMPLETED: {
            
            const res = action.payload;
            const newState = state;
            
            newState[res.id] = {
                ...res,
                isConfirmed: true,
            };
            
            return newState;
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.RESERVATION_COMPLETED: {
            return [...state, action.payload.id];
        }
        default: {
            return state;
        }
    }
};

const selected = (state = null, action) => {
    switch (action.type) {
        case types.TAG_SELECTED: {
            return action.payload
        }
        default:{
            return state
        }
    }
}

export default combineReducers({
    byId,
    order,
    selected,
});

export const getRes = (state, id) => state.byId[id];
export const getRess = state => state.order.map(id => getRes(state, id));
export const selectedRes = state => state.selected;