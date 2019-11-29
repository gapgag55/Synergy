export const SET_USER = 'SET_USER';
export const SET_USER_LOGGOUT = 'SET_USER_LOGGOUT';

export const setUserAction = user => {
  const name = user ? user.displayName.split(' ') : '';

  return dispatch => {
    dispatch({
      type: SET_USER,
      firstname: name[0],
      lastname: name[1],
      id: user.uid,
      avatar: user.photoURL,
    });
  };
};

export const logoutUserAction = () => {
  return dispatch => {
    dispatch({
      type: SET_USER_LOGGOUT,
    });
  };
};
