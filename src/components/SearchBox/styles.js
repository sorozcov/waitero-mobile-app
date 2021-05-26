import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	input: {
		flex: 1,
		height: 40,
		marginBottom: 16,
		paddingLeft: 0,
    	paddingRight: 10,
    	paddingTop: 16,
	},
	inputContainer: {
		width: '90%',
		borderRadius: 8,
		borderWidth: 2,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#00171F',
		marginBottom: 10
	},
	searchIcon: {
		paddingHorizontal: 10,
	},
	clearIcon: {
		paddingHorizontal: 10,
	},
});

export default styles;