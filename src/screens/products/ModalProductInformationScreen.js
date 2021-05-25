
import 'firebase/firestore';
import { Field, reduxForm, submit ,formValueSelector } from 'redux-form';

import { Button, withTheme,IconButton } from 'react-native-paper';
import Modal from 'react-native-modal';
import { Text } from 'native-base';
import React,{useState,useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, View ,FlatList, Dimensions, Platform} from 'react-native';
import { Card, Divider, } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import omit from 'lodash/omit';

import ImagePicker from '../../components/general/ImagePickerProduct';
import * as actionsProducts from '../../logic/actions/products';
import * as actionsOrders from '../../logic/actions/orders';
import * as selectors from '../../logic/reducers';
import MyCheckbox from '../../components/general/checkbox';
import MyTextInput from '../../components/general/textInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function ProductInformationScreen({ theme, dirty, valid, handleSubmit, closeModal, modal, valuesIngredients,submitFunction,initialValues, initialImage, route, ingredients, additionals,isAdding,isAdmin=false, addProductToOrder, editProductToOrder, additionalsPrice,onlyDetail=false,backButton=false, newOrder }) {
	const { colors, roundness } = theme;
	const isNew = initialValues.price!=null;
	const [quantity, setQuantity] = useState(1);
	
	useEffect(() => {
		initialValues.quantity=initialValues.quantity==undefined || initialValues.quantity==null || initialValues.quantity==0 ? 1:initialValues.quantity
		setQuantity(initialValues.quantity)
	},[ modal ]);


	
	
	
	const addProduct = values => {
		values={...initialValues,...values}
		var valuesToDelete = [];
		var additinalCost = 0;

		values.ingredients = values.ingredients.map((ingredient,i)=>{
			valuesToDelete.push('ingredients'+i);
			return {
			...ingredient,
			selected:values['ingredients'+i]
			}
		});
		
		values.additionals = values.additionals.map((additional,i)=>{
			valuesToDelete.push('additionals'+i);
			const cost = values['additionals'+i] === true ? parseFloat(additional.cost) : 0; 
			additinalCost = cost + additinalCost; 
			return {
			...additional,
			selected:values['additionals'+i]
			}
		});

		values.image = initialImage;
		values.additinalCost = parseFloat(additinalCost).toFixed(2);
		values.quantity = quantity;

		if(isNew) {
			values.totalPrice = parseFloat(values.quantity*(parseFloat(values.price) + additinalCost)).toFixed(2);
			values.unitPrice = values.price;
			const product = omit(values, [...valuesToDelete, 'dateModified', 'price']);
			addProductToOrder(product);
		}else{
			values.totalPrice = parseFloat(values.quantity*(parseFloat(values.unitPrice) + additinalCost)).toFixed(2);
			const product = omit(values, [...valuesToDelete]);
			editProductToOrder(product);
		}

		closeModal();
	}
	return (
		<Modal
			transparent={true}
			animationType={'none'}
			isVisible={modal}
			avoidKeyboard={true}
			animationIn={"fadeInUp"}
			animationOut={"zoomOutUp"}
			coverScreen={true}
			onBackButtonPress={()=>closeModal()}
			style={styles.modalB}
			animationInTiming={0}
			deviceWidth={Dimensions.get("window").width}
			deviceHeight={Dimensions.get("window").height}
			// onSwipeComplete={()=>closeModal()}
        	// swipeDirection={['right']}
		>	
			
			<ScrollView style={{ flex: 1,backgroundColor:'white',flexDirection:'column',marginBottom:!onlyDetail?'18%':'10%'}}>
				<Card
				title={initialValues.productName}
				
				titleStyle={{fontFamily:'dosis-bold',fontSize:22}}
				containerStyle={{marginTop:50}}>
				<Field name={'image'} component={ImagePicker} image={initialValues.image} showImageOnly={true}/>
				<Text style={{paddingTop: 10,textAlign:'center',fontFamily:'dosis-light',fontSize:19}}>
					{initialValues.description}
				</Text>
				<Text style={{paddingTop: 10,textAlign:'center',fontFamily:'dosis-semi-bold',fontSize:24}}>
					{`Q${parseFloat(!isNew ? initialValues.unitPrice : initialValues.price).toFixed(2)}`}
				</Text>
				{isAdmin?<Field name={'status'} disabled={isAdmin} component={MyCheckbox} label='ACTIVO' containerStyle={{backgroundColor:null,width:'50%',alignSelf:'center'}} center={true} checked={initialValues.status}/>:null}

				<Divider style={{ backgroundColor: 'red',marginTop:10,marginBottom:10 }} />
				<Text style={{paddingLeft: 10,fontFamily:'dosis-light',fontSize:19}}>
					{'Ingredientes'}  
				</Text>
				{ingredients.map((item, i)=>
					<Field key={i} name={'ingredients'+ i} disabled={isAdmin || onlyDetail} component={MyCheckbox} label={item.name}  containerStyle={{backgroundColor: null, width: '80%', alignSelf: 'center'}} center={true} checked={isNew ? item.default : item.selected}/>
				)}
				<Divider style={{ backgroundColor: 'red', marginTop: 20, marginBottom: 20 }} />
				<Text style={{ paddingLeft: 10, fontFamily: 'dosis-light', fontSize: 18, marginBottom: 20}}>
					{'Adicionales'}  
				</Text>
				{additionals.map((item, i)=>
					<Field key={i} name={'additionals'+ i} disabled={isAdmin || onlyDetail} component={MyCheckbox} label={`${item.name} (Q${item.cost})`}  containerStyle={{backgroundColor: null, width: '80%', alignSelf: 'center'}} center={true} checked={isNew ? item.default : item.selected}/>
				)}
				<Divider style={{ backgroundColor: 'red', marginTop: 20, marginBottom: 20 }} />
				{!isAdmin && <Text style={{ paddingLeft: 10, fontFamily: 'dosis-light', fontSize: 18, marginBottom: 20}}>
					{'Instrucciones Adicionales'}  
				</Text>}
				{!isAdmin && <Field name={'additionalInstructions'} disabledInput={isAdmin || onlyDetail} component={MyTextInput} label='Instrucciones Adicionales' placeholder='Ingresa instrucciones adicionales para el chef'  multiline={true}/>}
				</Card>
				<View style={{flexDirection:'row',alignItems:'center',flex:1,justifyContent:'center',marginTop:15}}>
												
						{(isAdmin !== true) &&    
						<>            
							{!onlyDetail && <Button
								style={[styles.btn, styles.btnLeft]}
								onPress={() => {quantity>1?setQuantity(quantity-1):setQuantity(1)}}
							>
								<MaterialCommunityIcons
								name="minus"
								color={'black'}
								size={22}
								/>
								
							</Button>}
							{onlyDetail && 
							<Text  style={{fontFamily:'dosis-light',fontSize:20,paddingRight:10}}>Cantidad</Text>
							}	
							<View style={styles.infoTxt} >
							
							<Text  style={{fontFamily:'dosis-light',fontSize:20}}>{quantity}</Text>
						</View> 
							{!onlyDetail &&<Button
								style={[styles.btn, styles.btnRight]}
								onPress={() => {setQuantity(quantity+1)}}
							>
								<MaterialCommunityIcons
								name="plus"
								color={'black'}
								size={22}
								/>
								
							</Button>
							}
						</>
						}		
				</View> 
				
				<View style={{marginTop:'4%',marginBottom:'10%'}}>
					{backButton && <Button
					//   disabled={!isAdmin && (quantity==0 || quantity==undefined)}
					theme={roundness}
					color={colors.accent}
					icon={"backburger"}
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
						justifyContent: 'center',
					}}
					
					onPress={()=>closeModal()}>
					REGRESAR
					</Button>}
					
					
				</View>
				
      		</ScrollView>
			  <IconButton testID={'close-button'}  icon="close"  size={30} style={{top:Platform.OS=='ios' ? 20 : 0,right:3,position:'absolute',backgroundColor:'#D8D8D8'}} mode="contained" onPress={()=>closeModal()}  />
			  {!isAdmin && !onlyDetail && 
					<Button
					disabled={!isAdmin && (quantity==0 || quantity==undefined)}
					theme={{roundness:0}}
					color={'#000000'}
					icon={isNew ? "plus" : "pencil"}
					height={Platform.OS=='ios' ? 80 : 65}
					mode="contained"
					labelStyle={{
						fontFamily: "dosis-bold",
						fontSize: 15,
					}}
					style={{
						fontFamily: 'dosis',
						bottom:'0%',
						width:'100%',
						justifyContent: 'center',
						
						position:'absolute',
					}}
					
					onPress={handleSubmit(addProduct)}>
					{((!isNew ? 'EDITAR':'AGREGAR') + ` ${quantity} POR Q${parseFloat(quantity*(parseFloat(!isNew ? initialValues.unitPrice : initialValues.price)+parseFloat(additionalsPrice))).toFixed(2)}`)}
					</Button>
				
				}
		
		</Modal>
	);
}
	
