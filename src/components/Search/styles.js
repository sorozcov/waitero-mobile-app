import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {    
        flex: 1, 
        paddingTop: 64,
        justifyContent: 'flex-start', 
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    header: {
        alignSelf: 'flex-start',
        paddingLeft: 20,
        color: '#000000',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
        textAlign: 'center',
    },
    headerTwo: {
        alignSelf: 'flex-start',
        color: '#000000',
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 12,
        textAlign: 'center',
    },
    middleContainer: {
        flex: 3,
        paddingTop: 16,
        width: '90%',
        marginBottom: 16,
    },
    innerContainer: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    tagsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    booksContainer: {
        paddingLeft: 16,
        flex: 1,
        flexWrap: 'wrap',
        width: '100%'
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