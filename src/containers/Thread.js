import React, {useState, useEffect} from 'react';
import firebase from 'react-native-firebase';
import ThreadLeft from '../components/ThreadLeft';
import ThreadRight from '../components/ThreadRight';
import {user} from '../models/user';

function Thread({thread, isMe}) {
  const {
    key,
    avatar,
    content,
    firstname,
    lastname,
    love,
    timestamp,
    type,
    userid,
  } = thread;

  const [vote, setVote] = useState(0);

  useEffect(() => {
    firebase
      .database()
      .ref('channels')
      .child('practical-software-engineer')
      .child(key)
      .child('vote')
      .once('value', snapshot => {
        setVote(snapshot.numChildren());
      });
  });

  const onVote = () => {
    const voteRef = firebase
      .database()
      .ref('channels')
      .child('practical-software-engineer')
      .child(key)
      .child('vote');

    voteRef
      .orderByChild('id')
      .equalTo(user.id)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          voteRef.child(Object.keys(snapshot.val())[0]).remove();
        } else {
          voteRef.push({
            ...user,
          });
        }
      });
  };

  if (isMe) {
    return <ThreadRight content={content} vote={vote} onVote={onVote} />;
  } else {
    return (
      <ThreadLeft
        avatar={avatar}
        firstname={firstname}
        lastname={lastname}
        content={content}
        vote={vote}
        onVote={onVote}
      />
    );
  }
}

export default Thread;
