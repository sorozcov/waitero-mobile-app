import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Reservations from '../../components/Reservations';

// se crea el stack de navegacion para la busqueda
const Stack = createStackNavigator();

// se indican los componentes incluidos en el stack
// el primero componente ingresado es el componente por defecto del stack
const ReservationStack = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Reservations" 
            component={Reservations}
            options={{
                headerShown: false
            }}
        />
    </Stack.Navigator>
)

export default ReservationStack;