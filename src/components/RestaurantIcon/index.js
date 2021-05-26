import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import styles from './styles';
import * as resActions from '../../logic/actions/restaurants';

// Elemento que se muestra en los resultados de búsqueda para restaurantes
// Redirige a la página del restaurante al ser presionado
const RestaurantIcon = ({ restaurant, press }) => (
    <View style={styles.authorContainer}>
        <TouchableOpacity onPress={press} style={styles.scrollView}>
            <Image source={{uri: restaurant.uri}} style={styles.authorPic}/>
            <View style={styles.authorInfo}>
                <Text numberOfLines={2} style={styles.name}>
                    {restaurant.name}
                </Text>
            </View>
        </TouchableOpacity>
    </View>
);

export default connect(
    undefined,
    (dispatch, { restaurant, navigation }) => ({
        press(){
            dispatch(resActions.selectRestaurant(restaurant.id))
            navigation.navigate('RestaurantPage')
        }
    })
)(RestaurantIcon);