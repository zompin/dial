import { STORAGE_GET_SUCCESS, STORAGE_UPDATE_SUCCESS } from '../ActionTypes';

export const getStorageSuccess = storage => ({
  type: STORAGE_GET_SUCCESS,
  storage,
});

export const getStorage = () => (
  dispatch => (
    browser.storage.sync.get()
      .then(storage => dispatch(getStorageSuccess(storage)))
  )
);

export const updateStorageSuccess = () => ({
  type: STORAGE_UPDATE_SUCCESS,
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
