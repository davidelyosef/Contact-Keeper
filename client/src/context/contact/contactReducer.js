import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTERS,
} from '../types';

export default (state, action) => {
    switch(action.payload) {
        case ADD_CONTACT:
            return {
                ...state
            }

        default: return state;
    }
}