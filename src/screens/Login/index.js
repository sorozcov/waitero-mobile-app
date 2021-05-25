/* -------------------------------------------------------------------------- */
/*                              Componente Login                              */
/* -------------------------------------------------------------------------- */
// Este componente contiene los campos para hacer login en la aplicación.

import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { StyleSheet, View } from 'react-native';

import { useTheme } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Button from '../../components/Button';
import WaiteroLogo from '../../components/Logo';
import TextInput from '../../components/TextInput';
import ModalLoading from '../../components/ModalLoading';

import * as selectors from '../../logic/reducers';
import * as AuthActions from '../../logic/actions/auth';


function Login({navigation, dirty, valid, handleSubmit, startLogin, isLoading, user, isAuthenticated}) {
  const theme = useTheme()

  const login = values => {
    startLogin(navigation,values)
  }
  
  if(isAuthenticated && user!=null){
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Home' },   
        ],
      })
    );
  }

  return (
    <View style={styles.container}> 
      <View style={{height:hp('15%')}}/>
      
      <WaiteroLogo/> 
     
      <Field name={'username'} theme={theme} component={TextInput} icon='account' label='Usuario' placeholder='Ingresa tu usuario' keyboardType='default' secureTextEntry={false} />
      <Field name={'password'} theme={theme} component={TextInput} icon='key' label='Contraseña' placeholder='Ingresa tu contraseña' secureTextEntry={true}/> 
     
      <Button
        theme={theme} 
        icon="login"
        mode="contained"
        labelStyle={{
          fontFamily: "dosis-bold",
          fontSize: 15,
          color: theme.colors.white,
        }}
        onPress={handleSubmit(login)}
        text='INICIAR SESIÓN'
      />
    
      <View style={{height:hp('10%')}}/>
        <ModalLoading isLoading={isLoading}/>
      </View>
  );
}

export default connect(
  state => ({
    isLoading: selectors.getIsAuthenticating(state),
    isAuthenticated: selectors.isAuthenticated(state),
    user: selectors.getAuthUserInformation(state),
    token:selectors.getAuthToken(state),
  }),
  dispatch => ({
    startLogin(navigation, values) {
      dispatch(AuthActions.startLogin(values));
    },
  }),
)(reduxForm({ 
  form: 'login',
  enableReinitialize : true,

  validate: (values) => {
    const errors = {};

    errors.username = !values.username
      ? 'Este campo es obligatorio'
      : undefined;
    errors.password = !values.password
      ? 'Este campo es obligatorio'
      : undefined;
    return errors;
  }
})(Login));


const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center'
  },
  logoImage: {
    width: wp('20%'),
    height: hp('9%'),
    resizeMode: 'contain',
  },
});