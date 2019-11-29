import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';

export default class Index extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/images/4c68fb90-8c18-4a35-a967-2324038b40d2_200x200.png')}
          resizeMode="contain"
          style={styles.synergyLogo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 403,
    height: 829,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  synergyLogo: {
    width: 258,
    height: 258,
    marginTop: 277,
    marginLeft: 73,
  },
});
