import { StyleSheet } from 'react-native';

// Estilos para el elemento de autor
const styles = StyleSheet.create({
    authorContainer: {
        height: 200,
        width: 150,
        flex: 1,
        marginRight: 16,
        maxWidth: 150,
        alignItems: 'center',
    },
    authorPic: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
        borderRadius: 75,
    },
    auhtorInfo: {
        color: 'black',
        height: '100%',
        marginTop: 16
    },
    name: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        paddingTop: 8
    },
});

export default styles;