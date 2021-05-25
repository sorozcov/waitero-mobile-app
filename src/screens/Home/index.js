/* -------------------------------------------------------------------------- */
/*                               Componente Home                              */
/* -------------------------------------------------------------------------- */
// Este componente contiene la lista de restaurantes inicial

import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView } from 'react-native';

import { Card, Button, Badge } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import * as selectors from '../../logic/reducers';
import * as resActions from '../../logic/actions/restaurants';

import * as consts from '../../assets/constants/temp';

const restaurants = consts.restaurants

function HomeScreen({ selectRestaurant, navigation }) {
	// useEffect(startFetchingTweetsHome,[]);

	return (
		<ScrollView style={styles.container}>
		{restaurants.map(
			restaurant => (
				<Card style={{ borderRadius: 0, marginBottom: 8, height: 256 }}>
					
					<Card.Title 
						title={restaurant.name} 
						subtitle={`${restaurant.time - 5}-${restaurant.time + 5} min`} 
						// right={
						// 	() => <IconButton icon="star-circle" color={Colors.cyan200} onPress={() => console.log("Add to favorites")}/>
						// }
						right={
							() => <Badge size={24} style={{ marginRight: 12}}>{restaurant.score}</Badge>
						}
					/>

					<Card.Cover 
						style={{ marginHorizontal: '3%', height: '50%' }} 
						source={{ uri: restaurant.uri }} 
					/>

					<Card.Actions>
						<Button onPress={() => selectRestaurant(navigation, restaurant.id)}>
							Ver
						</Button>
				      	<Button>Reserva Rápida</Button>
				    </Card.Actions>

				</Card>
			)
		)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		height: hp('100%'),
		alignContent: 'center',
	},
});

export default connect(
	state => ({
		user: selectors.getAuthUserInformation(state),
		token: selectors.getAuthToken(state),
	}),
	dispatch => ({
		selectRestaurant(navigation, id){
			dispatch(resActions.selectRestaurant(id))
			navigation.navigate("RestaurantPage")
		}
	}),
)(HomeScreen);
