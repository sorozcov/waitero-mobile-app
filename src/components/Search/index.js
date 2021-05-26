import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import { Field, reduxForm, formValueSelector, clearFields } from 'redux-form';

import drop from 'lodash/drop';
import shuffle from 'lodash/shuffle';
import dropRight from 'lodash/dropRight';

import Tag from '../Tag';
import SearchBox from '../SearchBox';
import RestaurantList from '../RestaurantList';

import styles from './styles';
import * as selectors from '../../logic/reducers';

import * as cnsts from '../../assets/constants/temp';

const allRestaurants = cnsts.restaurants;
const allTags = cnsts.tags;

// compoonente de búsqueda
// muestra los resultados de libros, autores y editoriales
const Search = ({ navigation, filter, handlePress, isFetching, onLoad, selectRestaurant }) => {
    useEffect(onLoad, [])

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Búsqueda</Text>
            <Field
                name={'search'}
                component={SearchBox}
                placeholder={'Search restaurants'}
                returnKeyType='done'
                autoCapitalize='words'
                handlePress={handlePress}
            />
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
                {
                    filter === undefined ? 
                        <View style={styles.innerContainer}>
                            <Text style={styles.headerTwo}>Categorías recomendadas</Text>
                            <View style={styles.tagsContainer}>
                                {
                                    dropRight(allTags, allTags.length - 4).map(genre => 
                                        <Tag key={genre.id} info={genre} vertical={true} navigation={navigation}></Tag>
                                    )
                                }
                            </View>
                            <Text style={styles.headerTwo}>Más categorías</Text>
                            <View style={styles.tagsContainer}>
                                {
                                    shuffle(drop(allTags, 4)).map(genre => 
                                        <Tag key={genre.id} info={genre} vertical={true} navigation={navigation}></Tag>
                                    )
                                }
                            </View>
                        </View> 
                        : 
                        <View style={styles.innerContainer}>
                            <Text style={styles.headerTwo}>Restaurantes</Text>
                            <RestaurantList restaurants={allRestaurants} filter={filter} navigation={navigation}/>
                        </View>
                }
            </ScrollView>
        </View>
    );
};


const selector = formValueSelector('search');

export default reduxForm({
    form: 'search',
})
(connect(
    state => ({
        filter: selector(state, 'search'),
        isFetching: selectors.isFetchingRestaurants(state),
    }),
    dispatch => ({
        handlePress(){
            dispatch(clearFields('search', true, false, ['search']))
        },
        onLoad(){
        },
    }),
)(Search))