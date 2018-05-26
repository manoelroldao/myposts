import {
    LOAD_CATEGORIES,
    SELECT_CATEGORY,
    ADD_POST,
    REMOVE_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from '../actions'
import { combineReducers } from 'redux';

const initialState = {
    selectedCategory: null,
    categories: [],
    posts: [],
    comments: []
    /*categories: [
        {
            name: null, //'react',
            path: null, //'react',
        }],
    posts: [
        {
            id: null, //'8xf0y6ziyjabvozdd253nd',
            timestamp: null, //1467166872634,
            title: null, //'Udacity is the best place to learn React',
            body: null, //'Everyone says so after all.',
            author: null, //'thingtwo',
            category: null, //'react',
            voteScore: null, //6,
            deleted: null, //false,
            commentCount: null //2
        }],
    comments: [
        {
            id: null, //'894tuq4ut84ut8v4t8wun89g',
            parentId: null, //"8xf0y6ziyjabvozdd253nd",
            timestamp: null, //1468166872634,
            body: null, //'Hi there! I am a COMMENT.',
            author: null, //'thingtwo',
            voteScore: null, //6,
            deleted: null, //false,
            parentDeleted: null, //false
        }],*/
}

function categories(state = initialState.categories, action) {
    //console.log(action.categories)
    switch (action.type) {
        case 'LOAD_CATEGORIES':
            return [                
                ...action.categories // não é ideal, usar o concat é uma melhor solução
            ]
        case 'SELECT_CATEGORY':
            return [
                ...state.filter((cat) => (cat.name == action.name))
            ]
        default:
            return state;
    }
}

function posts(state = initialState.posts, action) {
    switch (action.type) {
        case 'LOAD_POSTS':
            return [                
                ...action.posts // não é ideal, usar o concat é uma melhor solução
            ]
        case 'ADD_POST':
            return []
        case 'REMOVE_POST':
            return []
        case 'SELECT_CATEGORY':
            return [
                
                ...action.posts
            ]
        default:
            return state;
    }
}

function comments(state = initialState.comments, action) {
    switch (action.type) {
        case 'ADD_COMMENT':
            return []
        case 'REMOVE_COMMENT':
            return []
        default:
            return state;
    }
}

export default combineReducers({
    categories,
    posts,
    comments,
});