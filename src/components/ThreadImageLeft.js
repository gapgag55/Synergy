import React from 'react';
import {View, Text, Image, TouchableHighlight, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ThreadImageLeft({
  avatar,
  firstname,
  lastname,
  content,
  timestamp,
  vote,
  onVote,
}) {
  const {imageUrl} = content;

  return (
    <View style={styles.thread}>
      <TouchableHighlight onPress={onVote} underlayColor="transparent">
        <View style={styles.container}>
          <Image style={styles.avatar} source={{uri: avatar}} />
          <View>
            <Text style={styles.name}>{`${firstname} ${lastname}`}</Text>
            <View style={styles.contentContainer}>
              <Image style={styles.image} source={{uri: imageUrl}} />
              {!!vote && (
                <View style={styles.voteContainer}>
                  <Icon name="heart" size={10} color={'#ff0000'} />
                  <Text style={styles.voteText}>{vote}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableHighlight>
      <Text style={styles.time}>{timestamp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  thread: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  container: {
    flexDirection: 'row',
    maxWidth: '80%',
    paddingVertical: 5,
    paddingHorizontal: 5,
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
    alignSelf: 'flex-start',
    paddingVertical: 5,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 15,
    position: 'relative',
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: -5,
    bottom: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 5,
    minWidth: 20,
    borderRadius: 10,
  },
  voteText: {
    fontSize: 10,
    marginLeft: 2,
  },
  time: {
    fontSize: 10,
    color: '#999999',
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default ThreadImageLeft;
