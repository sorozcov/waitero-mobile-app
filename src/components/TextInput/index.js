/* -------------------------------------------------------------------------- */
/*                            Componente TextInput                            */
/* -------------------------------------------------------------------------- */
// Este componente contiene un textinput genérico que se utiliza en muchas pantallas de la aplicación.

import React from 'react';
import { StyleSheet, View,Text } from 'react-native';

import {useTheme} from 'react-native-paper';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import TextInputMask from 'react-native-text-input-mask';
import { TextInput } from 'react-native-paper';

export default function MyTextInput(props) {
  const { input, meta,...inputProps } = props;
  
  const theme =useTheme();
  
  return (
    <View style={{height:(meta.touched && meta.error) ? hp('10%') : hp('7.5%'),marginTop:5,marginBottom:5,...inputProps.containerStyle}}>

      <TextInput
        value={input.value}
        onChangeText={input.onChange}
        // // onBlur={input.onBlur}
        // // onFocus={input.onFocus}
        
  
        placeholderTextColor={'black'}
        // mode={'outlined'}
        editable={inputProps.editable != false}
        label={inputProps.label}
        placeholder={inputProps.placeholder}
        keyboardType={inputProps.keyboardType}
        secureTextEntry={inputProps.secureTextEntry}
        returnKeyType={"done"}
        // // underlineColor="black"
        multiline={inputProps.multiline}
        maxLength={inputProps.maxLength}
        style={styles.inputContainerStyle}
        left={inputProps.icon!=undefined ? (<TextInput.Icon style={{paddingTop:hp('0.9%')}} name={inputProps.icon} color={inputProps.iconColor!=undefined ? inputProps.Icon : theme.colors.primary} />) : null}
        error={meta.touched && (meta.error)}
        
        />
        
      {meta.touched && (meta.error && <View style={{height:hp('6%')}}><Text style={styles.textError}>{meta.error}</Text></View>)}
        
    </View>
  );
}


const styles = StyleSheet.create({
 
  textError: {
    color: 'red',
    paddingLeft: hp('4%'),
    paddingTop: hp('0.8%')
  },
  inputContainerStyle: {
    height:hp('7%'),
    width:wp('85%'),
    alignSelf:'center', 
    backgroundColor:'white',
    borderColor:'red',
       
  },
});