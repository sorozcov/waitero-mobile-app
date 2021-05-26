/* -------------------------------------------------------------------------- */
/*                                Reducer Index                               */
/* -------------------------------------------------------------------------- */
// Este reducer contiene un combine reducer de todos los demás reductores.

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { alertReducer } from 'redux-saga-rn-alert';

import auth, * as authSelectors from './auth';
import signUp, * as signUpSelectors from './signUp';
import restaurants, * as resSelectors from './restaurants';
import tags, * as tagSelectors from './tags';
import reservations, * as reserSelectors from './reservations';

import { AUTHENTICATION_IDENTITY_CLEARED } from '../types/auth';

const reducer = combineReducers({
  auth,
  signUp,
  form: formReducer,
  alertReducer,
  restaurants,
  tags,
  reservations,
});


const rootReducer = (state, action) => {
  if (action.type === AUTHENTICATION_IDENTITY_CLEARED) {
    state = undefined
  }

  return reducer(state, action)
}

export default rootReducer;




//Authorization Selectors
export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const isAuthenticated = state => getAuthToken(state) != null;
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
export const getAuthUser = state => authSelectors.getAuthUser(state.auth);
export const getAuthUserInformation = state => authSelectors.getAuthUserInformation(state.auth);
export const getIsRefreshingToken = state => authSelectors.getIsRefreshingToken(state.auth);
export const getRefreshingError = state => authSelectors.getRefreshingError(state.auth);

//Signup Selectors
export const getIsSigningUpUser = state => signUpSelectors.getIsSigningUpUser(state.signUp);
export const getSigningUpError = state => signUpSelectors.getSigningUpError(state.signUp);

//Res Selectors
export const getRestaurantSelected = state => resSelectors.getSelected(state.restaurants);
export const getRestaurant = (state, id) => resSelectors.getRestaurant(state.restaurants, id);
export const getRestaurants = state => resSelectors.getRestaurants(state.restaurants);
export const isFetchingRestaurants = state => resSelectors.getIsFetching(state.restaurants);

//Tag Selectors
export const getTag = (state, id) => tagSelectors.getTag(state.tags, id);
export const getTags = state => tagSelectors.getTags(state.tags);
export const selectedTag = state => tagSelectors.selectedTag(state.tags);
export const isFetchingTags = state => tagSelectors.getIsFetching(state.tags);

//Reservation Selectors
export const getRes = (state, id) => reserSelectors.getRes(state.reservations, id);
export const getRess = state => reserSelectors.getRess(state.reservations);
export const selectedRes = state => reserSelectors.selectedRes(state.reservations);