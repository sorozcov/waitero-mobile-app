/* -------------------------------------------------------------------------- */
/*                               Componente Home                              */
/* -------------------------------------------------------------------------- */
// Este componente contiene la lista de restaurantes

import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Platform ,ScrollView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import * as selectors from '../../logic/reducers';

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />


function HomeScreen({token,user}) {
  // useEffect(startFetchingTweetsHome,[]);
 
  const refFlatList = React.useRef(null);
  return (
    <ScrollView style={styles.container}>
          
          <Card style={{marginTop:5,marginBottom:1,}}>
            
            <Card.Content>
              <Title style={{alignSelf:'center',fontFamily:'dosis-bold'}}> HACIENDA REAL</Title>
              
            </Card.Content>
            <Card.Cover  style={{height:150}} source={{ uri: 'http://www.haciendareal.net/gt/wp-content/uploads/slideshow-satellite/ga5.jpg' }} />
           
          </Card>

          <Card style={{marginTop:1,marginBottom:1,}}>
            
            <Card.Content>
              <Title style={{alignSelf:'center',fontFamily:'dosis-bold'}}> FRISCO GRILL</Title>
              
            </Card.Content>
            <Card.Cover  style={{height:150}} source={{ uri: 'https://pictures.scdn4.secure.raxcdn.com/16_268_r_0.jpg?v=653' }} />
           
          </Card>

          <Card style={{marginTop:1,marginBottom:1,}}>
            
            <Card.Content>
              <Title style={{alignSelf:'center',fontFamily:'dosis-bold'}}> LA CANTINA</Title>
              
            </Card.Content>
            <Card.Cover  style={{height:150}} source={{ uri: 'https://pictures.scdn4.secure.raxcdn.com/16_262_r_0.jpg?v=678' }} />
           
          </Card>

          <Card style={{marginTop:1,marginBottom:1,}}>
            
            <Card.Content>
              <Title style={{alignSelf:'center',fontFamily:'dosis-bold'}}>  SAÚL</Title>
              
            </Card.Content>
            <Card.Cover  style={{height:150}} source={{ uri: 'https://fastly.4sqi.net/img/general/600x600/54742612_KSYXdlTV_-_JA8cG2NsX4HlyL_O-qgnbwKUsBWop5tk.jpg' }} />
           
          </Card>

          <Card style={{marginTop:1,marginBottom:10,}}>
            
            <Card.Content>
              <Title style={{alignSelf:'center',fontFamily:'dosis-bold'}}> CIELITO LINDO</Title>
              
            </Card.Content>
            <Card.Cover  style={{height:150}} source={{ uri: 'https://s3-us-west-2.amazonaws.com/minisitios/revistaamigapl/wp-content/uploads/2016/08/cielito-lindo.jpg' }} />
           
          </Card>
      
   
    </ScrollView>
  );
}

export default connect(
  state => ({
    user: selectors.getAuthUserInformation(state),
    token:selectors.getAuthToken(state),
   
  }),
  dispatch => ({
    startFetchingTweetsHome() {
      dispatch(tweetActions.startFetchingTweetsHome());
      
    },
  }),
)(HomeScreen);


const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    backgroundColor:'#0FCBFA'
  },
});