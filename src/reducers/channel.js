import {SET_CHANNEL} from '../actions/channel';

const initialState = {
  channel: '',
};

function channelReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CHANNEL:
      return Object.assign({}, state, {channel: action.channel});
    default:
      return state;
  }
}

export default channelReducer;
