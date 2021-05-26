/* -------------------------------------------------------------------------- */
/*                               Componente Home                              */
/* -------------------------------------------------------------------------- */
// Este componente contiene la lista de restaurantes inicial

import React from 'react';

import { Card, Button, Badge } from 'react-native-paper';


const RestaurantCard = ({ restaurant, selectRestaurant, navigation, func }) => {

	const showModal = () => {
		func(true)
	}

	return (
		<Card style={{ borderRadius: 0, marginBottom: 8, height: 256 }}>
					
			<Card.Title 
				title={restaurant.name} 
				subtitle={`${restaurant.time - 5}-${restaurant.time + 5} min`} 
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
					onPress={() => selectRestaurant(navigation, restaurant.id)}
				>
					Ver
				</Button>
				<Button
					onPress={() => {showModal(); selectRestaurant("NO", restaurant.id)}}
				>Reserva Rápida</Button>
			</Card.Actions>

		</Card>
	)
}

export default RestaurantCard;
