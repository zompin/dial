import { createReducer } from 'redux-act';
import { profilesRequest, profilesRequestSuccess, profilesRequestError, profileAdd, profileUpdate, profileRemove, profileSet } from '../Actions/profiles';

export interface IProfiles {
  isLoaded: boolean
  error: any
  data: IProfile[]
  current: string
}

const initState: IProfiles = {
  isLoaded: false,
  error: null,
  data: [],
  current: '',
};

export const profiles = createReducer<IProfiles>({}, initState)
  .on(profilesRequest, (state) => ({
    ...state,
  }))
  .on(profilesRequestSuccess, (state, data) => ({
    ...state,
    isLoaded: true,
    data,
  }))
  .on(profilesRequestError, (state, error) => ({
    ...state,
    error,
  }))
  .on(profileAdd, (state, profile) => ({
    ...state,
    data: [...state.data, profile],
  }))
  .on(profileUpdate, (state, { id, title }) => ({
    ...state,
    data: state.data.map((d) => {
      if (d.id === id) {
        return {
          ...d,
          title,
        };
      }

      return d;
    }),
  }))
  .on(profileRemove, (state, id: string) => ({
    ...state,
    data: state.data.filter((d) => d.id !== id),
  }))
  .on(profileSet, (state, id) => ({
    ...state,
    current: state.data.find((d) => d.id === id) ? id : state.data[0].id,
  }));
