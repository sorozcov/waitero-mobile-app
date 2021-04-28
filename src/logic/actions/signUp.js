/* -------------------------------------------------------------------------- */
/*                        Acciones del reductor SignUp                        */
/* -------------------------------------------------------------------------- */

import * as types from '../types/signUp';


export const startSignUp = ({username, password,email,first_name,last_name, phoneNumber}) => ({
  type: types.SIGNUP_USER_STARTED,
  payload: { username, password,email,first_name,last_name,phoneNumber},
});

export const completeSignUp = () => ({
  type: types.SIGNUP_USER_COMPLETED,
  payload: {},
});

export const failSignUp = error => ({
  type: types.SIGNUP_USER_FAILED,
  payload: { error },
});

