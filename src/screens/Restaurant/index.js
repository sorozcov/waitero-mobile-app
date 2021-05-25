/* -------------------------------------------------------------------------- */
/*                           Componente Restaurant                            */
/* -------------------------------------------------------------------------- */

import React from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, ScrollView, View } from 'react-native';

import { Card, Button, Badge, Title } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import * as selectors from '../../logic/reducers';
import * as resActions from '../../logic/actions/restaurants';

import * as cnsts from '../../assets/constants/temp';

const restaurants = cnsts.restaurants;

function RestaurantPage({ token, user, selectedRestaurant }) {
	// useEffect(startFetchingTweetsHome,[]);

	const index = selectedRestaurant - 1;

	return (
		<ScrollView style={styles.container}>
			<Image source={{ uri: restaurants[index].uri }} style={{ width: 500, height: 200, borderRadius: 4 }}/>
			<View style={styles.container}>
				<Title style={{ padding: 8, fontSize: 32 }}>{restaurants[index].name}</Title>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		height: hp('100%'),
	},
	outer_container: {
		marginTop: '5%'
	}
});

export default connect(
	state => ({
		user: selectors.getAuthUserInformation(state),
		token: selectors.getAuthToken(state),
		selectedRestaurant: selectors.getRestaurantSelected(state)
	}),
	dispatch => ({
		selectRestaurant(id){
			dispatch(resActions.selectRestaurant(id))
		}
	}),
)(RestaurantPage);
