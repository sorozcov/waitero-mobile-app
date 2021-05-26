import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import 'firebase/firestore';
import { Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
	Dimensions,
	Platform, StyleSheet,
	View,Image,
	TouchableOpacity
} from 'react-native';
import { Divider } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Button, IconButton, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
// import OptionPicker from '../../components/general/OptionPicker';
import * as actions from '../../logic/actions/orders';
import * as selectors from '../../logic/reducers';
import MyCheckbox from '../../components/general/checkboxNoReduxForm';
import { uriToBlob } from "../../components/general/ImagePickerUser";
import FinishOrder from './FinishOrder';
import { WebView } from 'react-native-webview';
import ModalOrderPrintScreen from "./ModalOrderPrintScreen";
import { Container, Header } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';


function OrderInformationScreen({ 
	theme,
	navigation,
	closeModal, 
	modal,
	finishOrderButton=true,
	sendOrder,
	orderProducts,
	activeOrder, 
	onlyDetail=false, 
	newOrder, 
	user,
	editOrderStatus,
	editOrderStatusCompleted,
	showPrintButton=true,
	}) {
	const { colors, roundness } = theme;
	const charge = activeOrder.status == 3; 
	const chargeView = activeOrder.status >=4; 


	
	return (
		<Modal
			transparent={true}
			animationType={'none'}
			isVisible={modal}
			avoidKeyboard={true}
			animationIn={"slideInUp"}
			animationOut={"slideOutDown"}
			coverScreen={true}
			
			onBackButtonPress={() => closeModal()}
			onBackdropPress={() => closeModal()}
			style={styles.modalB}
			animationInTiming={0}
			deviceWidth={Dimensions.get("window").width}
			deviceHeight={Dimensions.get("window").height}
		>	
		 <TouchableOpacity style={{flex:1}} onPress={()=>closeModal()}>
			<Container style={{}}>
				
				<Grid style={{ backgroundColor: 'white',}}>
					<Row style={{height:50}}><Col style={{height:40,display:'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'black',fontWeight:'bold',fontFamily:'dosis-bold',fontSize:20}}>Mapa del Restaurante</Text></Col></Row>
				<Row style={{height:80}}>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'green', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 1</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'green', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 2</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'green', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 3</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
				</Row>
				<Row style={{height:30}}></Row>
				<Row style={{height:80}}>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'red', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 4</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'red', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 5</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'green', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 6</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
				</Row>
				<Row style={{height:30}}></Row>
				<Row style={{height:80}}>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'red', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 7</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'green', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 8</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'red', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 9</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
				</Row>
				<Row style={{height:30}}></Row>
				<Row style={{height:80}}>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'green', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 10</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'green', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 11</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'green', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 12</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
				</Row>
				<Row style={{height:30}}></Row>
				<Row style={{height:80}}>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'red', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 13</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'red', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 14</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'red', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 15</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
				</Row>
				<Row style={{height:30}}></Row>
				<Row style={{height:80}}>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'red', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 16</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'red', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 17</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'red', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 18</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
				</Row>
				<Row style={{height:30}}></Row>
				<Row style={{height:80}}>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'green', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 19</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'green', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 20</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
					<Col style={{ backgroundColor: 'green', height: 80 ,display: 'flex',
					alignItems:'center',
					justifyContent:'center',}}><Text style={{color:'white',fontWeight:'bold'}}>Mesa 21</Text></Col>
					<Col style={{ backgroundColor: 'white',width:10}}></Col>
				</Row>
				<Row style={{height:30}}></Row>
				
				
				</Grid>
			</Container>
			</TouchableOpacity>
		</Modal>
	);
}
	
const styles = StyleSheet.create({
	modalB:{
		flex:1,
		flexDirection: 'row',
		paddingTop: Platform.OS === 'ios'  ? 30 : 0,
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
		paddingLeft: 30,
		paddingBottom: 10,
		paddingRight: 30,
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
		paddingTop: 30,
		paddingBottom: 30,
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
	totalContainer: {
        marginTop: 5,
        alignItems: 'center'
	},
});

export default connect(
	(state, { newOrder }) => ({
        orderProducts: newOrder ? selectors.getNewOrderProducts(state) : selectors.getSelectedOrderProducts(state),
        activeOrder: newOrder ? selectors.getNewOrder(state) : selectors.getSelectedOrder(state),
        isAdding: selectors.isAddingOrders(state),
		addingError: selectors.getOrdersError(state),
		user: selectors.getLoggedUser(state)
	}),
	(dispatch, { newOrder, navigation }) => ({
		sendOrder(activeOrder, total, user) {
			if(!newOrder){
				dispatch(actions.startEditingOrder({...activeOrder, total}));
				dispatch(actions.deactivateOrder());
				navigation.pop();
				navigation.navigate('OrdersList');
			} else {
				const branchId = user.restaurantId;
				const branchName = user.restaurantName;
				
				let newOrder  = activeOrder;
				
				newOrder = {
					...newOrder,
					['branch']: { 
						branchId,
						branchName,
					},
					['user']: user ,
				};
				
				dispatch(actions.startAddingOrder({...newOrder, total}));
				dispatch(actions.deactivateNewOrder());
				navigation.popToTop();
				navigation.navigate('Orders');
			}
		},
        editOrderStatus(order,invoiceInfo) {
			order.discount = invoiceInfo.discounts ? invoiceInfo.discount.title : false;
			order.tip = invoiceInfo.tips ? (invoiceInfo.tip.id/100)*order.total : 0;
			order.hasTip = invoiceInfo.tips
			order.tipType = invoiceInfo.tips ? invoiceInfo.tip : null
			order.status = invoiceInfo.invoice ? 5 : 4;
			// dispatch(actions.startEditingOrderStatus(order, invoiceInfo.invoice ? 5 : 4, null));
			dispatch(actions.startEditingOrderStatus(order, invoiceInfo.invoice ? 5 : 4, null));
		},
		editOrderStatusCompleted(order,invoiceInfo) {
			order.discount = invoiceInfo.discounts ? invoiceInfo.discount.id/100 : 0;
			order.tip = invoiceInfo.tips ? (invoiceInfo.tip.id/100)*order.total : 0;
			order.hasTip = invoiceInfo.tips
			order.tipType = invoiceInfo.tips ? invoiceInfo.tip : null
			order.status = 3;
			order.closeOrder = invoiceInfo.closeOrder
			// dispatch(actions.startEditingOrderStatus(order, invoiceInfo.invoice ? 5 : 4, null));
			dispatch(actions.startEditingOrderStatus(order, 3, null));
        },
	}),
  )(withTheme(OrderInformationScreen));
