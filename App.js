/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './src/containers/HomeScreen';
import ChatScreen from './src/containers/ChatScreen';

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
  },
  {
    initialRouteName: 'ChatScreen',
  },
);

const App = createAppContainer(MainNavigator);

export default App;
