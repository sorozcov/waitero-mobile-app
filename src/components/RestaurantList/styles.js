import { StyleSheet } from 'react-native';

// Estilos para la lista de autores
const styles = StyleSheet.create({
    authorsContainer: {
        paddingLeft: 16,
        flex: 1,
        flexWrap: 'wrap',
        width: '100%',
        flexDirection: 'row',
    },
    infoMessage: {
        alignSelf: 'flex-start',
        color: '#BEBEBE',
        fontSize: 14,
        marginBottom: 32,
        marginTop: 16,
        textAlign: 'center',
    }
});

export default styles;