const styles = StyleSheet.create({
	modalB:{
		flex:1,
		flexDirection: 'row',
		paddingTop: Platform.OS === 'ios'  ? 20 : 0,
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
	  container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#fff',
		fontFamily: 'dosis-regular',
	  },
	  row: {
		alignItems: 'center',
		flex: 1, 
		
	  },
	  contentContainer: {
		paddingTop: 30,
	  },
	  inputContainerStyle: {
		margin: 8,
	  },
	  inputContainerStyle: {
		paddingLeft: 20,
		paddingBottom: 10,
		paddingRight: 20,
	  },
	  titleStyle: {
		textAlign: 'center',
		fontFamily: 'dosis-extra-bold',
		fontSize: 30,
		paddingBottom: '6%',
		paddingTop: '8%',
	  },
	  textStyle:{
		textAlign: 'center', 
		fontFamily: 'dosis-semi-bold',
		fontSize: 16,
		paddingTop: 20,
		paddingBottom: 20,
	  },
	  btnLeft: {
		backgroundColor: '#B2FFFF',
		justifyContent:'center',
		alignItems:'center',
		height:40,
		marginRight:10
	  },
	  btnRight: {
		  backgroundColor: '#00AAE4',
		  justifyContent:'center',
		  alignItems:'center',
		  height:40,
		  marginLeft:10
	  },
	  infoTxt: {
		alignItems: 'center',
		justifyContent:'center',
		borderWidth: 2,
		borderColor: '#00AAE4',
		width: 40,
		
		height:40,
	  },
	  infoTxtView: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		borderWidth: 1,
		borderColor: '#00AAE4',
		width: 30,
		height:30,
		right: 10,
	  },
});

