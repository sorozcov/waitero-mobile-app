import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    middleContainer: {
        flex: 1,
        width: '100%',
        marginBottom: 16,
    },
    innerContainer: {
        width: '100%',
        height: '100%',
    },
    header: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: '600',
        padding: 12,
        position: 'absolute',
        zIndex: 1,
        marginTop: "45%",
    },
    booksContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    infoMessage: {
        alignSelf: 'center',
        color: '#00171F',
        fontSize: 24,
        marginTop: 16,
        textAlign: 'center',
    },
    authorPic: {
        height: 250,
        width: "100%",
        resizeMode: 'cover',
        borderRadius: 4,
        opacity: 0.80,
        backgroundColor: '#00171F',
        marginBottom: 8
    },
	hheader: {
        color: '#00171F',
        fontSize: 24,
        fontWeight: '600',
        padding: 8,
		textAlign: 'left'
    },
	subheader: {
        color: '#00171F',
        fontSize: 16,
        fontWeight: '400',
        padding: 8,
		textAlign: 'left'
    },
	containerStyle: {
		backgroundColor: 'white',
		padding: 20,
		height: "60%",
		width: "90%",
		alignSelf: 'center',
		textAlign: 'center',
		textAlignVertical: 'top',
	}
});

export default styles;