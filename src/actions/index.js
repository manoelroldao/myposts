import * as MyPostsAPI from '../utils/MyPostsAPI';

export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

// *********** Actions creators ****************

export function selectCategory(name, posts) {
    return {
        type: SELECT_CATEGORY,
        name,
        posts
    }
}

export function loadCategories(categories) {
    return {
        type: LOAD_CATEGORIES,
        categories
    }
}

export function loadPosts(posts) {
    return {
        type: LOAD_POSTS,
        posts
    }
}

// ********* Thunks functions ***********

export function fetchAllCategories() {    
    return (dispatch) => {
        MyPostsAPI.getAllCategories().then((categorias) => {
            dispatch(loadCategories(categorias))
        })
        MyPostsAPI.getAllPosts().then((posts) => {
            dispatch(loadPosts(posts))

        })
    }
}

export function fetchAllPosts() {
    return (dispatch) => {
        MyPostsAPI.getAllPosts().then((posts) => {
            dispatch(loadPosts(posts))

        })
    }
}

export function fetchPostsByCategory(category) {
    return (dispatch) => {
        MyPostsAPI.getPostsByCategory(category).then((posts) => {
            dispatch(selectCategory(category, posts))
        })
    }
}