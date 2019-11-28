import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux';

function ScoreBoard({channel}) {
  const [isLoading, setLoading] = useState(true);
  const [chatters, setChatter] = useState([]);

  useEffect(() => {
    if (isLoading) {
      firebase
        .database()
        .ref('channels')
        .child(channel.key)
        .on('value', snapshot => {
          if (snapshot._value) {
            let messages = Object.keys(snapshot._value).map(key => {
              if (snapshot._value[key].vote) {
                return {
                  id: snapshot._value[key].id,
                  firstname: snapshot._value[key].firstname,
                  lastname: snapshot._value[key].lastname,
                  vote: Object.keys(snapshot._value[key].vote).length,
                };
              }
            });

            messages = messages.filter(
              message => message != undefined && message.id,
            );

            // Get all chatters
            let uids = [];
            let chatters = [];

            messages.forEach(thread => {
              if (!uids.includes(thread.id)) {
                uids.push(thread.id);
                chatters.push({
                  firstname: thread.firstname,
                  lastname: thread.lastname,
                });
              }
            });

            // Count Score each chatter
            let scores = [];
            uids.forEach((uid, index) => {
              messages.forEach(thread => {
                if (uid === thread.id) {
                  if (scores[index]) {
                    scores[index] += parseInt(thread.vote);
                  } else {
                    scores[index] = parseInt(thread.vote);
                  }
                }
              });
            });

            chatters = chatters.map((chatter, index) => {
              return {
                ...chatter,
                vote: scores[index],
              };
            });

            // Sort score
            chatters = chatters.sort((a, b) => b.vote - a.vote);
            setChatter(chatters);
          }
        });

      setLoading(false);
    }
  }, [channel.key, isLoading]);

  let awards = [
    require('../images/best.png'),
    require('../images/second.png'),
    require('../images/third.png'),
  ];

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.boardContainer}>
        <View style={styles.viewStyleForLine}>
          <Text style={styles.head}>Score Board</Text>
        </View>
        {chatters.map((chatter, index) => {
          return (
            <View
              style={styles.item}
              key={chatter.firstname + ' ' + chatter.lastname}>
              <Image source={awards[index]} style={styles.image} />
              <View style={styles.postDetailsContainer}>
                <Text style={styles.name}>
                  {`${chatter.firstname} ${chatter.lastname}`}
                </Text>
                <Text style={styles.score}>{`Score: ${chatter.vote}`}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

ScoreBoard.navigationOptions = () => ({
  title: 'Score Board',
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  boardContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  viewStyleForLine: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
    paddingBottom: 10,
    marginBottom: 20,
  },
  head: {
    fontSize: 25,
    textAlign: 'center',
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 25,
    alignSelf: 'center',
    marginRight: 15,
    marginLeft: 15,
  },
  name: {
    fontSize: 18,
    fontFamily: 'roboto',
  },
  score: {
    fontSize: 12,
    fontFamily: 'roboto',
  },
});

const mapStateToProps = state => ({
  channel: state.channel.channel,
});

export default connect(mapStateToProps)(ScoreBoard);
