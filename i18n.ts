import {getRequestConfig} from 'next-intl/server';
import {locales} from './app/i18n/settings';
 
export default getRequestConfig(async ({locale}) => {
  return {
    locale: locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});