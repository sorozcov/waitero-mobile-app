/* -------------------------------------------------------------------------- */
/*                       Componente HomeDrawerNavigation                      */
/* -------------------------------------------------------------------------- */
// Este componente contiene la navegación de tipo Drawer que se encuentra en todas las pantallas 
// dentro de la aplicación luego de que el usuario haga login.

import * as React from 'react';
import { Text, View, StyleSheet,Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { AsyncStorage } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerItem,DrawerContentScrollView } from '@react-navigation/drawer';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';

import * as selectors from '../../../logic/reducers';
import * as actionsAuth from '../../../logic/actions/auth';
import {Linking} from 'react-native'
import WaiteroLogo from '../../../components/Logo'



function DrawerScreen({navigation,user,logout,userInformation, selectProfileUserId,selectSavedTweets}) {
  const [showModalAboutUs,setShowModalAboutUs] = React.useState(false)
  return (
    <DrawerContentScrollView >
    <View
      style={
        styles.drawerContent
      }
    >
    {userInformation!==null &&

        <View style={styles.userInfoSection}>
          <TouchableOpacity style={{width:wp('20%')}} onPress={()=>{}}>
            <Image style={{borderRadius:hp('50%'),height:hp('8%'),width:hp('8%'),alignSelf:'center'}} source={{uri:`https://ui-avatars.com/api/?name=${userInformation == null ? '' : `${userInformation.first_name}+${userInformation.last_name}`}&background=7DDE92&color=023E8D`}}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={{width:wp('30%')}} onPress={()=>{}}>
            <Text style={styles.title}>{userInformation.first_name + " "+ userInformation.last_name}</Text>
          </TouchableOpacity>
          
        
        </View>}
        <View
        style={{
          borderBottomColor: '#7DDE92',
          borderBottomWidth: 3,
          marginBottom:hp('2%'),
        }}
      />
      <DrawerItem
          icon={({ color, size}) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={size}
            />
          )}
          style={{paddingTop:0,marginTop:0, fontFamily:'dosis-semi-bold'}}
          label="Perfil"
          labelStyle={{ fontSize: 16, fontFamily:'dosis-semi-bold'}}
          onPress={() => {navigation.navigate('Account');}}
        />
         
         <DrawerItem
          icon={({ color, size}) => (
            <MaterialCommunityIcons
              name="help-network"
              color={color}
              size={size}
            />
          )}
          style={{paddingTop:0,marginTop:0, fontFamily:'dosis-semi-bold'}}
          label="Asistencia"
          labelStyle={{ fontSize: 16, fontFamily:'dosis-semi-bold'}}
          selectSavedTweets
          onPress={() => {Linking.openURL(`tel:${50258508720}`)}}
        />
          <DrawerItem
          icon={({ color, size}) => (
            <MaterialCommunityIcons
              name="code-tags"
              color={color}
              size={size}
            />
          )}
          style={{paddingTop:0,marginTop:0, fontFamily:'dosis-semi-bold'}}
          label="Sobre nosotros"
          labelStyle={{ fontSize: 16, fontFamily:'dosis-semi-bold'}}
          
          onPress={() => {setShowModalAboutUs(true)}}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="logout"
              color={color}
              size={size}
            />
          )}
          style={{paddingTop:0,marginTop:0, fontFamily:'dosis-semi-bold'}}
          label="Cerrar sesión"
          labelStyle={{ fontSize: 16, fontFamily:'dosis-semi-bold'}}
          onPress={() => logout(navigation)}
        />
        
        <Modal
            transparent={true}
            animationType={'none'}
            isVisible={showModalAboutUs}
            avoidKeyboard={true}
            coverScreen={true}
            hasBackdrop={true}
            // onBackButtonPress={()=>setShowModalAboutUs(false)}
            onBackdropPress={()=>setShowModalAboutUs(false)}
            style={styles.modalB}
            // deviceWidth={hp('100%')}
            // deviceHeight={wp('100%')}
            onSwipeComplete={()=>setShowModalAboutUs(false)}
       
          >
            <View style={styles.modalBackground}>
              <View style={styles.modal}>
                <WaiteroLogo height={hp('12%')}/>
               
                <View
                  style={{
                    borderBottomColor: '#7DDE92',
                    borderBottomWidth: 3,
                    marginTop:hp('0%'),
                    marginBottom:hp('0%'),
                  }}
                />
                <Text style={{fontFamily:'dosis-light',paddingLeft:wp('5%'),paddingRight:wp('5%',),fontSize:17}} >
                  {'Waitero es una aplicación.'}
                </Text>
                
                <View style={{paddingBottom: '5%'}}>						
                  
                </View>
              </View>
            </View>
          </Modal>
    
       
        
      </View>
    </DrawerContentScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
   
    backgroundColor: '#fff',
   
  },
  topContainer: {
    height: hp('100%'),
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  inputContainerStyle: {
    margin: 8,
  },
  imageContainer: {
    alignItems: 'center'
  },
  logoImage: {
    width: 100,
    height: 100,
    marginTop:40,
    resizeMode: 'contain',
    alignSelf:'center',
  },
  inputContainerStyle: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  textStyle:{
    textAlign: 'center', 
    
    fontSize:16
  },
  drawerContent: {
    height: hp('100%'),
  },
  userInfoSection: {
   
    paddingLeft:wp('6%'),
    backgroundColor:'white',
   
    paddingTop:hp('1.5%'),
    height: hp('16.5%'),
  },
  title: {
    marginTop: hp('2%'),
    fontSize:20,fontFamily:'dosis-semi-bold',
 
    textTransform:'uppercase',
    color:'black'
  },
  caption: {
    fontSize: wp('4%'),
    lineHeight: hp('2%'),
    paddingTop: hp('0.8%'),
    color:'gray'
  },
  modalB:{
    flex:1,
    flexDirection: 'row',
    margin: 0
  },
  modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',

  },
  modal: {
      backgroundColor: '#FFFFFF',
      height: 350,
      width: '80%',
      borderRadius: 10,
      justifyContent: 'space-around'
  },
});


export default connect(
  state => ({
    user: selectors.getAuthUser(state),
    userInformation: selectors.getAuthUserInformation(state),
  }),
  dispatch => ({
    async logout(navigation) {
      await AsyncStorage.removeItem('auth');
      dispatch(actionsAuth.logout());
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Start' },
           
          ],
        })
      );
    },
    // selectProfileUserId(navigation, userId){
    //   dispatch(actionsProfile.setSelectedProfileUserId(userId));
    //   navigation.navigate('Profile');
    // },
    
  }),
)(DrawerScreen);