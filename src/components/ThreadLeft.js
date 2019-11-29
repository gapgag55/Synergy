import React from 'react';
import {View, Text, TouchableHighlight, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ThreadLeft({
  avatar,
  firstname,
  lastname,
  content,
  timestamp,
  vote,
  onVote,
}) {
  return (
    <View>
      <TouchableHighlight onPress={onVote} underlayColor="transparent">
        <View style={styles.container}>
          <Image style={styles.avatar} source={{uri: avatar}} />
          <View>
            <Text style={styles.name}>{`${firstname} ${lastname}`}</Text>
            <View style={styles.content}>
              <View style={styles.contentContainer}>
                <Text style={styles.text}>{content}</Text>
                {!!vote && (
                  <View style={styles.voteContainer}>
                    <Icon name="heart" size={10} color={'#ff0000'} />
                    <Text style={styles.voteText}>{vote}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.time}>{timestamp}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 5,
    maxWidth: '60%',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10,
  },
  name: {
    fontWeight: '500',
    marginBottom: 5,
  },
  contentContainer: {
    backgroundColor: '#dddddd',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 15,
    position: 'relative',
  },
  time: {
    fontSize: 10,
    color: '#999999',
    marginBottom: 5,
    marginLeft: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 16,
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: -5,
    bottom: -5,
    backgroundColor: '#ffffff',
    paddingHorizontal: 5,
    minWidth: 20,
    borderRadius: 10,
  },
  voteText: {
    fontSize: 10,
    marginLeft: 2,
  },
});

export default ThreadLeft;
