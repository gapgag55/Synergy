import firebase from 'react-native-firebase';

function getUser() {
  const user = firebase.auth().currentUser;

  if (user) {
    const name = user ? user.displayName.split(' ') : '';

    return {
      firstname: name[0],
      lastname: name[1],
      id: user.uid,
      avatar: user.photoURL,
    };
  }

  return {};
}

export default getUser();
