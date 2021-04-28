/* -------------------------------------------------------------------------- */
/*                           Componente ModalLoading                          */
/* -------------------------------------------------------------------------- */
// Este componente contiene un modal que se utiliza en muchas pantallas de la aplicación y su 
// función es indicar al usuario cuando se esta cargando información de la base de datos.

import React from 'react';
import { StyleSheet, View,Modal,ActivityIndicator } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function ModalLoading({isLoading=false}) {

  return (
    
    <Modal
        transparent={true}
        animationType={'none'}
        visible={isLoading}>
        <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator size="large" animating={isLoading} color='#00ACEE'/>
        </View>
        </View>
    </Modal> 
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    height: hp('100%'),
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});