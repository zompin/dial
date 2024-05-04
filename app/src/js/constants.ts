// @ts-ignore
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const IS_CHROME = process.env.VENDOR === 'chrome';

export const NAMES = {
  ROOT_FOLDER: IS_CHROME ? '2' : 'unfiled_____',
  APP_FOLDER: IS_DEVELOPMENT ? 'Rokot Dial Dev' : 'Rokot Dial',
  PROFILES_DEFAULT: 'Default',
};
