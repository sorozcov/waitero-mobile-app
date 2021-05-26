import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './styles';
import * as tagActions from '../../logic/actions/tags';

// componente para un tag individual
// se renderiza con un color aleatorio y el nombre
const Tag = ({ vertical = false, info, handleOnPress }) => (
    <TouchableOpacity onPress={() => handleOnPress()}>
        <View style={[styles.tagcontainer, vertical ? styles.verticalTag : null]} >
            <Text style={styles.tagTitle}>{info.title}</Text>
            <Image source={{uri: info.uri}} style={styles.authorPic}/>
        </View>
    </TouchableOpacity>
    
)


export default connect(
    undefined,
    (dispatch, { navigation, info }) => ({
        handleOnPress(){
            dispatch(tagActions.selectTag(info))
            navigation.navigate('TagPage')
        }
    })
)(Tag);