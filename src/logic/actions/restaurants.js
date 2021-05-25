import * as types from '../types/restaurants';

export const selectRestaurant = id => ({
    type: types.RESTAURANT_SELECTED,
    payload: id,
});

export const deselectRestaurant = id => ({
    type: types.RESTAURANT_DESELECTED,
    payload: id,
});