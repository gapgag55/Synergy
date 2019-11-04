import React from 'react';
import {View, Button, StyleSheet, StatusBar} from 'react-native';
import { handleFbLogin } from '../lib/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Button
        onPress={() => navigation.navigate('ChatScreen')}
        title="Press me"
      />
      <Button
        onPress={handleFbLogin}
        title="Sign in with facebook"
        color="#3c50e8"
      />
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this._signIn}
        disabled={this.state.isSigninInProgress} />
    </View>
  );
}

HomeScreen.navigationOptions = ({navigation}) => ({
  title: 'Hello!',
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    height: '100%',
    justifyContent: 'center',
  },
});

export default HomeScreen;
