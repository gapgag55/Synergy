/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';
import store from './src/reducers';

import HomeScreen from './src/containers/HomeScreen';
import ChatScreen from './src/containers/ChatScreen';
import LoginScreen from './src/containers/Login';
import SignupScreen from './src/containers/Signup';
import ScoreBoard from './src/components/ScoreBoard';

const navigationOptions = {
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerTintColor: '#222222',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  backgroundColor: '#f0f0f0',
};

const MainNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions,
    },
    ChatScreen: {
      screen: ChatScreen,
      navigationOptions,
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions,
    },
    // SignupScreen: {
    //   screen: SignupScreen,
    //   navigationOptions,
    // }
    ScoreBoard:{
      screen: ScoreBoard,
      navigationOptions,
    }
  },
  {
    initialRouteName: 'HomeScreen',
  },
);

const App = createAppContainer(MainNavigator);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
