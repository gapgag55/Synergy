import React, {useEffect} from 'react';
import {View, ActivityIndicator, StatusBar} from 'react-native';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux';
import {setUserAction} from '../actions/user';

function AuthLoadingScreen({navigation, setUser}) {
  useEffect(() => {
    const user = firebase.auth().currentUser;

    setTimeout(() => {
      if (user) {
        setUser(user);
      }

      navigation.navigate(user ? 'App' : 'Auth');
    }, 400);
  });

  return (
    <View>
      <StatusBar barStyle="default" />
    </View>
  );
}

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUserAction(user)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AuthLoadingScreen);
