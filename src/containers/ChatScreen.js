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
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import Thread from './Thread';
import Sender from './Sender';

function ChatScreen({channel, user}) {
  const [isLoading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [isActiveAttachment, setAttachment] = useState(false);
  const [activeAttachment] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isLoading) {
      firebase
        .database()
        .ref('channels')
        .child(channel.key)
        .limitToLast(50)
        .orderByChild('timestamp')
        .on('value', snapshot => {
          if (snapshot._value) {
            let messages = Object.keys(snapshot._value).map(key => {
              return {key, ...snapshot._value[key]};
            });

            messages = messages.sort((a, b) => b.timestamp - a.timestamp);
            setDataSource(messages);

            setTimeout(() => {
              setLoading(false);
            }, 500);
          }
        });
    }
  }, [channel, isLoading]);

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
        <Animated.View
          style={{
            ...styles.animatedView,
            transform: [{translateY: activeAttachment}],
          }}>
          <TouchableWithoutFeedback
            onPress={() => closeAttachment()}
            underlayColor="transparent">
            <View style={styles.thread}>
              {isLoading ? (
                <View style={styles.loading}>
                  <ActivityIndicator />
                </View>
              ) : (
                <FlatList
                  data={dataSource}
                  scrollToIndex={{viewPosition: 1}}
                  inverted
                  showsVerticalScrollIndicator={false}
                  automaticallyAdjustContentInsets={false}
                  contentContainerStyle={styles.threadList}
                  renderItem={({item}) => (
                    <Thread
                      key={item.key}
                      thread={item}
                      isMe={item.id === user.id}
                    />
                  )}
                  keyExtractor={item => item.key}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.sender}>
            <Sender
              isActiveAttachment={isActiveAttachment}
              openAttachment={openAttachment}
            />
          </View>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}

ChatScreen.navigationOptions = ({navigation}) => {
  return {
    title: navigation.state.params.channel,
    headerRight: () => (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('ScoreBoard')}>
        <Icon name="bar-chart-2" size={20} style={{marginRight: 20}} />
      </TouchableWithoutFeedback>
    ),
  };
};

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
  threadList: {
    paddingTop: -10,
    paddingBottom: 20,
  },
  sender: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  user: state.user,
  channel: state.channel.channel,
});

export default connect(mapStateToProps)(ChatScreen);
