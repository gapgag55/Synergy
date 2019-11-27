import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ThreadImageRight({content, vote, onVote}) {
  const {imageUrl} = content;

  const imageAnimated = new Animated.Value(0);

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
    }).start();
  };

  return (
    <View style={styles.thread}>
      <TouchableWithoutFeedback onPress={onVote}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.image}>
              <Animated.Image
                source={{uri: imageUrl}}
                style={[styles.image, {opacity: imageAnimated}]}
                onLoad={onImageLoad}
              />
            </View>
            {!!vote && (
              <View style={styles.voteContainer}>
                <Icon name="heart" size={10} color={'#ff0000'} />
                <Text style={styles.voteText}>{vote}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  thread: {
    alignItems: 'flex-end',
  },
  container: {
    flexDirection: 'row',
    maxWidth: '60%',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#dddddd',
  },
  name: {
    fontWeight: '500',
    marginBottom: 5,
  },
  contentContainer: {
    alignSelf: 'flex-start',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 15,
    position: 'relative',
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: -30,
    bottom: 0,
    backgroundColor: '#ffffff',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  voteText: {
    fontSize: 15,
    marginLeft: 2,
  },
});

export default ThreadImageRight;
