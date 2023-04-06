/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {Provider} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from '@pages/Home';
import indexStyle from '@/styles/index.style';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '@/reducers/rootReducer';
import {Platform} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '@/pages/Login';
import Toast from 'react-native-toast-message';
import Navigation from '@/routers/navigation';

const Stack = createStackNavigator();

const originalConsoleLog = console.log;
console.log = (...arg) => {
  const os = Platform.OS;
  let prefix = `${os}`;
  switch (os) {
    case 'ios':
      prefix = '🍎';
      break;
    case 'android':
      prefix = '🤖';
      break;
  }
  originalConsoleLog(prefix, ...arg);
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const store = configureStore({
    reducer: rootReducer,
    middleware: defaultMiddleware =>
      defaultMiddleware({serializableCheck: false}),
  });

  return (
    <SafeAreaView style={indexStyle.appContainer}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Provider store={store}>
        <Navigation />
        <Toast />
      </Provider>
    </SafeAreaView>
  );
}

export default App;
