import {
    call, 
    takeEvery,
    select
} from 'redux-saga/effects';

import * as constants from './settings/apibaseurl';

import * as selectors from '../reducers';
import * as types from '../types/restaurants';
import * as resActions from '../actions/restaurants';


function* fetchRestaurants(action) {
    try {
        console.log("TOKEN", yield select(selectors.getAuthToken))
        const response = yield call(
            fetch,
            `${constants.default}/restaurants/`,
            {
                method:'GET',
                headers:{
                    'Authorization':`JWT ${yield select(selectors.getAuthToken)}`,
                    'Content-Type':'application/json'
                },
            }
        );
        
        if (response.status === 200){
            const jsonResult = yield response.json();
            console.log(jsonResult);
            // const order = jsonResult.map(tag => tag.id);
            // const entities = {};
            // jsonResult.map(tag => entities[tag.id] = tag)
            // yield put(
            //     tagActions.completeFetchingTags(entities, order)
            // )
        } else{
            const jsonError = yield response.json();
            resActions.failFetchingRestaurants(jsonError);
            console.log(jsonError);
        }
    } catch (error) {
        console.log(error.message)
    }
}

export function* watchRestaurantsFetch() {
    yield takeEvery(
        types.RESTAURANT_FETCH_STARTED,
        fetchRestaurants
    )
}
