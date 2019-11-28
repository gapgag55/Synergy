import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {facebookLogin, googleLogin} from '../lib/auth';

function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Image style={styles.logo} source={require('../images/logo.png')} />
      </View>

      <View style={[styles.socialButton, styles.facebook]}>
        <TouchableWithoutFeedback onPress={() => facebookLogin(navigation)}>
          <View style={styles.social}>
            <Icon name="facebook-f" size={25} style={styles.socialIcon} />
            <Text style={styles.loginButton}>Log In with Facebook</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={[styles.socialButton, styles.google]}>
        <TouchableWithoutFeedback onPress={() => googleLogin(navigation)}>
          <View style={styles.social}>
            <Icon name="google" size={25} style={styles.socialIcon} />
            <Text style={styles.loginButton}>Log In with Google</Text>
          </View>
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
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  logo: {
    width: 200,
    height: 200,
  },
  socialButton: {
    marginBottom: 10,
  },
  facebook: {
    backgroundColor: '#3b5998',
    padding: 20,
    borderRadius: 5,
  },
  google: {
    backgroundColor: '#EA4335',
    padding: 20,
    borderRadius: 5,
  },
  loginButton: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    marginRight: 10,
    color: '#ffffff',
  },
});

export default LoginScreen;
