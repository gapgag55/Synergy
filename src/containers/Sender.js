import React, {useState} from 'react';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

function Sender({isActiveAttachment, openAttachment}) {
  const [value, onChangeText] = useState('');
  const user = firebase.auth().currentUser;

  const name = user.displayName.split(' ');

  const userData = {
    firstname: name[0],
    lastname: name[1],
    id: user.uid,
    avatar: user.photoURL,
  };

  const options = {
    title: 'Select Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const onTextSubmit = () => {
    if (value) {
      const thread = firebase
        .database()
        .ref('channels')
        .child('practical-software-engineer')
        .push();

      thread.set({
        content: value,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        type: 'text',
        ...userData,
      });
    }

    onChangeText('');
  };

  const showImagePicker = () => {
    console.log('button pressed');
    ImagePicker.showImagePicker(options, response => {
      uploadImage(response);
    });
  };

  const showCamera = () => {
    ImagePicker.launchCamera(options, response => {
      uploadImage(response);
    });
  };

  const showFilePicker = async () => {
    try {
      const res = await DocumentPicker.pick();

      if (res.type.split('/')[0] === 'image') {
        const source = {
          uri: res.uri,
        };
        uploadImage(source);
      } else {
        const source = {
          uri: res.uri,
          type: res.type,
          name: res.name,
          size: res.size,
        };

        uploadFile(source);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = response => {
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
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          type: 'image',
          ...userData,
        });
      });
    }
  };

  const uploadFile = source => {
    // Upload to storage
    const fileRef = firebase.storage().ref(`files/${source.name}`);
    fileRef.put(source.uri).then(file => {
      // Save to realtime db
      const thread = firebase
        .database()
        .ref('channels')
        .child('practical-software-engineer')
        .push();

      thread.set({
        content: {
          fileName: source.name,
          fileSize: source.size,
          fileUrl: file.downloadURL,
        },
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        type: 'file',
        ...userData,
      });
    });
  };

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerLeft}>
          <TouchableWithoutFeedback onPress={openAttachment}>
            <Icon
              name="paperclip"
              size={25}
              color={isActiveAttachment ? '#2A87D3' : '#222222'}
              style={{paddingRight: 10}}
            />
          </TouchableWithoutFeedback>
          <TextInput
            style={styles.input}
            onChangeText={text => onChangeText(text)}
            placeholder="Type a Message Here"
            placeholderTextColor="#999999"
            value={value}
          />
        </View>
        <TouchableWithoutFeedback onPress={onTextSubmit}>
          <Icon name="send" size={25} />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.attachment}>
        <AnimatedTouchable onPress={() => console.log('ok')}>
          <Icon name="image" size={25} style={styles.attachmentIcon} />
        </AnimatedTouchable>
        <TouchableWithoutFeedback onPress={showFilePicker}>
          <Icon name="file" size={25} style={styles.attachmentIcon} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={showCamera}>
          <Icon name="camera" size={25} style={styles.attachmentIcon} />
        </TouchableWithoutFeedback>
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
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    height: 60,
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
    padding: 10,
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
