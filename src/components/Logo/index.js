/* -------------------------------------------------------------------------- */
/*                              Componente Start                              */
/* -------------------------------------------------------------------------- */
// Este componente muestra la pantalla de inicio de la aplicación.

import React from "react";
import { StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "react-native";

export default function WaiteroLogo({height=hp("15%"), width=wp('40%')}) {
  
    const waiteroLogo = require("../../assets/resources/waitero-icon-extra-small.png");
    return ( <View style={styles.imageContainer}>
        <Image source={waiteroLogo} style={{...styles.logoImage, width:width,height:height}} />
      </View>)
}

const styles = StyleSheet.create({

    imageContainer: {
      alignItems: "center",
    },
    logoImage: {
      width: wp("40%"),
      height: hp("15%"),
      resizeMode: "contain",
    },

  });
  