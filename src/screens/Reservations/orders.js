import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView , View, TextInputBase} from 'react-native';

import { Card, Button, Badge, Modal, Title, Divider, TextInput, Subheading, Provider, Avatar } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as selectors from '../../logic/reducers';
import * as resActions from '../../logic/actions/restaurants';

import * as consts from '../../assets/constants/temp';

function OrdersPag({ user, navigation }) {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ firstName, setFirstName ] = useState(user.first_name);
    const [ lastName, setLastName ] = useState(user.last_name);
    const [ username, setUserName ] = useState(user.username);
    const [ phone, setPhone ] = useState(user.phoneNumber);
    const [ email, setEmail ] = useState(user.email);

    return (
        <ScrollView style = {{ backgroundColor: '#FFFFFF'}}>
            <View
                style = { {
                    height: 350,
                    backgroundColor: '#cf313a',
                    // justifyContent: 'center',
                    alignItems: 'center'
                } }
            >
                <Avatar.Text 
                    size = { 128 } 
                    label = { user.first_name.charAt(0) + user.last_name.charAt(0) } 
                    style = { {
                        backgroundColor: '#00ACEE',
                        marginTop: 100
                    } }
                    color = '#FFFFFF'
                />

                <Title
                    style = { {
                        marginTop: 20,
                        color: '#FFFFFF'
                    } }
                >
                    { user.first_name + " " + user.last_name }
                </Title>

                <Subheading
                    style = { {
                        color: '#FFFFFF'
                    } }
                >
                    { user.username }
                </Subheading>
            </View>

            <Title
                style = { {
                    margin: 10,
                    // fontWeight: 0.62   
                } }
            >
                Datos de la cuenta:
            </Title>

            <View
                style = { {
                    alignItems: 'center'
                } }
            >
                <TextInput
                    label = 'Nombres'
                    mode = 'outlined'
                    value = { firstName }
                    onChangeText = { e => setFirstName(e) }
                    style = { {
                        margin: 15,
                        width: '90%'
                    } }
                />

                <TextInput
                    label = 'Apellidos'
                    mode = 'outlined'
                    value = { lastName }
                    onChangeText = { e => setLastName(e) }
                    style = { {
                        margin: 15,
                        width: '90%'
                    } }
                />

                <TextInput
                    label = 'Usuario'
                    mode = 'outlined'
                    value = { username }
                    onChangeText = { e => setUserName(e) }
                    style = { {
                        margin: 15,
                        width: '90%'
                    } }
                />

                <TextInput
                    label = 'Teléfono'
                    mode = 'outlined'
                    value = { phone }
                    onChangeText = { e => setPhone(e) }
                    style = { {
                        margin: 15,
                        width: '90%'
                    } }
                />

                <TextInput
                    label = 'Correo'
                    mode = 'outlined'
                    value = { email }
                    onChangeText = { e => setEmail(e) }
                    style = { {
                        margin: 15,
                        width: '90%'
                    } }
                />
            </View>
        </ScrollView>
    );
};

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
		// selectRestaurant(navigation, id){
		// 	dispatch(resActions.selectRestaurant(id))
		// 	navigation.navigate("RestaurantPage")
		// }
	}),
)(OrdersPage);