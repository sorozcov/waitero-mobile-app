import React from 'react';
import { ScrollView, Text } from 'react-native';

import lowerCase from 'lodash/lowerCase';

import styles from './styles';
import RestaurantIcon from '../RestaurantIcon';

//Lista de autores
// Muestra todos los autores resultantes de la búsqueda
const RestaurantList = ({ restaurants, filter, navigation }) => (
    <ScrollView horizontal={true} style={styles.authorsContainer}>
        {
            console.log(restaurants)
        }
        {
            restaurants.filter(restaurant => lowerCase(restaurant.name).includes(lowerCase(filter))).length === 0
            ?
            <Text style={styles.infoMessage}>No hay resultados</Text>
            : 
            restaurants.filter(restaurant => lowerCase(restaurant.name).includes(lowerCase(filter))).map(restaurant =>
                <RestaurantIcon key={restaurant.id} restaurant={restaurant} navigation={navigation}/>
            )
        }
    </ScrollView>
);

export default RestaurantList;