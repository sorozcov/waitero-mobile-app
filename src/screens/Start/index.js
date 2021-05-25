/* -------------------------------------------------------------------------- */
/*                              Componente Start                              */
/* -------------------------------------------------------------------------- */
// Este componente muestra la pantalla de inicio de la aplicación.

import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CommonActions } from "@react-navigation/native";
import Button from "../../components/Button";
import { useTheme } from "react-native-paper";
// import Button from '../General/Button';
import * as selectors from "../../logic/reducers";
import { Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import WaiteroLogo from '../../components/Logo'

function Start({ navigation, isAuthenticated ,user}) {
  if (isAuthenticated && user!=null) {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: "Orders",
          },
        ],
      })
    );
  }
  
  const startImage = require("../../assets/resources/order-food-3.jpg");
  const theme = useTheme();
  return (
    <View style={styles.container}>
    <LinearGradient
        // Background Linear Gradient
        colors={[theme.colors.white,theme.colors.primary]}
        // colors={[theme.colors.white,theme.colors.primary,theme.colors.secondary]}
        // start={{y:0.6,x:0}}
        // end={{y:1,x:1}}
        // locations={[0.4,0.65,0.8]}
        locations={[0.5,0.8]}
        style={styles.background}
      />
      <View
        style={{
          height: hp("2%"),
        }}
      />
      
      <WaiteroLogo/>
      <Text
        style={{
          ...styles.textStyle,
       
          textAlign:'center',
          fontSize: wp("6%"),
        }}
      >
        Ordena en cualquier restaurante desde tu celular
      </Text>
      <View
        style={{
          height: hp("30%"),
         
          justifyContent:'center',
          alignItems:'center',
        }}
      >
         
        <Image source={startImage} style={styles.foodImage} />
 
    </View>
    <View
        style={{
          height: hp("5%"),
         
        }}
      ></View>
     
      <Button
        theme={theme}
        color={theme.colors.secondary}
        icon="account-plus"
        mode="contained"
        labelStyle={{
          fontFamily: "dosis-bold",
          fontSize: 15,
          color: theme.colors.white,
        }}
        onPress={() => navigation.navigate("SignUp")}
        text='REGÍSTRATE'
      />
        
    
      <Button
        theme={theme}
        color={theme.colors.white}
        icon="login"
        mode="contained"
        labelStyle={{
          fontFamily: "dosis-bold",
          fontSize: 15,
          color: theme.colors.black,
        }}
        onPress={() => navigation.navigate("Login")}
        text='INICIAR SESIÓN'
      />
       
      <View
        style={{
          height: hp("24%"),
        }}
      />
     
      
    </View>
  );
}

export default connect(
  (state) => ({
    isAuthenticated: selectors.isAuthenticated(state),
    user: selectors.getAuthUserInformation(state),
  }),
  (dispatch) => ({
    // startLogin(navigation,values) {
    //   dispatch(AuthActions.startLogin(values));
    //   //navigation.replace('Login');
    // },
  })
)(Start);

const styles = StyleSheet.create({
  container: {
    height: hp("100%"),
    // backgroundColor: "#fff",
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: hp('100%'),
  },
  foodImage: {
    width: wp("80%"),
    height: hp("40%"),
    resizeMode: "contain",
  },
  textStyle: {
    fontFamily: "dosis-semi-bold",
    paddingLeft: wp("10%"),
    paddingRight: wp("5%"),


  },
});
