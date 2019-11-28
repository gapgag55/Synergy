import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

export default class ScoreBoard extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.head}>Score Board</Text>
        <View style={styles.viewStyleForLine} />
        <View style={styles.container}>
          <Image source={require('../images/best.png')} style={styles.image} />
          <View style={styles.postDetailsContainer}>
            <Text style={styles.name}> Chatter 1 </Text>
            <Text style={styles.score}> {''} Score: 555</Text>
          </View>
        </View>
        <View style={styles.container}>
          <Image
            source={require('../images/second.png')}
            style={styles.image}
          />
          <View style={styles.postDetailsContainer}>
            <Text style={styles.name}> Chatter 2 </Text>
            <Text style={styles.score}> {''} Score: 555</Text>
          </View>
        </View>
        <View style={styles.container}>
          <Image source={require('../images/third.png')} style={styles.image} />
          <View style={styles.postDetailsContainer}>
            <Text style={styles.name}> Chatter 3 </Text>
            <Text style={styles.score}> Score: 555</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyleForLine: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '80%',
    paddingBottom: 10,
  },

  head: {
    fontSize: 25,
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '25%',
  },
  postDetailsContainer: {
    flex: 1,
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
