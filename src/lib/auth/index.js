import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {GoogleSignin} from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import { setUserAction } from '../../actions/user';
import store from '../../reducers';

// Calling the following function will open the FB login dialogue:
export async function facebookLogin(navigation) {
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      return;
    }

    console.log(
      `Login success with permissions: ${result.grantedPermissions.toString()}`,
    );

    // get the access token
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      // handle this however suites the flow of your app
      throw new Error('Something went wrong obtaining the users access token');
    }

    // create a new firebase credential with the token
    const credential = firebase.auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // login with credential
    const firebaseUserCredential = await firebase
      .auth()
      .signInWithCredential(credential);

    if (firebaseUserCredential.user) {
      setTimeout(() => {
        const user = firebase.auth().currentUser;

        store.dispatch(setUserAction(user));
        navigation.navigate('HomeScreen');
      }, 1000);
    }
  } catch (e) {
    console.error(e);
  }
}

export async function googleLogin(navigation) {
  try {
    // add any configuration settings here:
    await GoogleSignin.configure({
      webClientId:
        '713099360012-qqhpv8i2da7gh0vqc4frfesnt4bbov43.apps.googleusercontent.com',
    });

    const data = await GoogleSignin.signIn();

    // create a new firebase credential with the tokenOkay
    const credential = firebase.auth.GoogleAuthProvider.credential(
      data.idToken,
      data.accessToken,
    );

    // // login with credential
    const firebaseUserCredential = await firebase
      .auth()
      .signInWithCredential(credential);

    if (firebaseUserCredential.user) {
      setTimeout(() => {
        const user = firebase.auth().currentUser;

        store.dispatch(setUserAction(user));
        navigation.navigate('HomeScreen');
      });
    }
  } catch (e) {
    console.error(e);
  }
}
