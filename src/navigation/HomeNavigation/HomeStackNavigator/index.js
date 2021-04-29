/* -------------------------------------------------------------------------- */
/*                       Componente HomeStackNavigation                       */
/* -------------------------------------------------------------------------- */
// Este componente contiene la navegación de tipo Stack de todas las pantallas del feed general.

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


import HomeFeed from '../../../screens/Home';
import WaiteroLogo from '../../../components/Logo';



const Stack = createStackNavigator();

export default function HomeStack({navigation,route}) {
  if(route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false})
  } else {
    navigation.setOptions({tabBarVisible: true})
  };
  return (
      <Stack.Navigator screenOptions={{ headerBackTitleVisible:false,
        headerShown: true ,
        headerMode: 'screen'}} initialRouteName="HomeFeed">
        <Stack.Screen 
            name="HomeFeed" 
            options={{ title: (<WaiteroLogo height={hp('6%')} />), headerTitleAlign:'center'}} 
            component={HomeFeed} />
        

        
        
      </Stack.Navigator>
   
  );
}