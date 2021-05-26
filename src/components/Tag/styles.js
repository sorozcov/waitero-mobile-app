import { StyleSheet } from 'react-native';

import * as utils from '../../assets/resources/utils';

const styles = StyleSheet.create({
    tagcontainer: {
        width: 160,
        height: 125,
        borderRadius: 16,
        backgroundColor: '#00171F',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
    },
    verticalTag: {
        marginBottom: 16
    },
    title: {
        fontSize: 18,
        color: '#FFFFFF'
    },
    tagTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: '#FFFFFF',
        position: 'absolute',
        zIndex: 1
    },
    authorPic: {
        height: "100%",
        width: "100%",
        resizeMode: 'cover',
        borderRadius: 16,
        opacity: 0.8,
    },
});

export default styles;