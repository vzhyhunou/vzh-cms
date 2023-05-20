import dataRestProvider from './rest';
import dataAuthProvider from './auth';
import pages from './pages';
import users from './users';

export * from './rest';

export {dataRestProvider, dataAuthProvider};

export default {
    pages,
    users
};
