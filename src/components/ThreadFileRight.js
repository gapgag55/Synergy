import React from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ThreadFileRight({content, vote, onVote}) {
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
                size={25}
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
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 15,
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
    left: -30,
    bottom: 0,
    backgroundColor: '#ffffff',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  voteText: {
    fontSize: 15,
    marginLeft: 2,
  },
});

export default ThreadFileRight;
