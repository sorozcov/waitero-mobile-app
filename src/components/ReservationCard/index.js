/* -------------------------------------------------------------------------- */
/*                               Componente Home                              */
/* -------------------------------------------------------------------------- */
// Este componente contiene la lista de restaurantes inicial

import React from 'react';

import { Card, Button, Badge } from 'react-native-paper';


const ReservationCard = ({ reservation, selectReservation, navigation }) => {

	return (
		<Card style={{ borderRadius: 0, marginBottom: 8, height: 256 }}>
					
			<Card.Title 
				title={reservation.name} 
				subtitle={`${reservation.time - 5}-${reservation.time + 5} min`} 
				right={
					() => <Badge size={24} style={{ marginRight: 12}}>{restaurant.score}</Badge>
				}
			/>

			<Card.Cover 
				style={{ marginHorizontal: '3%', height: '50%' }} 
				source={{ uri: restaurant.uri }} 
			/>

			<Card.Actions>
				<Button 
					onPress={() => selectReservation(navigation, reservation.id)}
				>
					Ver
				</Button>
				<Button
					onPress={() => showModal()}
				>Reserva Rápida</Button>
			</Card.Actions>

		</Card>
	)
}

export default ReservationCard;
