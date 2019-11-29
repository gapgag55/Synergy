import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ThreadFileLeft({
  avatar,
  firstname,
  lastname,
  content,
  timestamp,
  vote,
  onVote,
}) {
  const {fileName, fileSize, fileUrl} = content;

  const getFileSize = size => {
    if (size < 1000) {
      return `size: ${size} B`;
    }

    if (size < Math.pow(10, 6)) {
      return `size: ${size / Math.pow(10, 3)} KB`;
    }

    if (size < Math.pow(10, 9)) {
      return `size: ${size / Math.pow(10, 6)} MB`;
    }

    if (size > Math.pow(10, 9)) {
      return `size: ${size / Math.pow(10, 9)} GB`;
    }
  };

  return (
    <View style={styles.thread}>
      <TouchableWithoutFeedback onPress={onVote}>
        <View style={styles.container}>
          <Image style={styles.avatar} source={{uri: avatar}} />
          <View>
            <Text style={styles.name}>{`${firstname} ${lastname}`}</Text>
            <View style={styles.contentContainer}>
              <View style={styles.fileContainer}>
                <Icon
                  name="file"
                  size={25}
                  color="#ffffff"
                  style={styles.fileIconLeft}
                />
                <View>
                  <Text style={styles.fileName}>{fileName}</Text>
                  <Text style={styles.fileSize}>{getFileSize(fileSize)}</Text>
                </View>
                <Icon
                  name="chevron-right"
                  size={20}
                  color="#ffffff"
                  style={styles.fileIconRight}
                />
              </View>
              {!!vote && (
                <View style={styles.voteContainer}>
                  <Icon name="heart" size={10} color={'#ff0000'} />
                  <Text style={styles.voteText}>{vote}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Text style={styles.time}>{timestamp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  thread: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  container: {
    flexDirection: 'row',
    maxWidth: '80%',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
  },
  name: {
    fontWeight: '500',
    marginBottom: 5,
  },
  contentContainer: {
    backgroundColor: '#2A87D3',
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 10,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    position: 'relative',
  },
  fileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fileName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
    maxWidth: 100,
  },
  fileSize: {
    fontSize: 10,
    color: '#ffffff',
  },
  fileIconLeft: {
    marginRight: 15,
  },
  fileIconRight: {
    marginLeft: 15,
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: -5,
    bottom: 0,
    backgroundColor: '#ffffff',
    paddingVertical: 2,
    minWidth: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  voteText: {
    fontSize: 10,
    marginLeft: 2,
  },
  time: {
    fontSize: 10,
    color: '#999999',
    marginBottom: 5,
  },
});

export default ThreadFileLeft;
