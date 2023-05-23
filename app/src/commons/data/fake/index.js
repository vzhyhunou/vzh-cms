import fakeData, {getResponse} from './rest';
import fakeAuth from './auth';
import pages from './pages';
import users from './users';

export {fakeData, getResponse, fakeAuth};

export default {
    data: fakeData({pages, users}, getResponse),
    auth: fakeAuth(users)
};
