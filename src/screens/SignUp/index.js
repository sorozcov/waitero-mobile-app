/* -------------------------------------------------------------------------- */
/*                              Componente Signup                             */
/* -------------------------------------------------------------------------- */
// Este componente contiene los campos necesarios para crear un nuevo usuario.

import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView,Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useTheme} from 'react-native-paper';

// import Button from '../General/Button';
// import TextInput from '../General/TextInput';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput'
import ModalLoading from '../../components/ModalLoading';
import * as selectors from '../../logic/reducers';
import * as SignUpActions from '../../logic/actions/signUp';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';
import WaiteroLogo from '../../components/Logo'

function Login({navigation, dirty, valid, handleSubmit,startSignUp,isLoading,isAuthenticated,error,user}) {
  const signUp = values => {

    startSignUp(navigation,values)
  }
  const theme = useTheme();
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
    
    <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    
   style={styles.container}>
    <ScrollView style={styles.container} contentContainerStyle={styles.container}>
      
      <View style={{height:hp('2%')}}/>
      <WaiteroLogo/>
     
      <Field name={'username'} icon='account' component={TextInput} label='Usuario' placeholder='Ingresa un nombre de usuario' keyboardType='default' />
      <Field name={'phoneNumber'} icon={Platform.OS=='ios'? 'cellphone-iphone':'cellphone-android'} component={TextInput} label='No. Celular' placeholder='Ingresa su número celular' keyboardType='phone-pad' />
      <Field name={'email'} icon='email'component={TextInput} label='Correo' placeholder='Ingresa tu correo' keyboardType='email-address' />
      <Field name={'first_name'} icon='account-details' component={TextInput} label='Nombre' placeholder='Ingresa tu nombre' keyboardType='default' />
      <Field name={'last_name'} icon='account-details' component={TextInput} label='Apellido' placeholder='Ingresa tu apellido' keyboardType='default' />
      <Field name={'password'} icon='key' component={TextInput} label='Contraseña' placeholder='Ingresa tu contraseña' secureTextEntry={true}/>
      <Field name={'passwordConfirm'} icon='key-change' component={TextInput} label='Confirmar Contraseña' placeholder='Confirmar contraseña' secureTextEntry={true}/>
      
      
      
      <Button
        theme={theme} 
        
        icon="account-plus"
        mode="contained"
        labelStyle={{
          fontFamily: "dosis-bold",
          fontSize: 15,
          color: theme.colors.white,
        }}
        onPress={() => navigation.navigate("Login")}
        text={'Crear Cuenta'} 
       disabled={!(dirty && valid)}
       onPress={handleSubmit(signUp)}
      />
    
    
      <ModalLoading isLoading={isLoading}/>
      </ScrollView>
  
    </KeyboardAvoidingView>
    
  );
}

export default connect(
  state => ({
    isLoading: selectors.getIsSigningUpUser(state) || selectors.getIsAuthenticating(state),
    isAuthenticated: selectors.isAuthenticated(state),
    issue: selectors.getSigningUpError(state),
    user: selectors.getAuthUserInformation(state),
   
  }),
  dispatch => ({
    startSignUp(navigation,values) {
      dispatch(SignUpActions.startSignUp(values));
      //navigation.replace('Login');
    },
  }),
)(reduxForm({ 
  form: 'signUp',
  enableReinitialize : true,
  validate: (values) => {
    const errors = {};
    errors.email = !values.email
      ? 'Este campo es obligatorio'
      :  !values.email.includes('@')
      ? 'Tienes que ingresar un correo válido.'
      : undefined;
    errors.phoneNumber = !values.phoneNumber
      ? 'Este campo es obligatorio'
      : undefined;
    errors.first_name = !values.first_name
      ? 'Este campo es obligatorio'
      : undefined;
    errors.last_name = !values.last_name
      ? 'Este campo es obligatorio'
      : undefined;
      errors.password = !values.password
        ? 'Este campo es obligatorio'
        : undefined;
      errors.passwordConfirm = !values.passwordConfirm
        ? 'Debe confirmar su contraseña'
        : values.passwordConfirm !== values.password 
        ? 'La contraseñas ingresadas no coinciden'
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
  textStyle:{
    paddingLeft:'10%',
    paddingRight:'5%',
    fontSize:16,
    paddingTop:'4%',
    
  },
  contentContainer: {
    paddingTop: 30,
  },

});