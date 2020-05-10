import { createReducer } from 'redux-act';
import { faviconsSuccess } from '../Actions/favicons';

export interface IFavicons {
  data: Record<string, IFavicon>
  isLoaded: boolean
  error: any
}

const state: IFavicons = {
  data: {},
  isLoaded: false,
  error: null,
};

export const favicons = createReducer<IFavicons>({}, state)
  .on(faviconsSuccess, (state, data) => ({
    ...state,
    data,
    isLoaded: true,
  }));
