import {
    SELECT_CATEGORY,
    ADD_POST,
    REMOVE_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from '../actions'

const initialState = {
    categories: [],
    posts: [],
}

export default function reducer(state = initialState, action){
    switch (action.type){
        case 'SELECT_CATEGORY':
            return {}
        case 'ADD_POST':
            return {}
        case 'REMOVE_POST':
            return {}
        case 'ADD_COMMENT':
            return {}
        case 'REMOVE_COMMENT':
            return {}
        default:
            return state;
    }
}

