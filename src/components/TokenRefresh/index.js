/* -------------------------------------------------------------------------- */
/*                           Componente RefreshToken                          */
/* -------------------------------------------------------------------------- */
// Este componente es un componente vacio que actualiza el token del usuario en sesión.

import { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../logic/actions/auth';


const TokenRefresh = ({ onRefresh, reviewTime = 10000 }) => {
  useEffect(
    () => {
      onRefresh();
      const interval = setInterval(onRefresh, reviewTime);
      return () => {
        clearInterval(interval);
      };
    },
    []
  );
  return null;
};


export default connect(
  undefined,
  dispatch => ({
    onRefresh() {
      dispatch(actions.startTokenRefresh());
    },
  }),
)(TokenRefresh);