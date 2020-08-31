import {getToken} from './auth';
import restProvider from './rest';
import addUploadFeature from './upload';

export default getLocale => addUploadFeature(restProvider(getLocale, getToken));
