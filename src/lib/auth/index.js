import {AccessToken, LoginManager} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';

// Calling the following function will open the FB login dialogue:
export async function facebookLogin(navigation) {
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      // handle this however suites the flow of your app
      throw new Error('User cancelled request');
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
      navigation.navigate('HomeScreen');
    }
  } catch (e) {
    console.error(e);
  }
}
