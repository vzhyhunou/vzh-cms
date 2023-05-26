import data, {getResponse} from './rest';
import auth from './auth';
import pages from './pages';
import users from './users';

export {data, getResponse, auth};

export default {
    data: data({pages, users}, getResponse),
    auth: auth(users)
};
