import React, {useState, useEffect} from 'react';
import firebase from 'react-native-firebase';
import {View, Text, Image, TouchableHighlight, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import User from '../models/user';

function Thread({thread, isMe}) {
  const {
    key,
    avatar,
    content,
    firstname,
    lastname,
    love,
    timestamp,
    type,
    userid,
  } = thread;

  const [vote, setVote] = useState(0);

  useEffect(() => {
    const voteRef = firebase
      .database()
      .ref('channels')
      .child('practical-software-engineer')
      .child(key)
      .child('vote')
      .once('value', snapshot => {
        setVote(snapshot.numChildren());
      });
  });

  const onVote = () => {
    const voteRef = firebase
      .database()
      .ref('channels')
      .child('practical-software-engineer')
      .child(key)
      .child('vote');

    voteRef
      .orderByChild('id')
      .equalTo(User.id)
      .once('value', snapshot => {
        if (!snapshot.exists()) {
          voteRef.push({
            ...User,
          });
        }
      });
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={onVote} underlayColor="transprent">
        <View style={styles.textLeft}>
          <Image style={styles.avatar} source={{uri: avatar}} />
          <View style={styles.contentTextLeft}>
            <Text style={styles.name}>{`${firstname} ${lastname}`}</Text>
            <View style={styles.text}>
              <Text>{content}</Text>
              {!!vote && (
                <View style={styles.voteLeft}>
                  <Icon name="heart" size={10} color={'#ff0000'} />
                  <Text style={styles.voteText}>{vote}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  textLeft: {
    flexDirection: 'row',
    maxWidth: '60%',
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10,
  },
  contentTextLeft: {
    // backgroundColor: '#dddddd',
  },
  name: {
    fontWeight: '500',
    marginBottom: 5,
  },
  text: {
    backgroundColor: '#dddddd',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 15,
    position: 'relative',
  },
  voteLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: -20,
    bottom: -12,
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

export default Thread;
