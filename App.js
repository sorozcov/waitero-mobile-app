import React from 'react';
import { Provider } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import MainScreenStack from './src/navigation/MainStackNavigation';
import { configureStore } from './src/logic/store';
import { LogBox } from 'react-native';

//load moment module to set local language
let moment = require('moment');
require('moment/locale/es');
moment.locale('es');

// console.disableYellowBox = false;
LogBox.ignoreAllLogs(true);

console.warn = () => {};
// import store from 
const { store } = configureStore();
//Se configura el tema 
const theme = {
  ...DefaultTheme,
  roundness: 30,
  colors: {
    ...DefaultTheme.colors,
    red: 'red',
    primary: '#0FCBFA',
    secondary: '#023E8D',
    contrast:'#7DDE92',
    black:'#000F08',
    white:'white',
    accent: '#EA0F0B',
    gray2:'#605856',
    gray:'#FF2D2D',
    defaultButtonColor: 'black'
   
  },
};


export default function App(props) {
  
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);

    // Load resources 
    React.useEffect(() => {
      async function loadResourcesAndDataAsync() {
        try {
            // SplashScreen.preventAutoHide();
            // Load fonts
            await Font.loadAsync({
                'dosis-regular': require('./src/assets/fonts/Dosis-Regular.ttf'),
                'dosis-medium': require('./src/assets/fonts/Dosis-Medium.ttf'),
                'dosis-light': require('./src/assets/fonts/Dosis-Light.ttf'),
                'dosis-extra-light': require('./src/assets/fonts/Dosis-ExtraLight.ttf'),
                'dosis-semi-bold': require('./src/assets/fonts/Dosis-SemiBold.ttf'),
                'dosis-bold': require('./src/assets/fonts/Dosis-Bold.ttf'),
                'dosis-extra-bold': require('./src/assets/fonts/Dosis-ExtraBold.ttf'),
            });
        } catch (e) {
            // Error loading fonts
            console.warn(e);
        } finally {
            setLoadingComplete(true);
            // SplashScreen.hide();
        }
    }
        loadResourcesAndDataAsync();
    }, []);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return null;
    } else {
   
        return ( 
          <Provider store={store}>
            <PaperProvider theme={theme}>
                <MainScreenStack/>
            </PaperProvider>
          </Provider>
        );
    }
}
