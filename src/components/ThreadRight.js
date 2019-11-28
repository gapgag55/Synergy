import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ThreadRight({content, timestamp, vote, onVote}) {
  return (
    <View style={styles.thread}>
      <Text style={styles.time}>{timestamp}</Text>
      <TouchableHighlight onPress={onVote} underlayColor="transparent">
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.text}>{content}</Text>
            {!!vote && (
              <View style={styles.voteContainer}>
                <Icon name="heart" size={10} color={'#ff0000'} />
                <Text style={styles.voteText}>{vote}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableHighlight>
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
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  contentContainer: {
    backgroundColor: '#2A87D3',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 20,
    position: 'relative',
  },
  time: {
    fontSize: 10,
    color: '#999999',
    marginBottom: 5,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
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

export default ThreadRight;
