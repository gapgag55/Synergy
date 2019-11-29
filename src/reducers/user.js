import {SET_USER, SET_USER_LOGGOUT} from '../actions/user';

const initialState = {
  firstname: '',
  lastname: '',
  id: '',
  avatar: '',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        firstname: action.firstname,
        lastname: action.lastname,
        id: action.id,
        avatar: action.avatar,
      });
    case SET_USER_LOGGOUT:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}

export default userReducer;
