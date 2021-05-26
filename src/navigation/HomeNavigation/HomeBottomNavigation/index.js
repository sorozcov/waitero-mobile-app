/* -------------------------------------------------------------------------- */
/*                       Componente HomeBottomNavigation                      */
/* -------------------------------------------------------------------------- */
// Este componente contiene la navegación de tipo bottom entre las todas las pantallas 
// dentro de la aplicación luego de iniciar sesión.

import * as React from 'react';
import { Platform ,View,Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as selectors from '../../../logic/reducers';
import { connect } from 'react-redux';
import HomeStack from '../HomeStackNavigator';
// import DirectMessagesStack from '../DirectMessagesStackNavigator';
// import NotificationsStackNavigator from '../NotificationsStackNavigator';
// import ExploreStackNavigator from '../ExploreStackNavigator';
import NewOrdersStackScreen from '../../../screens/orders/NewOrderStackScreen';
import OrderStackScreen from '../../../screens/orders/OrdersStackScreen';


const Tab = createBottomTabNavigator();

function HomeBottomNavigation({navigation}) {
 

  return (
      <Tab.Navigator
        initialRouteName="NewOrderr"
        tabBarOptions={{
          keyboardHidesTabBar:true,
          activeBackgroundColor:"#f0edf6",
          activeTintColor:'#00ACEE',
          inactiveTintColor:"gray",
          inactiveBackgroundColor:"#000000",
          tabStyle:{ backgroundColor:'white' ,paddingBottom:0,paddingTop:5,fontSize:'50px',borderTopColor:'#00ACEE',borderTopWidth:0.2,},
          labelStyle:{fontSize: 12},
          borderTopColor:'black'
        }}
        >
       
   
         <Tab.Screen name="NewOrderr"  component={NewOrdersStackScreen}
                options={{            
                  tabBarLabel: 'Nuevo Pedido',
                  
                  tabBarIcon: ({ color}) => (
                    <MaterialCommunityIcons name="food" color={color} size={30}
                    style={{ marginTop: 0,paddingBottom:8 }} />
                  ),
                }}
            />
            <Tab.Screen name="Orders" component={OrderStackScreen} options={{            
            tabBarLabel: 'Pedidos',
            
            tabBarIcon: ({ color}) => (
              <MaterialCommunityIcons name="format-list-numbered" color={color} size={30}
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