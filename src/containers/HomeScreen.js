import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import {setChannelAction} from '../actions/channel';

function createTitle(str) {
  return str.replace(/-/g, ' ').replace(/^./, function(x) {
    return x.toUpperCase();
  });
}

function HomeScreen({navigation, user, setChannel}) {
  const [isLoading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (isLoading) {
      firebase
        .database()
        .ref('channels')
        .on('value', snapshot => {
          if (snapshot._value) {
            let groups = Object.keys(snapshot._value).map(key => {
              return {key};
            });

            setDataSource(groups);
            setLoading(false);
          }
        });
    }
  }, [isLoading]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.padding}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('ProfileScreen')}>
          <View style={styles.profile}>
            <Image style={styles.avatar} source={{uri: user.avatar}} />
            <Text style={styles.displayName}>{`${user.firstname} ${
              user.lastname
            }`}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.groups}>
        <View style={styles.header}>
          <Text style={styles.heading}>Groups</Text>
          <View style={styles.headingRight}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('GroupScreen')}>
              <Icon name="plus" size={25} />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View>
          {isLoading ? (
            <ActivityIndicator style={{marginTop: 20}} />
          ) : (
            <FlatList
              style={styles.groupContainer}
              data={dataSource}
              scrollToIndex={{viewPosition: 1}}
              inverted
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setChannel({
                      key: item.key,
                      name: createTitle(item.key),
                    });
                    navigation.navigate('ChatScreen', {
                      channel: createTitle(item.key),
                    });
                  }}>
                  <View style={styles.groupItem}>
                    <Text style={styles.groupTitle}>
                      {createTitle(item.key)}
                    </Text>
                    <Icon name="chevron-right" size={25} />
                  </View>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={item => item.key}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    height: '100%',
  },
  padding: {
    padding: 20,
  },
  profile: {
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginVertical: 20,
    shadowColor: '#dddddd',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 20,
  },
  displayName: {
    fontSize: 20,
  },
  groups: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#dddddd',
    paddingVertical: 10,
  },
  heading: {
    fontSize: 30,
  },
  headingRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupContainer: {
    paddingVertical: 10,
  },
  groupTitle: {
    fontSize: 20,
  },
  groupItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  setChannel: channel => dispatch(setChannelAction(channel)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
