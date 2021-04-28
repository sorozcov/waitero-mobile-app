/* -------------------------------------------------------------------------- */
/*                              Componente Login                              */
/* -------------------------------------------------------------------------- */
// Este componente contiene los campos para hacer login en la aplicación.

import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';

import Button from '../../components/Button';
import TextInput from '../../components/TextInput'
// import {TextInput} from 'react-native-paper';
import ModalLoading from '../../components/ModalLoading';
import * as selectors from '../../logic/reducers';
import * as AuthActions from '../../logic/actions/auth';
import WaiteroLogo from '../../components/Logo'
import { useTheme } from 'react-native-paper';



function Login({navigation, dirty, valid, handleSubmit,startLogin,isLoading,user,isAuthenticated}) {
  const login = values => {
    startLogin(navigation,values)
  }
  const theme = useTheme()
  
  if(isAuthenticated && user!=null){
    console.log('entra aqui');
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
    startLogin(navigation,values) {
      dispatch(AuthActions.startLogin(values));
      //navigation.replace('Login');r
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
      
      // errors.passwordConfirm = !values.passwordConfirm
      //   ? 'Debe confirmar su contraseña'
      //   : values.passwordConfirm !== values.password 
      //   ? 'La contraseñas ingresadas no coinciden'
      //   : undefined;


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