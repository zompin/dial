import { ACTIONS } from '../constants';

export const requestHistory = () => ({
  type: ACTIONS.HISTORY_REQUEST,
});

export const setHistory = history => ({
  type: ACTIONS.HISTORY_REQUEST_SUCCESS,
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
