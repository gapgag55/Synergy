import React, {useState} from 'react';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import {View, TextInput, TouchableHighlight, StyleSheet} from 'react-native';
import {user} from '../models/user';

function Sender({isActiveAttachment, openAttachment}) {
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
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (!response.didCancel && !response.error) {
        const source = {uri: response.uri};

        // Upload to storage
        const fileName = Date.now();
        const fileRef = firebase.storage().ref(`files/${fileName}`);
        fileRef.put(source.uri).then(image => {
          // Save to realtime db
          const thread = firebase
            .database()
            .ref('channels')
            .child('practical-software-engineer')
            .push();

          thread.set({
            content: {
              imageUrl: image.downloadURL,
            },
            timestamp: Date.now(),
            type: 'image',
            ...user,
          });
        });
      }
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerLeft}>
          <TouchableHighlight
            onPress={openAttachment}
            underlayColor="transparent">
            <Icon
              name="paperclip"
              size={25}
              color={isActiveAttachment ? '#2A87D3' : '#222222'}
              style={{paddingRight: 10}}
            />
          </TouchableHighlight>
          <TextInput
            style={styles.input}
            onChangeText={text => onChangeText(text)}
            placeholder="Type a Message Here"
            placeholderTextColor="#999999"
            value={value}
          />
        </View>
        <TouchableHighlight onPress={onTextSubmit} underlayColor="transparent">
          <Icon name="send" size={25} />
        </TouchableHighlight>
      </View>
      <View style={styles.attachment}>
        <TouchableHighlight
          onPress={showImagePicker}
          underlayColor="transparent">
          <Icon name="image" size={25} style={styles.attachmentIcon} />
        </TouchableHighlight>
        <Icon name="file" size={25} style={styles.attachmentIcon} />
        <Icon name="camera" size={25} style={styles.attachmentIcon} />
        <Icon name="mic" size={25} style={styles.attachmentIcon} />
      </View>
    </>
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
    width: '80%',
    color: '#222222',
    padding: 20,
  },
  attachment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    width: '100%',
    height: 110,
    padding: 20,
    paddingHorizontal: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 25,
  },
  attachmentIcon: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    color: '#222222',
    padding: 20,
  },
});

export default Sender;
