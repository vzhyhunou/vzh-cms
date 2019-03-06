import {IMG_CONTENT} from './actions';

const initialState = {};

export default (state = initialState, {type, payload}) => {
    if (type === IMG_CONTENT)
        return {...state, img: payload};
    delete state.img;
    return state;
};

export const getImage = state => state.cms.img;
export const getMessages = state => state.i18n.messages;