export default connect(
	state => {
		const selector = formValueSelector('editProductOrderForm') // <-- same as form name
		const initialValues = selectors.getSelectedProduct(state)!=null? selectors.getSelectedProduct(state):{};
		let additionalsPrice=0;
		if(initialValues.additionals!=undefined){
			initialValues.additionals.forEach((additional,index)=>{
				if(selector(state,`additionals${index}`)){
					additionalsPrice=additionalsPrice+parseFloat(additional.cost)
				} 
			})
		}
		return {
		initialValues:initialValues,
		initialImage: selectors.getSelectedProduct(state)!=null && selectors.getSelectedProduct(state)!={} && selectors.getSelectedProduct(state).productId!=undefined ? selectors.getProduct(state,selectors.getSelectedProduct(state).productId).image:null,
		ingredients: selectors.getSelectedProduct(state)!=null && selectors.getSelectedProduct(state)!={} && selectors.getSelectedProduct(state).productId!=undefined ? selectors.getSelectedProductIngredients(state):[],
		additionals: selectors.getSelectedProduct(state)!=null && selectors.getSelectedProduct(state)!={} && selectors.getSelectedProduct(state).productId!=undefined ? selectors.getSelectedProductAdditionals(state):[],
		categories: selectors.getCategories(state),
		additionalsPrice: additionalsPrice
		// valuesIngredients:  selector(state,'additionals0')
	}},
	(dispatch, { newOrder }) => ({
		addProductToOrder(product) {
			newOrder ? dispatch(actionsOrders.addProductToNewOrder(product)) : dispatch(actionsOrders.addProductToOrder(product));
		},
		editProductToOrder(product) {
			newOrder ? dispatch(actionsOrders.editProductOfNewOrder(product)) : dispatch(actionsOrders.editProductOfOrder(product));
		},
	}),
  )(reduxForm({
	form: 'editProductOrderForm',
	enableReinitialize : true,
	validate: (values) => {
	  const errors = {};
	  errors.productName = !values.productName ? 'Este campo es obligatorio' : undefined;
	  errors.description = !values.description ? 'Este campo es obligatorio' : undefined;
	  errors.category = values.category && values.category.length === 0 ? 'Este campo es obligatorio' : undefined;
	  errors.price = !values.price ? 'Este campo es obligatorio' : isNaN(parseFloat(values.price)) ? 'Ingresa un número correcto' : undefined;
	  return errors;
	}
  })(withTheme(ProductInformationScreen)));