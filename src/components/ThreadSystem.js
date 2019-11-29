import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function ThreadSystem({content}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  text: {
    color: '#d9d9d9',
    textAlign: 'center',
  },
});

export default ThreadSystem;
