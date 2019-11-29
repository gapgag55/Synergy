import firebase from 'react-native-firebase';

function getUser() {
  const user = firebase.auth().currentUser;

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      //logged in
    } else {
      //do sth
    }
  });
}

export default getUser();
