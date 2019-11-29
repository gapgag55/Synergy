import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux';
import {logoutUserAction} from '../actions/user';

function ProfileScreen({navigation, user, logoutUser}) {
  const logout = async () => {
    await firebase.auth().signOut();
    logoutUser();
    navigation.navigate('Auth');
  };

  return (
    <View style={styles.container}>
      <View style={styles.padding}>
        <View style={styles.profile}>
          <Image style={styles.avatar} source={{uri: user.avatar}} />
          <Text style={styles.displayName}>{`${user.firstname} ${
            user.lastname
          }`}</Text>
          <TouchableWithoutFeedback onPress={logout}>
            <View style={styles.logoutButton}>
              <Text style={styles.logoutText}>Log Out</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}

ProfileScreen.navigationOptions = () => ({
  title: 'Profile',
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    height: '100%',
  },
  padding: {
    padding: 20,
  },
  profile: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  displayName: {
    fontSize: 20,
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  logoutButton: {
    width: '100%',
    padding: 20,
    backgroundColor: '#EA4335',
    borderRadius: 10,
  },
  logoutText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 20,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUserAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);
