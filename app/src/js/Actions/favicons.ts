import { createAction } from 'redux-act';

export const faviconsSuccess = createAction<Record<string, IFavicon>>('FAVICONS_SUCCESS');
