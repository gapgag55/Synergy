import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {TouchableHighlight} from 'react-native-gesture-handler';
import firebase from 'react-native-firebase';

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
        avatar:
          'https://firebasestorage.googleapis.com/v0/b/guester-f3953.appspot.com/o/avatars%2FUgOVkyBKBUbodalg6RjKKijtlis2.jpg?alt=media&token=96cc6b7e-7edf-411a-9190-30e0d8a443ae',
        content: value,
        firstname: 'Sarayut',
        lastname: 'Lawilai',
        love: 0,
        timestamp: Date.now(),
        type: 'text',
        userid: 'UgOVkyBKBUbodalg6RjKKijtlis2',
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
      <TouchableHighlight onPress={onSubmit}>
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
