import React, {useEffect} from 'react';
import {View, ActivityIndicator, StatusBar} from 'react-native';
import firebase from 'react-native-firebase';

function AuthLoadingScreen({navigation}) {
  useEffect(() => {
    const user = firebase.auth().currentUser;

    navigation.navigate(user ? 'App' : 'Auth');
  });

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}

export default AuthLoadingScreen;
