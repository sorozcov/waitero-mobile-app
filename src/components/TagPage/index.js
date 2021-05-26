import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, RefreshControl, Image, Button } from 'react-native';

import { Modal, Portal } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import RestaurantCard from '../RestaurantCard';
import * as CustomButton from '../../components/Button';

import styles from './styles';
import * as selectors from '../../logic/reducers';
import * as resActions from '../../logic/actions/restaurants';

import { restaurants, months } from '../../assets/constants/temp';

const allRestaurants = restaurants;
const allMonths = months;
// página de un tag
// se muestra el nombre del tag y los restaurantes bajo ese tag
const TagPage = ({ selectedTag, isFetching, onLoad, navigation, selectRestaurant }) => {
    const [showModal, setShowModal] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showTimePicker, setShowTimePicker] = useState(false);
	const [people, setPeople] = useState(1);
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(new Date());

	const clearValues = () => {
    	setDate(new Date());
    	setTime(new Date());
    	setPeople(1);
	}
    
    return(
        <View style={styles.container}>
            <ScrollView 
                    style={styles.middleContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={isFetching}
                            onRefresh={() => onLoad()}
                            tintColor='#3498DB'
                        />
                    }
            >
                <View style={styles.innerContainer}>
                    <Image source={{uri: selectedTag.uri}} style={styles.authorPic}/>
                    <Text style={styles.header}>{selectedTag.title}</Text>
                    {
                            allRestaurants.filter( restaurant => restaurant.tags.includes(selectedTag.id)).length === 0 
                            ?
                                <Text style={styles.infoMessage}>No hay restaurantes para esta categoría</Text>
                            :
                            allRestaurants.filter( restaurant => restaurant.tags.includes(selectedTag.id)).map(
                                restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant} navigation={navigation} selectRestaurant={selectRestaurant} func={setShowModal}/>
                            )
                    }
                </View>
            </ScrollView>
            <Portal>
                <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.containerStyle}>
                    <Text style={styles.hheader}>Haz tu reservación</Text>
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
                        <Button title={`${date.getDate()} de ${allMonths[date.getMonth()].name} de ${date.getFullYear()}`} onPress={() => setShowDatePicker(true)} />
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
                            onPress={() => {console.log(people, time, date); setShowModal(false); clearValues()}}
                        />
                    </View>
                </Modal>
                </Portal>
        </View>
    )
};


export default connect(
    state => ({
        selectedTag: selectors.selectedTag(state),
        isFetching: false,
    }),
    dispatch => ({
        onLoad(){
            //dispatch(bookActions.startFetchingBook())
        },
        selectRestaurant(navigation, id){
            dispatch(resActions.selectRestaurant(id))
            navigation.navigate("RestaurantPage")
        }
    })
)(TagPage);

//{`${allRestaurants.filter( restaurant => restaurant.tags.includes(selectedTag.id)).length} resultados para "${selectedTag.title}"`}