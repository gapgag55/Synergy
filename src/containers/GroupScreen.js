import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import firebase from 'react-native-firebase';

function GroupScreen({navigation}) {
  const [value, onChangeText] = useState('');

  const onCreateGroup = () => {
    const room = value.replace(' ', '-').toLowerCase();

    firebase
      .database()
      .ref('channels')
      .child(room)
      .push({
        type: 'system',
        content: 'New Group Created',
      });

    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <View style={styles.groupContainer}>
        <Text style={styles.heading}>Group Name</Text>
        <TextInput
          placeholder="Group Name"
          style={styles.input}
          onChangeText={text => onChangeText(text)}
        />
        <TouchableWithoutFeedback onPress={onCreateGroup}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Create Group</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

GroupScreen.navigationOptions = {
  title: 'Create Group',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    height: '100%',
    padding: 20,
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  groupContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 20,
  },
  input: {
    backgroundColor: '#dddddd',
    borderRadius: 5,
    padding: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#3b5998',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default GroupScreen;
