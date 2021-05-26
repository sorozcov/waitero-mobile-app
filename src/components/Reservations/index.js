/* -------------------------------------------------------------------------- */
/*                               Componente Home                              */
/* -------------------------------------------------------------------------- */
// Este componente contiene la lista de restaurantes inicial

import { connect } from 'react-redux';
import React, { useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl, Text, View, Button } from 'react-native';

import drop from 'lodash/drop';
import shuffle from 'lodash/shuffle';
import dropRight  from 'lodash/dropRight';

import * as selectors from '../../logic/reducers';

import ReservationCard from '../../components/ReservationCard';

import * as consts from '../../assets/constants/temp';

function Reservations({ selectRestaurant, navigation, fetchRes, isFetching, reservations }) {

	return (
		<View>
			<ScrollView
				style={styles.container}
				refreshControl={
					<RefreshControl
						refreshing={isFetching}
						onRefresh={() => fetchRes()}
						tintColor='#3498DB'
					/>
				}
			>
            <Text style={styles.header}>Reservations</Text>
			{/* {dropRight(restaurants, restaurants.length - 2).map(
				restaurant => (
					<ReservationCard key={restaurant.id} restaurant={restaurant} selectRestaurant={selectRestaurant} navigation={navigation} func={setShowModal}/>
				)
			)} */}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignContent: 'center',
	},
	header: {
        color: '#00171F',
        fontSize: 24,
        fontWeight: '600',
        padding: 8,
		textAlign: 'left'
    },
	subheader: {
        color: '#00171F',
        fontSize: 16,
        fontWeight: '400',
        padding: 8,
		textAlign: 'left'
    },
	containerStyle: {
		backgroundColor: 'white',
		padding: 20,
		height: "60%",
		width: "90%",
		alignSelf: 'center',
		textAlign: 'center',
		textAlignVertical: 'top',
	}
});

export default connect(
	state => ({
		reservations: selectors.getRess(state),
	}),
	dispatch => ({
		selectRestaurant(navigation, id){
			// dispatch(resActions.selectRestaurant(id))
			// navigation.navigate("RestaurantPage")
		},
	}),
)(Reservations);
