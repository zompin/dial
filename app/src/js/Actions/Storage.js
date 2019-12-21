import { ACTIONS } from '../constants';

export const getStorageSuccess = storage => ({
  type: ACTIONS.STORAGE_GET_SUCCESS,
  storage,
});

export const getStorage = () => (
  dispatch => (
    browser.storage.sync.get()
      .then(storage => dispatch(getStorageSuccess(storage)))
  )
);

export const updateStorageSuccess = () => ({
  type: ACTIONS.STORAGE_UPDATE_SUCCESS,
});

export const updateStorage = data => (
  dispatch => (
    browser.storage.sync.set({ data })
      .then(() => {
        dispatch(updateStorageSuccess());
        dispatch(getStorage());
      })
  )
);
