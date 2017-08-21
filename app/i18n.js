// @flow
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';

import config from './config';
const whitelist: Array<string> = ['en', 'fr'];
const fallbackLng = 'en';
const DEFAULT_NAMESPACE = 'translation';
const backend = {
  loadPath: `${config.apiUrl}/localisations?lng={{lng}}&ns=${DEFAULT_NAMESPACE}`,
  allowMultiLoading: true,
  parse: (data: any): any => JSON.parse(data)
};

let i18nInstance;

export const getI18nInstance = () => {
  return i18nInstance;
};

export function initI18next(): Promise<any> {
  return new Promise((resolve: Function, reject: Function) => {
    i18nInstance = i18next
      .use(XHR)
      .init({
        lng: 'fr',
        whitelist,
        fallbackLng,
        backend
      }, (err: ?mixed) => {
        if (err) {
          if (err instanceof Error) {
            reject(err);
          } else {
            reject(new Error('Loading i18next failed'));
          }
        } else {
          resolve(i18next);
        }
      });
  })
  .catch((err: ?mixed) => {
    console.log('Error occured', err);
  });
};

initI18next();

export default i18nInstance;
