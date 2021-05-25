/* -------------------------------------------------------------------------- */
/*                              Componente Login                              */
/* -------------------------------------------------------------------------- */
// Este componente contiene los campos para hacer login en la aplicación.

import React,{useState} from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { StyleSheet, View     ,AsyncStorage, ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';
import * as actionsLoggedUser from '../../logic/actions/loggedUser';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput'
// import {TextInput} from 'react-native-paper';
import ModalLoading from '../../components/ModalLoading';
import * as selectors from '../../logic/reducers';
import * as AuthActions from '../../logic/actions/auth';
import WaiteroLogo from '../../components/Logo'
import { useTheme } from 'react-native-paper';
import * as firebase from "firebase";
import { suscribeToFirebase } from '../../database/firebase/suscribeChanges';
import { suscribeFirebase } from '../../../config';



function Login({navigation, dirty, valid, handleSubmit,startLogin,isLoading,user,saveLoggedUser,isAuthenticated}) {
  // const login = values => {
  //   console.log("fuck");
  //   sLogin(values);
  // }
  const theme = useTheme()
  
  // if(isAuthenticated && user!=null){
  //   console.log('entra aqui');
  //   navigation.dispatch(
  //     CommonActions.reset({
  //       index: 1,
  //       routes: [
  //         { name: 'Home' },
         
  //       ],
  //     })
  //   );
  
  // }
  const { colors, roundness } = theme;
  const [modalVisibleIndicatorLogin, setmodalVisibleIndicatorLogin] = useState(false);
  const [mailInput, changeMailInput] = useState('');
  const [password, changePassword] = useState('');
  const [verifyingUser, setVerifyingUser] = useState(true);
  console.log("user");
  console.log(user);
  async function getPersistedStorage() {

  if(verifyingUser){
      
    try {
      let userCheckpoint = JSON.parse(await AsyncStorage.getItem('userCheckpoint'));
      // console.log("persisted storage")
      // console.log(userCheckpoint)
      if(userCheckpoint){
        // let saveLogged = await saveLoggedUser(navigation,userCheckpoint)
        // if(saveLogged){
        //   setVerifyingUser(false)
        // }
        // if(!suscribeFirebase){
        //   await suscribeToFirebase();
        // }
        

        console.log("Relogin succesfull");
        
      }else{
        setVerifyingUser(false)
        
      }
      
    } catch (error) {
      console.log(error);
      setVerifyingUser(false)
      
    }
     
  }
}
getPersistedStorage();
// const login = ()=>{
//   // console.log("fuck")
  
// }
async function login(values) {

  Keyboard.dismiss();
  console.log("started");
  setmodalVisibleIndicatorLogin(true);
  // await createDatesDocuments({});
  
   try {
       
       await firebase.auth()
           .signInWithEmailAndPassword(values.username, values.password);
 
          
          
       // Navigate to the Orders page, the user is auto logged in
       user=await firebase.auth().currentUser; 
       if(user.emailVerified){
          await saveLoggedUser(navigation,user)
          setmodalVisibleIndicatorLogin(false);
          
          console.log("Login succesfull");
       }else{
        console.log("Verificar correo!");
        setTimeout(function(){
          Alert.alert(
           "Verificar correo",
           "Verifique su correo electrónico para ingresar a la plataforma.",
           [
            {text: 'Enviar correo de nuevo', onPress: () => {firebase.auth().currentUser.sendEmailVerification()}},
             {text: 'Ok', onPress: () => {}},
           ],
          )},100)
       }
       
   } catch (error) {
       console.log(error.toString());
       setmodalVisibleIndicatorLogin(false);
       setTimeout(function(){
       Alert.alert(
        "Error",
        "Los datos ingresados no son válidos para ningún usuario.",
        [
          {text: 'OK', onPress: () => {}},
        ],
       )},100)
   }
 
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
        <ModalLoading isLoading={modalVisibleIndicatorLogin}/>
      </View>
  );
}

export default connect(
  state => ({
    // isLoading: selectors.getIsAuthenticating(state),
    // isAuthenticated: selectors.isAuthenticated(state),
    // user: selectors.getAuthUserInformation(state),
    // token:selectors.getAuthToken(state),
   
  }),
  dispatch => ({
    startLogin(navigation,values) {
      dispatch(AuthActions.startLogin(values));
      //navigation.replace('Login');r
    },
    async saveLoggedUser(navigation,user) {

      //Se cargan los usuarios
      try{
        const userLoggedIn = await firebase.firestore().collection('users').doc(user.uid).get();
        dispatch(actionsLoggedUser.login(userLoggedIn.data()));
        if(suscribeFirebase){
          await suscribeToFirebase()
        }
        console.log("AQUI1")
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'Home' },
             
            ],
          })
        );
        
      }catch(error){
        console.log("AQUI")
        console.log("Error en loggear internet.")
        console.log(error);
      }
      return await true
      
     
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