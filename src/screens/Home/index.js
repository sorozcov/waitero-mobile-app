/* -------------------------------------------------------------------------- */
/*                               Componente Home                              */
/* -------------------------------------------------------------------------- */
// Este componente contiene la lista de restaurantes inicial

import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl, Text, View, Button } from 'react-native';

import { Modal, Portal } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import drop from 'lodash/drop';
import { uniqueId } from 'lodash';
import shuffle from 'lodash/shuffle';
import dropRight  from 'lodash/dropRight';

import * as CustomButton from '../../components/Button';
import RestaurantCard from '../../components/RestaurantCard/';

import * as selectors from '../../logic/reducers';
import * as resActions from '../../logic/actions/restaurants';
import * as reservActions from '../../logic/actions/reservations';

import * as consts from '../../assets/constants/temp';

const allRestaurants = consts.restaurants;
const months = consts.months;
let shuffled = false;
let restaurants;

function HomeScreen({ selectRestaurant, navigation, fetchRes, isFetching, addReservation, selectedRestaurant }) {
	useEffect(fetchRes, []);
	
	const [showModal, setShowModal] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [people, setPeople] = useState(1);
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(new Date());

	if(!shuffled){
		restaurants = shuffle(allRestaurants);
		shuffled = true;
	}

	const clearValues = () => {
    	setDate(new Date());
    	setTime(new Date());
    	setPeople(1);
	}

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
			{dropRight(restaurants, restaurants.length - 2).map(
				restaurant => (
					<RestaurantCard key={restaurant.id} restaurant={restaurant} selectRestaurant={selectRestaurant} navigation={navigation} func={setShowModal}/>
				)
			)}
				<Text style={styles.header}>Te puede interesar</Text>
				<ScrollView 
					horizontal={true}
					style={styles.suggestedContainer}
				>
					{
						drop(dropRight(restaurants, 3), 2).map(
							restaurant => (
								<RestaurantCard key={restaurant.id} restaurant={restaurant} selectRestaurant={selectRestaurant} navigation={navigation} func={setShowModal}/>
							)
						)
					}
				</ScrollView>
			{drop(restaurants, restaurants.length - 3).map(
				restaurant => (
					<RestaurantCard key={restaurant.id} restaurant={restaurant} selectRestaurant={selectRestaurant} navigation={navigation} func={setShowModal}/>
				)
			)}
			</ScrollView>
			<Portal>
				<Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.containerStyle}>
          			<Text style={styles.header}>Haz tu reservación</Text>
					<Text style={styles.subheader}>Número de personas</Text>
					<View style={{ alignSelf:'center', width: "100%", flex: 1, justifyContent: 'center', padding: "10%"}}>
						<Picker
							selectedValue={people}
							onValueChange={(itemValue, itemIndex) =>
								setPeople(itemValue)
							}
						>
							<Picker.Item label="1" value="1" />
							<Picker.Item label="2" value="2" />
							<Picker.Item label="3" value="3" />
							<Picker.Item label="4" value="4" />
							<Picker.Item label="5" value="5" />
							<Picker.Item label="6" value="6" />
							<Picker.Item label="7" value="7" />
							<Picker.Item label="8" value="8" />
							<Picker.Item label="9" value="9" />
						</Picker>
					</View>
					<Text style={styles.subheader}>Fecha y Hora</Text>
					<View style={{ flexDirection: 'column', alignSelf: 'center', paddingHorizontal: "10%", height: 100 }}>
						<Button title={`${date.getDate()} de ${months[date.getMonth()].name} de ${date.getFullYear()}`} onPress={() => setShowDatePicker(true)} />
						<Button title={`${time.getHours()}:${time.getMinutes() > 9 ? '' : '0'}${time.getMinutes()}`} onPress={() => setShowTimePicker(true)} />
						<DateTimePickerModal
							date={date}
							cancelTextIOS="Cancelar"
							confirmTextIOS="Confirmar"
							headerTextIOS="Escoja la fecha"
							isVisible={showDatePicker}
							mode="date"
							onConfirm={date => {setShowDatePicker(false); setDate(date)}}
							onCancel={() => setShowDatePicker(false)}
						/>
						<DateTimePickerModal
							date={time}
							cancelTextIOS="Cancelar"
							confirmTextIOS="Confirmar"
							headerTextIOS="Escoja la hora"
							isVisible={showTimePicker}
							mode="time"
							onConfirm={time => {setShowTimePicker(false); setTime(time)}}
							onCancel={() => setShowTimePicker(false)}
						/>
						<CustomButton.default 
							text={'CONFIRMAR'}
							onPress={() => {addReservation(date, time, people, selectedRestaurant); setShowModal(false); clearValues()}}
						/>
					</View>
        		</Modal>
			</Portal>
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
		isFetching: selectors.isFetchingRestaurants(state),
		selectedRestaurant: selectors.getRestaurantSelected(state),
	}),
	dispatch => ({
		selectRestaurant(navigation, id){
			dispatch(resActions.selectRestaurant(id))
			if(navigation !== "NO"){
				navigation.navigate("RestaurantPage")
			}
		},
		fetchRes(){
			dispatch(resActions.startFetchingRestaurants())
		},
		addReservation(date, time, people, restaurantId){
			let reservation = {
				date,
				time,
				people,
				restaurantId,
				id: uniqueId()
			}
			dispatch(reservActions.postReservation(reservation))
		}
	}),
)(HomeScreen);
