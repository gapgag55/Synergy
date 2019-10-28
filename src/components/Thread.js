import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

function Thread({thread, isMe}) {
  const {
    avatar,
    content,
    firstname,
    lastname,
    love,
    timestamp,
    type,
    userid,
  } = thread;

  return (
    <View style={styles.container}>
      <View style={styles.textLeft}>
        <Image style={styles.avatar} source={{uri: avatar}} />
        <View style={styles.contentTextLeft}>
          <Text style={styles.name}>{`${firstname} ${lastname}`}</Text>
          <View style={styles.text}>
            <Text>{content}</Text>
          </View>
        </View>
      </View>
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
  },
});

export default Thread;
