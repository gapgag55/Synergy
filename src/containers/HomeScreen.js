import React from 'react';
import {View, Button, StyleSheet, StatusBar} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Button
        onPress={() => navigation.navigate('ChatScreen')}
        title="Press me"
      />
    </View>
  );
}

HomeScreen.navigationOptions = ({navigation}) => ({
  title: 'Hello!',
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    height: '100%',
    justifyContent: 'center',
  },
});

export default HomeScreen;
