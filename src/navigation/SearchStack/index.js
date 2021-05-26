import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RestaurantPage from '../../screens/Restaurant';
import Search from '../../components/Search';
import TagPage from '../../components/TagPage';

// se crea el stack de navegacion para la busqueda
const Stack = createStackNavigator();

// se indican los componentes incluidos en el stack
// el primero componente ingresado es el componente por defecto del stack
const SearchStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Search" 
            component={Search}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="TagPage"
            component={TagPage}
            options={{
                headerBackTitleVisible: false,
                headerTitle: null,
                headerTransparent: true,
                headerTintColor: "#3498DB",
            }}
        />
        <Stack.Screen
            name="RestaurantPage"
            component={RestaurantPage}
            options={{
                headerShown: false
            }}
        />
    </Stack.Navigator>
)

export default SearchStack;