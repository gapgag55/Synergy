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
} from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Feather';
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
      toValue: -100,
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
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-200}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>
        ) : (
          <Animated.View
            style={{
              ...styles.animatedView,
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

ChatScreen.navigationOptions = ({navigation}) => ({
  title: 'Practical Software Engineering',
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('ScoreBoard')}>
      <Icon name="thumbs-up" size={20} style={{marginRight: 20}} />
    </TouchableWithoutFeedback>
  ),
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  animatedView: {
    marginBottom: 200,
    height: '100%',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  thread: {
    flex: 1,
  },
  threadList: {},
  sender: {
    flex: 1,
  },
});

export default ChatScreen;
