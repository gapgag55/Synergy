/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';
import store from './src/reducers';

import AuthLoadingScreen from './src/containers/AuthLoading';
import HomeScreen from './src/containers/HomeScreen';
import ProfileScreen from './src/containers/ProfileScreen';
import ChatScreen from './src/containers/ChatScreen';
import ScoreBoard from './src/components/ScoreBoard';
import GroupScreen from './src/containers/GroupScreen';
import LoginScreen from './src/containers/LoginScreen';

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

const AppStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        ...navigationOptions,
        header: null,
      },
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions,
    },
    GroupScreen: {
      screen: GroupScreen,
      navigationOptions,
    },
    ScoreBoard: {
      screen: ScoreBoard,
      navigationOptions,
    },
    ChatScreen: {
      screen: ChatScreen,
      navigationOptions,
    },
  },
  {
    initialRouteName: 'HomeScreen',
  },
);

const AuthStack = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      ...navigationOptions,
      header: null,
    },
  },
});

const App = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
