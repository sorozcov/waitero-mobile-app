import React from 'react';
import 'firebase/firestore';
import { Field, reduxForm, submit } from 'redux-form';
import { Button, withTheme } from 'react-native-paper';
import { StyleSheet, View, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import MyTextInput from '../../components/general/textInput';


function ModalIngredients({
	theme,
	dirty,
	valid,
	handleSubmit,
	closeModal,
	modal,
	submitFunction
}) {
    const { colors, roundness } = theme;
    const addIngredient = values => {
        closeModal();
        submitFunction(values);
        values.additional = '';
    }
	return (
		<Modal
			transparent={true}
			animationType={'none'}
			isVisible={modal}
			avoidKeyboard={true}
			coverScreen={true}
			onBackButtonPress={()=>closeModal()}
			style={styles.modalB}
			deviceWidth={Dimensions.get("window").width}
			deviceHeight={Dimensions.get("window").height}
			// onSwipeComplete={()=>closeModal()}
        	// swipeDirection={['down']}
		>
			<View style={styles.modalBackground} >
				<View style={styles.modal}>
					<View style={{justifyContent: 'center'}}>
						<Field
							name={'additional'}
							component={MyTextInput}
							label='Ingrediente'
							placeholder='Ingrediente'
							keyboardType='text'
						/>
					</View>

					<Button
						disabled={!(dirty && valid)}
						theme={roundness}
						color={'#023E8D'}
						icon={"plus"}
						height={50}
						mode="contained"
						labelStyle={{
							fontFamily: "dosis-bold",
							fontSize: 15,
						}}
						style={{
							fontFamily: 'dosis',
							marginLeft: '5%',
							marginRight: '5%',
							justifyContent: 'center'
						}}
						onPress={handleSubmit(addIngredient)}
					>
					{'Agregar'}
					</Button>
					
					<Button
						theme={roundness}
						color={'red'}
						height={50}
						mode="contained"
						labelStyle={{
							fontFamily: "dosis-bold",
							fontSize: 15,
						}}
						style={{
							fontFamily: 'dosis',
							marginLeft: '5%',
							marginRight: '5%',
							marginTop: 1,
							justifyContent: 'center',
						}}
						onPress={()=>closeModal()}
					>
					{'Cancelar'}
					</Button>
				</View>
			</View>
		</Modal>
	);
}
	
const styles = StyleSheet.create({
	modalB:{
		flex:1,
		flexDirection: 'row',
		margin: 0
	},
	modalBackground: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'space-around',
	
	  },
	  modal: {
		backgroundColor: '#FFFFFF',
		height: 350,
		width: '80%',
		borderRadius: 10,
		justifyContent: 'space-around'
	  },
});

export default reduxForm({
	form: 'editIngredientsForm',
	enableReinitialize : true,
	validate: (values) => {
		const errors = {};
		errors.additional = !values.additional ? 'Ingrese el nombre del ingrediente' : undefined;
		return errors;
	}
})(withTheme(ModalIngredients));