import React from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ThreadFileRight({content, timestamp, vote, onVote}) {
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
      <Text style={styles.time}>{timestamp}</Text>
      <TouchableWithoutFeedback onPress={onVote}>
        <View style={styles.container}>
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
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  thread: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  container: {
    flexDirection: 'row',
    maxWidth: '60%',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  name: {
    fontWeight: '500',
    marginBottom: 5,
  },
  contentContainer: {
    backgroundColor: '#2A87D3',
    alignSelf: 'flex-start',
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 25,
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
  time: {
    fontSize: 10,
    color: '#999999',
    marginBottom: 5,
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: -5,
    bottom: -5,
    backgroundColor: '#ffffff',
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  voteText: {
    fontSize: 10,
    marginLeft: 2,
  },
});

export default ThreadFileRight;
