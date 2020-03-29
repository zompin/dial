import { Dispatch, ActionCreator } from 'redux';
import { browser } from 'webextension-polyfill-ts';
import { createAction } from 'redux-act';
import { ThunkAction } from 'redux-thunk';

export const profilesRequest = createAction('PROFILES_REQUEST');
export const profilesRequestSuccess = createAction<IProfile[]>('PROFILES_REQUEST_SUCCESS');
export const profilesRequestError = createAction<any>('PROFILES_REQUEST_ERROR');
export const profileAdd = createAction<IProfile>('PROFILE_ADD');
export const profileUpdate = createAction<IProfile>('PROFILE_UPDATE');
export const profileRemove = createAction<string>('PROFILE_REMOVE');
export const profileSet = createAction<string>('PROFILE_SET');

export const setProfile: ActionCreator<ThunkAction<any, any, any, any>> = (id: string) => (dispatch: Dispatch) => {
  browser.storage.local.set({ selectedProfile: id });
  dispatch(profileSet(id));
};
