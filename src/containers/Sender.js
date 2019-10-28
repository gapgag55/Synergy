import React from 'react';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Feather';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import User from '../models/user';

function Sender() {
  const [value, onChangeText] = React.useState('');

  const onSubmit = () => {
    if (value) {
      const thread = firebase
        .database()
        .ref('channels')
        .child('practical-software-engineer')
        .push();

      thread.set({
        content: value,
        timestamp: Date.now(),
        type: 'text',
        ...User,
      });
    }

    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <Icon name="paperclip" size={25} />
        <TextInput
          style={styles.input}
          onChangeText={text => onChangeText(text)}
          placeholder="Type a Message Here"
          placeholderTextColor="#999999"
          value={value}
        />
      </View>
      <TouchableHighlight onPress={onSubmit} underlayColor="transprent">
        <Icon name="send" size={25} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    height: 'auto',
    borderRadius: 50,
    borderColor: 'gray',
    shadowColor: '#555555',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '85%',
    color: '#222222',
    padding: 20,
  },
});

export default Sender;
