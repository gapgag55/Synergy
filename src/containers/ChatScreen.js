import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import firebase from 'react-native-firebase';
import Thread from './Thread';
import Sender from './Sender';

function ChatScreen() {
  const [isLoading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [isActiveAttachment, setAttachment] = useState(false);
  const [activeAttachment] = useState(new Animated.Value(0));

  const user = firebase.auth().currentUser;

  useEffect(() => {
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

      setLoading(false);
    }
  }, [isLoading]);

  const openAttachment = () => {
    if (isActiveAttachment) {
      return closeAttachment();
    }

    setAttachment(true);

    Animated.timing(activeAttachment, {
      toValue: -110,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeAttachment = () => {
    if (isActiveAttachment) {
      setAttachment(false);

      return Animated.timing(activeAttachment, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={80}>
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
                  renderItem={({item}) => (
                    <Thread
                      key={item.key}
                      thread={item}
                      isMe={item.id === user.uid}
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
    </KeyboardAvoidingView>
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
    height: Platform.OS === 'ios' ? '85%' : '80%',
  },
  threadList: {},
  sender: {
    height: Platform.OS === 'ios' ? '15%' : '20%',
  },
});

export default ChatScreen;
