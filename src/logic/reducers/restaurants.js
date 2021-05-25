/* -------------------------------------------------------------------------- */
/*                              Restaurant Aut h                              */
/* -------------------------------------------------------------------------- */

import { combineReducers } from 'redux';

import * as types from '../types/restaurants';


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
	selected,
	error,
});


export default restaurants;


export const getSelected = state => state.selected;
export const getError = state => state.error;