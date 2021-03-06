/* -------------------------------------------------------------------------- */
/*                                  Saga Auth                                 */
/* -------------------------------------------------------------------------- */

import {
    call,
    takeEvery,
    put,
    delay,
    select,
  } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import * as selectors from '../reducers';
import * as actions from '../actions/auth';
import * as types from '../types/auth';
  

import { Alert } from 'react-native';
import API_BASE_URL from './settings/apibaseurl';
import TOKEN_LIFE_TIME from './settings/tokenLifeTime';  

function* login(action) {
  try {
    const response = yield call(
      fetch,
      `${API_BASE_URL}/token-auth/`,
      {
        method: 'POST',
        body: JSON.stringify(action.payload),
        headers:{
          'Content-Type': 'application/json',
        },
      },
    );
      
    if (response.status <= 300) {
      const { token } = yield response.json();
      //Se guarda el persisted storage////////
      yield AsyncStorage.setItem('auth', JSON.stringify(token));
      ////////////////////////////////////////
      yield put(actions.completeLogin(token));
      yield put(actions.authenticationUserInformationStarted());
    } else {
        
        
       
      yield put(actions.failLogin('El nombre de usuario y contraseña introducidos no coinciden con nuestros registros. Revísalos e inténtalo de nuevo.'));
      yield delay(200)
      const alertButtons =[
          {text: 'Aceptar', style:'default'},
      ]
      const titleError ="Inténtalo de nuevo"
      const errorMessage='El nombre de usuario y contraseña introducidos no coinciden con nuestros registros. Revísalos e inténtalo de nuevo.';
    
      yield call(Alert.alert,titleError,errorMessage,alertButtons)
     
        
        
    }
  } catch (error) {
      
    yield put(actions.failLogin('Falló la autentitación.'));
    yield delay(200)
    const alertButtons =[
      {text: 'Aceptar', style:'default'},
    ]
    const titleError ="Inténtalo de nuevo"
    const errorMessage="Falló la conexión con el servidor."
        
    
    yield call(Alert.alert,titleError,errorMessage,alertButtons)
  }
}
  

  
export function* watchLoginStarted() {
  yield takeEvery(
    types.AUTHENTICATION_STARTED,
    login,
  );
}
  



  function* userInformationRequest(action) {
    try {
      
     
      const isAuth = yield select(selectors.isAuthenticated);
      const userId = yield select(selectors.getAuthUserID);
     
      if (isAuth) {
       
        const token = yield select(selectors.getAuthToken);
        
        const response = yield call(
          fetch,
          `${API_BASE_URL}/clients/${userId}/`,
          {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
      
      
        // console.log()
        if (response.status <= 300) {
          const jsonResultUser = yield response.json();
          yield put(actions.authenticationUserInformationCompleted(jsonResultUser));
          
        } else {
          console.log('not a client user')
         
          yield AsyncStorage.removeItem('auth');
          yield put(actions.logout());
          yield put(actions.failTokenRefresh('Falló la conexión'));   
          yield delay(200)
          const alertButtons =[
                {text: 'Aceptar', style:'default'},
            ]
          const titleError ="Usuario tipo restaurante"
          const errorMessage='Tu usuario es de tipo restaurante. Puedes entrar a la plataforma desde la web o la app especial para restaurantes.';
            
        
          yield call(Alert.alert,titleError,errorMessage,alertButtons) 
        }
      }
    } catch (error) {
      console.log(error);
      yield AsyncStorage.removeItem('auth');
      yield put(actions.logout());
      yield put(actions.failTokenRefresh('Falló la conexión'));    
    }
  }


  export function* watchUserInformationRequest() {
    yield takeEvery(
      types.AUTHENTICATION_USER_INFORMATION_STARTED,
      userInformationRequest,
    );
  }
  
function* refreshToken(action) {
  const expiration = yield select(selectors.getAuthExpiration);
  const now =  parseInt(new Date().getTime() / 1000);
  if (expiration - now < (TOKEN_LIFE_TIME/2)) {
    try {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/token-refresh/`,
        {
          method: 'POST',
          body: JSON.stringify({ token }),
          headers:{
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        const jResponse = yield response.json();
        yield put(actions.completeTokenRefresh(jResponse.token));
      } else {
        yield AsyncStorage.removeItem('auth');
        yield put(actions.logout());
        const { non_field_errors } = yield response.json();
        yield put(actions.failTokenRefresh(non_field_errors[0]));
        yield delay(200);
        const alertButtons =[
          {text: 'Aceptar', style:'default'},
        ]
        const titleError ="Estuviste desconectado por mucho tiempo"
        const errorMessage="Se venció la sesión de tu usuario."
        yield call(Alert.alert,titleError,errorMessage,alertButtons)   
      }
    } catch (error) {
      yield AsyncStorage.removeItem('auth');
      yield put(actions.logout());
      yield put(actions.failTokenRefresh('Falló la conexión'));
    }
  }
}

export function* watchRefreshTokenStarted() {
  yield takeEvery(
    types.TOKEN_REFRESH_STARTED,
    refreshToken,
  );
}