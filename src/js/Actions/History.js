import { HISTORY_REQUEST_GET, HISTORY_REQUEST_SUCCESS } from '../ActionTypes';

export const requestHistory = () => ({
  type: HISTORY_REQUEST_GET,
});

export const setHistory = history => ({
  type: HISTORY_REQUEST_SUCCESS,
  history,
});

export const getHistory = value => (
  (dispatch) => {
    dispatch(requestHistory());

    browser.history.search({
      text: value,
      maxResults: 10,
    })
      .then(history => dispatch(setHistory(history)));
  }
);
