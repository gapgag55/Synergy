import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import FBSDK, {LoginButton, LoginManager, AccessToken} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

var config = 
{
  apiKey: "AIzaSyDc6qfW4vZcGCVEcIuOW7lPMzsl4wDymA0",
  authDomain: "https://guester-f3953.firebaseapp.com/",
  databaseURL: "https://guester-f3953.firebaseio.com/"
}

// const firebaseRef = firebase.initializeApp(config);
const firebaseRef = firebase.app();

export default class Login extends Component {
  _fbAuth()
  {
    // console.log('in _fbAuth');
    // console.log(LoginManager.logInWithPermissions);
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function(result)
      {
        if(result.isCancelled)
        {
          console.log('login cancelled');
        }
        else
        {
          AccessToken.getCurrentAccessToken().then((accessTokenData)=>{
            const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken);
            firebase.auth().signInWithCredential(credential).then((result) => {
              console.log('login suecssful');
            }, (error) => {
              console.log(error);
            })
          }, (error => {
            console.log('error occured: '+error);
          }))
        }
      },
      function(error)
      {
        console.log(error);
        console.log('loing error T-T');
      }  
    )
  }

  _googleAuth()
  {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: 'AIzaSyDkfyO-TGny3o_D7pZS11sETQD1RN3a0e0' // required
    });

    const { accessToken, idToken } = GoogleSignin.signIn();
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
    firebase.auth().signInWithCredential(credential);
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Image
          source={require('../assets/images/4c68fb90-8c18-4a35-a967-2324038b40d2_200x200.png')}
          resizeMode="contain"
          style={styles.synergyLogo}
        /> */}
        <View style={styles.SignupTabStack}>
          <TouchableOpacity
            onPress={() => console.log('Go to Sign Up Page')}
            style={styles.SignupTab}>
            <View style={styles.rect2}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.LoginTab}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.logIntext}>Log In</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rect}>
            <View style={styles.fbLogin}>
              <View style={styles.rect3}>
                <View style={styles.fbIconRow}>
                  <MaterialCommunityIconsIcon
                    name="facebook"
                    // onPress={() => console.log('signin with facebook')}
                    onPress={this._fbAuth}
                    style={styles.fbIcon}
                  />
                  <Text style={styles.fbLoginText}>Log In with Facebook</Text>
                </View>
                {/* <View>
                  <LoginButton
                    onLoginFinished={
                      (error, result) => {
                        if (error) {
                          console.log(error);
                          console.log(result);
                          console.log("login has error: " + result.error);
                        } else if (result.isCancelled) {
                          console.log("login is cancelled.");
                        } else {
                          AccessToken.getCurrentAccessToken().then(
                            (data) => {
                              console.log(data.accessToken.toString())
                            }
                          )
                        }
                      }
                    }
                    onLogoutFinished={() => console.log("logout.")}/>
                </View> */}
              </View>
            </View>
            <View style={styles.ggLogin}>
              <View style={styles.rect4}>
                <View style={styles.rect5}>
                  <View style={styles.ggIconRow}>
                    <MaterialCommunityIconsIcon
                      onPress={() => this._googleAuth()}
                      name="gmail"
                      style={styles.ggIcon}
                    />
                    <Text style={styles.ggLoginText}>Log In with Google</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  synergyLogo: {
    width: 226,
    height: 226,
    marginTop: 119,
    alignSelf: 'center',
  },
  SignupTab: {
    top: 0,
    left: 176,
    width: 199,
    height: 62,
    position: 'absolute',
  },
  rect2: {
    width: 199,
    height: 62,
    backgroundColor: 'rgba(214,234,242,1)',
    elevation: 30,
    borderRadius: 10,
    borderColor: '#000000',
    borderWidth: 0,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    overflow: 'hidden',
  },
  signUpText: {
    color: 'rgba(248,248,248,1)',
    fontSize: 30,
    fontFamily: 'red-hat-text-regular',
    marginTop: 16,
    marginLeft: 47,
  },
  LoginTab: {
    top: 0,
    left: 0,
    width: 188,
    height: 62,
    position: 'absolute',
  },
  button: {
    width: 188,
    height: 62,
    backgroundColor: 'rgba(248,248,248,1)',
    elevation: 30,
    borderRadius: 10,
    borderColor: '#000000',
    borderWidth: 0,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    overflow: 'hidden',
  },
  logInText: {
    color: 'rgba(82,200,250,1)',
    fontSize: 30,
    fontFamily: 'red-hat-text-regular',
    marginTop: 16,
    marginLeft: 55,
  },
  rect: {
    top: 56,
    left: 0,
    width: 375,
    height: 381,
    backgroundColor: 'rgba(248,248,248,1)',
    position: 'absolute',
  },
  fbLogin: {
    width: 285,
    height: 47,
    marginTop: 76,
    marginLeft: 45,
  },
  rect3: {
    width: 285,
    height: 47,
    backgroundColor: 'rgba(59,89,152,1)',
    elevation: 12,
    borderRadius: 5,
    borderColor: '#000000',
    borderWidth: 0,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    flexDirection: 'row',
  },
  fbIcon: {
    color: 'rgba(255,255,255,1)',
    fontSize: 40,
    width: 32,
    height: 32,
  },
  fbLoginText: {
    color: 'rgba(248,248,248,1)',
    fontSize: 20,
    fontFamily: 'red-hat-text-regular',
    marginLeft: 20,
    marginTop: 6,
  },
  fbIconRow: {
    height: 32,
    flexDirection: 'row',
    flex: 1,
    marginRight: 25,
    marginLeft: 19,
    marginTop: 7,
  },
  ggLogin: {
    width: 285,
    height: 47,
    marginTop: 44,
    marginLeft: 45,
  },
  rect4: {
    width: 285,
    height: 47,
  },
  rect5: {
    width: 285,
    height: 47,
    backgroundColor: 'rgba(255,62,48,1)',
    elevation: 12,
    borderRadius: 5,
    borderColor: '#000000',
    borderWidth: 0,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    flexDirection: 'row',
  },
  ggIcon: {
    color: 'rgba(255,255,255,1)',
    fontSize: 32,
    width: 32,
    height: 32,
  },
  ggLoginText: {
    color: 'rgba(248,248,248,1)',
    fontSize: 20,
    fontFamily: 'red-hat-text-regular',
    marginLeft: 22,
    marginTop: 5,
  },
  ggIconRow: {
    height: 32,
    flexDirection: 'row',
    flex: 1,
    marginRight: 45,
    marginLeft: 17,
    marginTop: 8,
  },
  SignupTabStack: {
    width: 375,
    height: 437,
    marginTop: 30,
  },
});