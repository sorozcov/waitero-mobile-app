/* -------------------------------------------------------------------------- */
/*                              Restaurant Aut h                              */
/* -------------------------------------------------------------------------- */

import { combineReducers } from 'redux';

import * as types from '../types/restaurants';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.RESTAURANT_FETCH_COMPLETED: {
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
        case types.RESTAURANT_FETCH_COMPLETED: {
            return [...state, ...action.payload.order.filter(newElement => !includes(state, newElement))];
        }
        default: {
            return state;
        }
    }
};

const selected = (state = null, action) => {
	switch(action.type) {
    	case types.RESTAURANT_SELECTED: {
      		return action.payload;
    	}
		case types.RESTAURANT_DESELECTED: {
			return null;
		}
  	}
	return state;
};

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.RESTAURANT_FETCH_STARTED: {
            return true;
        }
        case types.RESTAURANT_FETCH_COMPLETED: {
            return false;
        }
        case types.RESTAURANT_FETCH_FAILED: {
            return false;
        }
        default: {
            return state;
    	}
	}
}
    

const error = (state = null, action) => {
	switch(action.type) {
		case types.RESTAURANT_SELECTED: {
			return null;
		}
		case types.RESTAURANT_DESELECTED: {
			return null;
		}
	}
	return state;
}

const restaurants = combineReducers({
	byId,
	order,
	selected,
	error,
});


export default restaurants;

export const getRestaurant = (state, id) => state.byId[id];
export const getRestaurants = state => state.order.map(id => getRestaurant(state, id));
export const getSelected = state => state.selected;
export const getError = state => state.error;
export const getIsFetching = state => state.isFetching;