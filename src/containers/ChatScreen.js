import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
} from 'react-native';
import firebase from 'react-native-firebase';
import Thread from './Thread';
import Sender from './Sender';
import {user} from '../models/user';

function ChatScreen() {
  const [isLoading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  if (isLoading) {
    firebase
      .database()
      .ref('channels')
      .child('practical-software-engineer')
      .limitToLast(20)
      .orderByChild('timestamp')
      .on('value', snapshot => {
        if (snapshot._value) {
          let messages = Object.keys(snapshot._value).map(key => {
            return {key, ...snapshot._value[key]};
          });

          messages = messages.sort((a, b) => b.timestamp - a.timestamp);
          setDataSource(messages);
        }
      });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={styles.thread}>
            <FlatList
              style={styles.threadList}
              data={dataSource}
              scrollToIndex={{viewPosition: 1}}
              inverted
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <Thread
                  key={item.key}
                  thread={item}
                  isMe={item.id === user.id}
                />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        )}
        <View style={styles.sender}>
          <Sender />
        </View>
      </View>
    </View>
  );
}

ChatScreen.navigationOptions = () => ({
  title: 'Practical Software Engineering',
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    height: '100%',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  thread: {
    height: '85%',
  },
  threadList: {
    paddingTop: 20,
  },
  sender: {},
});

export default ChatScreen;
