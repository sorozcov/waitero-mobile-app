import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import Tag from '../Tag';

import styles from './styles';

// lista que mapea y renderiza cada tag en el estado
const TagList = ({ allTags, navigation }) => (
    <ScrollView horizontal={true} style={styles.horizontalScroll}>
        {allTags.map(tag => <Tag key={tag.id} info={tag} navigation={navigation}/>)}
    </ScrollView>
);


export default TagList;