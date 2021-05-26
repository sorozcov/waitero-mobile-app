import * as types from '../types/restaurants';

export const selectRestaurant = id => ({
    type: types.RESTAURANT_SELECTED,
    payload: id,
});

export const deselectRestaurant = id => ({
    type: types.RESTAURANT_DESELECTED,
    payload: id,
});

export const startFetchingRestaurants = () => ({
    type: types.RESTAURANT_FETCH_STARTED,
})

export const completeFetchingRestaurants = (entities, order) => ({
    type: types.RESTAURANT_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingRestaurants = error => ({
    type: types.RESTAURANT_FETCH_FAILED,
    payload: {
        error,
    },
});