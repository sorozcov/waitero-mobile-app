/* -------------------------------------------------------------------------- */
/*                               Componente Home                              */
/* -------------------------------------------------------------------------- */
// Este componente contiene la lista de restaurantes inicial

import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView , View} from 'react-native';

import { Card, Button, Badge, Modal, Title, Divider, TextInput, Snackbar, Provider } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as selectors from '../../logic/reducers';
import * as resActions from '../../logic/actions/restaurants';

import * as consts from '../../assets/constants/temp';

const restaurants = consts.restaurants

function HomeScreen({ selectRestaurant, navigation }) {
	// useEffect(startFetchingTweetsHome,[]);
	const [ show, setShow ] = useState(false);
	const [ visible, setVisible ] = useState(false);
	const [ partySize, setPartySize ] = useState(2);
	const [ date, setDate] = useState('');
	const [ time, setTime ] = useState('');
	const [ restaurantName, setRestaurantName ] = useState('');

	const showModal = () => setShow(true);
	const hideModal = () => setShow(false);

	const showSnackbar = () => setVisible(true);
	const hideSnackbar = () => setVisible(false);

	return (
		<Provider>
			<ScrollView style={styles.container}>
				{
					restaurants.map(
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
									<Button onPress = { showModal }>
										Reserva Rápida
									</Button>
								</Card.Actions>
							</Card>
						)
					)
				}
			</ScrollView>

			<Modal visible = { show } onDismiss = { hideModal } style = { styles.modalWrapper }>
				<Title>Nueva Reservación</Title>	

				<Divider
					style = { { 
						marginTop: 5,
						backgroundColor: '#00ACEE'
					} }
				/>

				<View style = { { 
					flexDirection: 'column'
				} }>
					<TextInput 
						label = 'Cantidad de Personas'
						value = { partySize }
						onChangeText = { e => setPartySize(e) }
						style = { {
							margin: 20,
						} }
					/>
				</View>

				<View
					style = { {
						flexDirection: 'row'
					} }
				>
					<DateTimePicker 
						value = { new Date() } 
						mode = 'date'
						is24Hour = { true }
						display = 'default'
						onChange = { (event, selectedDate) => console.log(selectedDate) }
						style = { {
							width: '50%',
							margin: 20
						} }
					/>

					<DateTimePicker 
						value = { new Date() } 
						mode = 'time'
						is24Hour = { true }
						display = 'default'
						onChange = { (event, selectedDate) => setTime(selectedDate) }
						style = { {
							width: '50%',
							margin: 20
						} }
					/>
				</View>

				<Button
					mode = 'contained'
					onPress = { () => {
						hideModal();
						showSnackbar();
					} }
					style = { {
						margin: 20,
						backgroundColor: '#00ACEE'
					} }
				>
					Hacer Reserva
				</Button>
			</Modal>

			<Snackbar
				visible = { visible }
				onDismiss = { hideSnackbar }

				>
				¡Su reserva se ha realizado con éxito!
			</Snackbar>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		height: hp('100%'),
		alignContent: 'center',
	},
	modalWrapper: {
		backgroundColor: 'white',
		padding: 20,
		height: 300,
		alignContent: 'center',
		justifyContent: 'center'
	}
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
