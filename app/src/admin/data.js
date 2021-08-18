import {getToken} from './auth';
import restProvider from './rest';
import addUploadFeature from '../commons/upload';

export default getLocale => addUploadFeature(restProvider(getLocale, getToken));
