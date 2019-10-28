import React, {useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import firebase from 'react-native-firebase';
import Thread from './Thread';
import Sender from './Sender';
import {user} from '../models/user';

function ChatScreen() {
  const [isLoading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [isActiveAttachment, setAttachment] = useState(false);
  const [activeAttachment] = useState(new Animated.Value(20));

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

  const openAttachment = () => {
    if (isActiveAttachment) {
      return closeAttachment();
    }

    setAttachment(true);

    Animated.timing(activeAttachment, {
      toValue: -90,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeAttachment = () => {
    if (isActiveAttachment) {
      setAttachment(false);

      return Animated.timing(activeAttachment, {
        toValue: 20,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>
        ) : (
          <Animated.View
            style={{
              transform: [{translateY: activeAttachment}],
            }}>
            <TouchableWithoutFeedback
              onPress={() => closeAttachment()}
              underlayColor="transparent">
              <View style={styles.thread}>
                <FlatList
                  style={styles.threadList}
                  data={dataSource}
                  scrollToIndex={{viewPosition: 1}}
                  inverted
                  showsVerticalScrollIndicator={false}
                  renderItem={({item, index}) => (
                    <Thread
                      key={item.key}
                      thread={item}
                      isMe={item.id === user.id}
                    />
                  )}
                  keyExtractor={item => item.key}
                />
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.sender}>
              <Sender
                isActiveAttachment={isActiveAttachment}
                openAttachment={openAttachment}
              />
            </View>
          </Animated.View>
        )}
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
    height: '80%',
  },
  threadList: {},
  sender: {},
});

export default ChatScreen;
