import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ThreadRight({content, vote, onVote}) {
  return (
    <View style={styles.thread}>
      <TouchableHighlight onPress={onVote} underlayColor="transparent">
        <View style={styles.container}>
          <View style={styles.textContainer}>
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
    alignItems: 'flex-end',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  textContainer: {
    backgroundColor: '#2A87D3',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 20,
    position: 'relative',
  },
  text: {
    color: '#ffffff',
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: -20,
    bottom: -12,
    minWidth: 40,
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

export default ThreadRight;
