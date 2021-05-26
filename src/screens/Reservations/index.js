import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView , View, Image} from 'react-native';

import { Card, Button, Badge, Modal, Title, Divider, TextInput, Snackbar, Provider, Paragraph } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as selectors from '../../logic/reducers';
import * as resActions from '../../logic/actions/restaurants';

import * as consts from '../../assets/constants/temp';

const restaurants = consts.restaurants;

function ReservationsPage({ user, navigation }) {    
    const [ tab, setTab ] = useState(0);
    const [ show, setShow ] = useState(false);
    const [ reservations, setReservations ] = useState(1);

    const selectedTab = {
        width: '65%',
        height: 50,
        marginTop: 25,
        borderBottomColor: '#0087bb',
        borderBottomWidth: 2,
        borderRadius: 0,
        fontWeight: 'bold',
        color: '#0087bb'
    }; 

    const unselectedtab = {
        width: '65%',
        height: 50,
        marginTop: 25,
    };

    return (
        <ScrollView>
            <View
                style = { {
                    height: 100,
                    paddingVertical: 60,
                    paddingHorizontal: 50,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row'
                } }
            >
                <Button
                    style = { tab === 0 ? selectedTab : unselectedtab}
                    onPress = { () => setTab(0) }
                >
                    Reservaciones
                </Button>

                <Button
                    style = { tab === 1 ? selectedTab : unselectedtab}
                    onPress = { () => setTab(1) }

                >
                    Órdenes
                </Button>
            </View>

            {
                tab === 0 ? (
                    <View>
                        {
                            reservations === 1 ? (
                                <View>
                                    <View
                                        style = { {
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: 20,
                                            marginVertical: 20,
                                            marginHorizontal: 10,
                                            backgroundColor: 'white'
                                        } }
                                    >
                                        <Image
                                            source = { { uri: restaurants[1].uri} }
                                            style = {{
                                                height: 100,
                                                width: 100
                                            }}
                                        />

                                        <View
                                            style = { {
                                                flexDirection: 'column',
                                                alignItems: "flex-start",
                                                justifyContent: 'flex-start',
                                                marginHorizontal: 10
                                            } }
                                        >
                                            <Title>{restaurants[1].name}</Title>
                                            <Paragraph>{ "5 Personas" }</Paragraph>
                                            <Paragraph>{ "26/05/2021 5:30 PM" }</Paragraph>
                                        </View>

                                        <Button 
                                            color = 'red' 
                                            onPress = { () => setShow(true) }
                                            style = { {
                                                paddingHorizontal: 10
                                            } }    
                                        >
                                            X
                                        </Button>
                                    </View>
                                </View>
                            ) : (
                                <View
                                    style = { {
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: 300
                                    } }
                                >
                                    <Title>¡No tienes ninguna reservación!</Title>
                                </View>
                            )
                        }
                    </View>
                ) : (
                    <View
                        style = { {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 20,
                            marginVertical: 20,
                            marginHorizontal: 10,
                            backgroundColor: 'white'
                        } }
                    >
                        <Image
                            source = { { uri: restaurants[1].uri} }
                            style = {{
                                height: 100,
                                width: 100
                            }}
                        />

                        <View
                            style = { {
                                flexDirection: 'column',
                                alignItems: "flex-start",
                                justifyContent: 'flex-start',
                                marginHorizontal: 10
                            } }
                        >
                            <Title>{restaurants[1].name}</Title>
                            <Paragraph>{ "7 objetos - Q465.00" }</Paragraph>
                            <Paragraph>{ "26/05/2021 - Ordenado" }</Paragraph>
                        </View>

                        <Button>
                            Ver
                        </Button>
                    </View>
                )
            }

            <Modal      
                animationType="slide"
                visible={ show }
                onDismiss = { () => setShow(false) }
                style = { {
                    backgroundColor: 'white',
                    padding: 20,
                    height: 200,
                    alignContent: 'center',
                    justifyContent: 'center',
                    marginTop: 350,
                } }
            >
                <Title
                    style = { {
                        fontWeight: 'bold',
                        textAlign: 'center'
                    } }
                >
                    Cancelar Reservación
                </Title>
                <Divider 
                    style = { { 
						marginVertical: 10,
						backgroundColor: '#00ACEE'
					} }
                />
                <Paragraph
                    style = { {
                        textAlign: 'center'
                    } }
                >
                    ¿Está seguro que desea cancelar su reservación?
                </Paragraph>
                <Paragraph
                    style = { {
                        textAlign: 'center'
                    } }                    
                >
                    ¡Esta acción no podrá ser revertida!
                </Paragraph>

                <View
                    style = { {
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    } }
                >
                    <Button
                        onPress = { () => setShow(false) }
                    >
                        Regresar
                    </Button>
                    <Button
                        color = 'red'
                        onPress = { () => {
                            setReservations(0);
                            setShow(false);
                        } }
                    >Cancelar</Button>
                </View>
            </Modal>
        </ScrollView>
    );
};


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
)(ReservationsPage);