/* -------------------------------------------------------------------------- */
/*                               Saga Principal                               */
/* -------------------------------------------------------------------------- */

import { fork, all,spawn } from 'redux-saga/effects';
import { watchLoginStarted,watchUserInformationRequest, watchRefreshTokenStarted } from './auth';
import { watchSignUpStarted } from './signUp';
import { watchAlertChannel } from 'redux-saga-rn-alert';
import { watchRestaurantsFetch } from './restaurants';



function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchUserInformationRequest),
    fork(watchRefreshTokenStarted),
    fork(watchSignUpStarted),
    fork(watchRestaurantsFetch),
   
    
    spawn(watchAlertChannel),
  ]);
}




export default mainSaga;
