/* -------------------------------------------------------------------------- */
/*                       Componente MainStackNavigation                       */
/* -------------------------------------------------------------------------- */
// Este componente contiene la navegación de tipo Stack que unen los componentes de crear una cuenta, login y start, 
// con el resto de la aplicación. Este también trae el token guardado en el AsyncStorage.

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../../screens/Login';
import SignUpScreen from '../../screens/SignUp';
import StartScreen from '../../screens/Start';
import HomeRootNavigator from '../../navigation/HomeNavigation/HomeRootNavigator';
import * as selectors from '../../logic/reducers';
import * as actions from '../../logic/actions/auth';


const Stack = createStackNavigator();

function MainStack({navigation,route,isAuthenticated=false,savePersistedStorage,theme,user}) {
  const [verify, setVerify] = useState(false);
  async function getPersistedStorage() {
    try {
      const token = JSON.parse(await AsyncStorage.getItem('auth'));
      if(!isAuthenticated && token !== null && user!=null){
        savePersistedStorage(token);
      }else {
        setVerify(true);
      } 
    } catch (error) {
      console.log(error);
    }
  }
  getPersistedStorage();

  return (
    <NavigationContainer>
      { verify && (
      <Stack.Navigator screenOptions={{ headerBackTitleVisible:false,
        headerShown: true ,
        headerTitleStyle: {
          fontFamily: 'dosis-bold',          
          },
        headerMode: 'screen'}} initialRouteName={"Start"}>
        <Stack.Screen name="Start" options={{ title: 'WAITERO', headerTitleAlign:'center',}} component={StartScreen} />
        <Stack.Screen name="Login" options={{ title: 'INICIA SESIÓN', headerTitleAlign:'center'}} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{ title: 'REGÍSTRATE', headerTitleAlign:'center'}} component={SignUpScreen} />
        <Stack.Screen name="Home" options={{ headerShown:false}} component={HomeRootNavigator} />
      </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default connect(
  state => ({
    isAuthenticated: selectors.isAuthenticated(state),
    user: selectors.getAuthUserInformation(state),
  }),
  dispatch => ({
    savePersistedStorage(token) {
      dispatch(actions.completeLogin(token));
      dispatch(actions.authenticationUserInformationStarted());
    },
  }),
)(MainStack);