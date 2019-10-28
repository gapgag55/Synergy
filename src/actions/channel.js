export const SET_CHANNEL = '';

export const setChannelAction = channel => {
  return dispatch => {
    dispatch({
      type: SET_CHANNEL,
      channel,
    });
  };
};
