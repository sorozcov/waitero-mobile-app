import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, ScrollView, View, Text } from 'react-native';

import { Card, Button, Badge, Title, Paragraph, Divider, Modal, Snackbar, TextInput, Provider, Subheading, Caption } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as selectors from '../../logic/reducers';

import * as cnsts from '../../assets/constants/temp';

const restaurants = cnsts.restaurants;

function ProductCard(props) {
    const { plato, order } = props
    const [ qty, setQty ] = useState(0);

    return(
        <View
            style = { {
                flexDirection: 'column'
            } }
        >
            <View
                style = { {
                    margin: 12,
                    flexDirection: 'row',
                    // backgroundColor: 'white',
                    padding: 4
                } }
            >
                <View
                    style = { {
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        width: '72%'
                    } }
                >
                    <Subheading
                        style = { { 
                            fontSize: 18,
                            fontWeight: 'bold'
                        } }
                    >
                        { plato.name }
                    </Subheading>

                    <Caption>
                        { plato.description }
                    </Caption>

                    <Subheading>
                        { plato.price }
                    </Subheading>
                </View>

                <Image 
                    source = { { uri: plato.uri} }
                    style = {{
                        height: 100,
                        width: 100
                    }}
                />
            </View>
            
            <View
                style = { {
                    margin: 12,
                    flexDirection: 'row',
                    // backgroundColor: 'white',
                    padding: 4,
                    alignItems: 'center',
                    justifyContent: 'center'
                } }
            >
                <Button
                    style = { {
                        fontWeight: 'bold',
                        margin: 4
                    } }
                    onPress = { () => setQty(qty === 0 ? 0 : qty - 1) }
                >
                    - 
                </Button>
                
                <Caption>{ qty }</Caption>
                
                <Button
                    style = { {
                        fontWeight: 'bold',
                        margin: 4
                    } }
                    onPress = { () => setQty(qty + 1) }
                >
                    +
                </Button>

                <Button
                    style = { {
                        marginHorizontal: 12
                    } }
                    onPress = { () => {
                        var i;
                        for (i = 0; i < order.length; i++) {
                            if (order[i].name === plato.name) {
                                order[i].qty += plato.qty
                                return order;
                            }
                        }

                        order.push({...plato, qty: qty});
                        return order;
                    }}
                >
                    Añadir a la orden
                </Button>
            </View>
        </View>
    )
}

export default ProductCard