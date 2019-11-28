import firebase from 'react-native-firebase';

const user = firebase.auth().currentUser;
const name = user.displayName.split(' ');

export default {
  firstname: name[0],
  lastname: name[1],
  id: user.uid,
  avatar: user.photoURL,
};
