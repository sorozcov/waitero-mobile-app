/* -------------------------------------------------------------------------- */
/*                           Componente Restaurant                            */
/* -------------------------------------------------------------------------- */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, ScrollView, View, Text } from 'react-native';

import { Card, Button, Badge, Title, Paragraph, Divider, Modal, Snackbar, TextInput, Provider, Subheading, Caption } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as selectors from '../../logic/reducers';

import * as cnsts from '../../assets/constants/temp';
import ProductCard from './productCard';

const restaurants = cnsts.restaurants;

function RestaurantPage({ token, user, selectedRestaurant }) {
	const [ show, setShow ] = useState(false);
	const [ visible, setVisible ] = useState(false);
	const [ partySize, setPartySize ] = useState(2);
	const [ date, setDate] = useState(new Date());
	const [ time, setTime ] = useState(new Date());
	const [ confirmation, setConfirmation ] = useState(false);

	const showModal = () => setShow(true);
	const hideModal = () => setShow(false);

	const showSnackbar = () => setVisible(true);
	const hideSnackbar = () => setVisible(false);

	let order = [];

	const getTotal = () => {
		let total = 0.00
		order.map(item => {
			total += item.price * item.qty;
		});

		return total;
	}

	const index = selectedRestaurant - 1;

	return (
		<Provider>
			<ScrollView style={styles.container}>
				<Image source={{ uri: restaurants[index].uri }} style={{ width: 500, height: 200, borderRadius: 4 }}/>
				<View style={styles.container}>
					<Title style={{ padding: 8, fontSize: 32 }}>{restaurants[index].name}</Title>

					<Divider />
					
					<Paragraph
						style = { {
							padding: 12
						} }
					>
						{ 'Disponibilidad del Restaurante:  7 mesas disponibles' } 
					</Paragraph>

					<Button
						onPress = { showModal }
					>
						Hacer Reservación
					</Button>

					<Divider />

					{
						restaurants[index].menu.map( category => (
							<View>
								<Title
									style = { {
										padding: 12,
										fontSize: 24
									} }
								>
									{category.category}
								</Title>

								{
									category.items.map(plato => (
										<ProductCard plato = { plato } order = { order } />
									))
								}

								<Divider />
							</View>
						))
					}

					<Button
						style = { {
							margin: 12,
						} }

						onPress = { () => setConfirmation(true) }
					>
						{"Hacer pedido - Q465.00"}
					</Button>
				</View>
				
				<Modal 
					visible = { show } 
					onDismiss = { hideModal } 
					style = { {
						backgroundColor: 'white',
						padding: 20,
						marginHorizontal: "5%",
						marginTop: 100,
						height: 400,
						alignContent: 'center',
						justifyContent: 'center',
						alignSelf: 'center',
					} }
				>
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
							mode = 'outlined'
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
							value = {date} 
							mode = 'date'
							is24Hour = { true }
							display = 'default'
							onChange = { (event, selectedDate) => setDate(selectedDate) }
							style = { {
								width: '50%',
								margin: 20
							} }
						/>

						<DateTimePicker 
							value = {time} 
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
							// addReservation(date, time, partySize, selectedRestaurant);
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

				<Snackbar
					visible = { confirmation }
					onDismiss = { () => setConfirmation(false) }

				>
					¡Su orden se ha ingresado con éxito!
				</Snackbar>
			</ScrollView>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		// height: hp('100%'),
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
		// selectRestaurant(id){
		// 	dispatch(resActions.selectRestaurant(id))
		// }
	}),
)(RestaurantPage);
