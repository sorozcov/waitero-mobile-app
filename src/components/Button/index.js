/* -------------------------------------------------------------------------- */
/*                            Componente Button                               */
/* -------------------------------------------------------------------------- */
// Este componente contiene un botón genérico que se utiliza en muchas pantallas de la aplicación.

import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useTheme,Button } from "react-native-paper";

export default function StyledButton(props) {
  const theme = props.theme!=undefined ?  props.theme :useTheme();
  const height = hp("6%");
  const width = wp("75%");
  const defaultOptions = {
    height:height,
    width:width,
    color: theme.colors.secondary,
    theme:theme,
    mode:'contained',
    labelStyle: {
        fontFamily: "dosis-bold",
        fontSize: 15,
        color: theme.colors.white,
    },
    style:{
        fontFamily: "dosis",
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "4%",
        width:props.width != undefined ? props.width : width,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",},
    contentStyle:{
            width:props.width != undefined ? props.width : width,
            height:props.height!= undefined ? props.height :  height
    },
    icon:'',
    onPress:()=>{},
    disabled:false,
    text: '',
  }
  const options = {...defaultOptions,...props}
  
  return (
    <Button
        theme={options.theme}
        disabled={options.disabled}
        color={options.color}
        icon= {options.icon}
        height={options.height}
        width={options.width}
        mode={options.mode}
        labelStyle={options.labelStyle}
        style={options.style}
        contentStyle={options.contentStyle}
        onPress={options.onPress}
      >
        {options.text}
      </Button>
  );
}

