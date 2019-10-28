import React, {useState} from 'react';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import {user} from '../models/user';

function Sender() {
  const [isActiveAttachment, setAttachment] = useState(false);
  const [activeAttachment] = useState(new Animated.Value(20));
  const [value, onChangeText] = useState('');

  const onTextSubmit = () => {
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
        ...user,
      });
    }

    onChangeText('');
  };

  const showImagePicker = () => {
    if (isActiveAttachment) {
      setAttachment(false);

      return Animated.timing(activeAttachment, {
        toValue: 20,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    setAttachment(true);

    Animated.timing(activeAttachment, {
      toValue: -80,
      duration: 200,
      useNativeDriver: true,
    }).start();

    // const options = {
    //   title: 'Select Photo',
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    //   },
    // };

    // ImagePicker.showImagePicker(options, response => {
    //   console.log('Response = ', response);

    // if (response.didCancel) {
    //   console.log('User cancelled image picker');
    // } else if (response.error) {
    //   console.log('ImagePicker Error: ', response.error);
    // } else if (response.customButton) {
    //   console.log('User tapped custom button: ', response.customButton);
    // } else {
    //   const source = {uri: response.uri};
    //   console.log(source);
    // }
    // });
  };

  // const customStyle = isAttachment ? styles.activeAttachment : styles.sender;
  // console.log(customStyle);

  return (
    <Animated.View
      style={{
        transform: [{translateY: activeAttachment}],
      }}>
      <View style={styles.container}>
        <View style={styles.containerLeft}>
          <TouchableHighlight
            onPress={showImagePicker}
            underlayColor="transparent">
            <Icon name="paperclip" size={25} />
          </TouchableHighlight>
          <TextInput
            style={styles.input}
            onChangeText={text => onChangeText(text)}
            placeholder="Type a Message Here"
            placeholderTextColor="#999999"
            value={value}
          />
        </View>
        <TouchableHighlight onPress={onTextSubmit} underlayColor="transprent">
          <Icon name="send" size={25} />
        </TouchableHighlight>
      </View>
      <View style={styles.attachment}>
        <Text>Hello</Text>
        <Text>Hello</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sender: {
    transform: [{translateY: 20}],
  },
  activeAttachment: {
    transform: [{translateY: -80}],
  },
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
    shadowColor: '#999999',
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
  attachment: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    width: '100%',
    height: 200,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
  },
});

export default Sender;
