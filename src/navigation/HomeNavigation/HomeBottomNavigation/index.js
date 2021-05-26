/* -------------------------------------------------------------------------- */
/*                       Componente HomeBottomNavigation                      */
/* -------------------------------------------------------------------------- */
// Este componente contiene la navegación de tipo bottom entre las todas las pantallas 
// dentro de la aplicación luego de iniciar sesión.

import * as React from 'react';
import { connect } from 'react-redux';
import { Platform ,View} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SearchStack from '../../SearchStack';
import HomeStack from '../HomeStackNavigator';
import ReservationsPage from '../../../screens/Reservations';
import ReservationStack from '../../ReservationStack';
//import ProfileScreen from '../../../screens/Profile';

import * as selectors from '../../../logic/reducers';

const Tab = createBottomTabNavigator();

function HomeBottomNavigation({navigation}) {
 

  return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          keyboardHidesTabBar:true,
          activeBackgroundColor:"#f0edf6",
          activeTintColor:'#00ACEE',
          inactiveTintColor:"gray",
          inactiveBackgroundColor:"#000000",
          tabStyle:{ backgroundColor: 'white',paddingBottom:Platform.OS=="ios" ?30:8,marginBottom:Platform.OS=="ios" ? -40:0,paddingTop:20,marginTop:-10,fontSize:'50px'},
          labelStyle:{fontSize: 12}
        }}
        >
       
        <Tab.Screen name="Home"  component={HomeStack}
          options={{            
            tabBarLabel: '',
            
            tabBarIcon: ({ color}) => (
              <MaterialCommunityIcons name="food" color={color} size={30}
              style={{ marginTop: 0,paddingBottom:8 }} />
            ),
          }}
        />
        <Tab.Screen name="Explore"  component={SearchStack}
          options={{            
            tabBarLabel: '',
            
            tabBarIcon: ({ color}) => (
              <MaterialCommunityIcons name="text-search" color={color} size={30}
              style={{ marginTop: 0,paddingBottom:8 }} />
            ),
          }}
        />
        <Tab.Screen name="ReservationsPage"  component={ReservationsPage}
          options={{            
            tabBarLabel: '',
            
            tabBarIcon: ({ color}) => (
              <MaterialCommunityIcons name="clipboard-text" color={color} size={30}
              style={{ marginTop: 0,paddingBottom:8 }} />
            ),
          }}
        />    
      </Tab.Navigator>
  );
}




export default connect(
  state => ({
    user: selectors.getAuthUser(state),
  }),
  dispatch => ({
    logout(navigation) {
      //dispatch(actionsLoggedUser.logout());
      navigation.replace('Start');
    },
  }),
)(HomeBottomNavigation);