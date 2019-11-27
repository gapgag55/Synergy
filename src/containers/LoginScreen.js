import React from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
import {facebookLogin, googleLogin} from '../lib/auth';

function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={[styles.socialButton, styles.facebook]}>
        <TouchableWithoutFeedback onPress={() => facebookLogin(navigation)}>
          <Text style={styles.loginButton}>Log In with Facebook</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={[styles.socialButton, styles.google]}>
        <TouchableWithoutFeedback onPress={() => googleLogin()}>
          <Text style={styles.loginButton}>Log In with Google</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  socialButton: {
    marginBottom: 10,
  },
  facebook: {
    backgroundColor: '#3b5998',
    padding: 10,
    borderRadius: 5,
  },
  google: {
    backgroundColor: '#EA4335',
    padding: 10,
    borderRadius: 5,
  },
  loginButton: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default LoginScreen;
