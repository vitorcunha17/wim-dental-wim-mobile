import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import createNavigator from './routes';
import * as Font from 'expo-font';
import AuthService from './services/auth';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import store from './store/index';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    async function verifyUserLogged() {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        const response = await AuthService.verifyToken();
        if (response.code === 200) {
          setUserLogged(true);
        }
      } else {
        setUserLogged(false);
      }
    }

    const loadFonts = async () => {
      await Font.loadAsync({
        Roboto: require('../assets/Fonts/Roboto.ttf'),
        Roboto_medium: require('../assets/Fonts/Roboto_medium.ttf'),
        NotoSans: require('../assets/Fonts/Noto-Sans.ttf'),
        NotoSansBold: require('../assets/Fonts/Noto-Sans-Bold.ttf'),
      });
      setIsReady(true);
    };

    loadFonts();
    verifyUserLogged();
  }, []);

  const Routes = createNavigator(userLogged);

  if (isReady) {
    return (
      <Provider store={store}>
        <Root>
          <Routes />
        </Root>
      </Provider>
    );
  } else {
    return <AppLoading />;
  }
}
