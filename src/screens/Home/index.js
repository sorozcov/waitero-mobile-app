/* -------------------------------------------------------------------------- */
/*                               Componente Home                              */
/* -------------------------------------------------------------------------- */
// Este componente contiene la lista de restaurantes

import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import FAB from '../General/FAB';
import * as selectors from '../../logic/reducers';
// import * as tweetActions from '../../actions/tweets';
// import TweetList from '../TweetList';



function HomeScreen({token,user}) {
  // useEffect(startFetchingTweetsHome,[]);
 
  const refFlatList = React.useRef(null);
  return (
    <View style={styles.container}>
          
      {/* <TweetList navigation={navigation} tweetArray={tweetsHome} container={{height:Platform.OS === 'ios' ? hp('80%') : hp('83.8%') }}
        key={'tweetsHome'} infoEmptyText={'¿Qué?¿Todavía no ves Tweets?'} 
        recommendEmptyText={'Esta cronología no estará vacía para siempre. Comienza a seguir personas y sus tweets estarán aquí.'}
        isFetching={isFetchingHomeTweets}  onRefresh={()=>{startFetchingTweetsHome()}} >
      </TweetList> */}
      
   
    </View>
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
  },
});