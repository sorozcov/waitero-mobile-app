/* -------------------------------------------------------------------------- */
/*                               Saga Principal                               */
/* -------------------------------------------------------------------------- */

import { fork, all,spawn } from 'redux-saga/effects';
// import { watchLoginStarted,watchUserInformationRequest, watchRefreshTokenStarted } from './auth';
import { watchSignUpStarted } from './signUp';
import { watchAlertChannel } from 'redux-saga-rn-alert';

import { watchAddCategory, watchEditCategory, watchFetchCategories, watchRemoveCategory } from './categories';
import { watchLoginStarted, watchLogoffStarted } from './login';
import { watchAddOrderStarted, watchEditOrderStarted, watchOrdersFetch, watchRemoveOrder,watchEditOrderStatusStarted } from './orders';
import {
    watchAddProductsStarted,
    watchDeleteProductStarted,
    watchEditProductsStarted,
    watchProductsFetchStarted,
    // watchAddIngredientStarted,
    // watchEditIngredientStarted
} from './products';


function* mainSaga() {
  yield all([
    // fork(watchLoginStarted),
    // fork(watchUserInformationRequest),
    // fork(watchRefreshTokenStarted),
    // fork(watchSignUpStarted),
   
    fork(watchLoginStarted),
        fork(watchLogoffStarted),

        fork(watchFetchCategories),
        fork(watchAddCategory),
        fork(watchEditCategory),
        fork(watchRemoveCategory),

        fork(watchProductsFetchStarted),
        fork(watchAddProductsStarted),
        fork(watchEditProductsStarted),
        fork(watchDeleteProductStarted),
        
        fork(watchAddOrderStarted),
        fork(watchEditOrderStarted),
        fork(watchEditOrderStatusStarted),
        fork(watchOrdersFetch),
        fork(watchRemoveOrder),
    
    spawn(watchAlertChannel),
  ]);
}




export default mainSaga;
