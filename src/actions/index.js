import * as MyPostsAPI from '../utils/MyPostsAPI';
import CreateComment from '../components/CreateComment';

// ********** Categorias ***********
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
// ********** Posts ***********
export const LOAD_POSTS = 'LOAD_POSTS'
export const SELECT_POST = 'SELECT_POST'
export const SORT_POSTS = 'SORT_POSTS'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const UPDATE_POST = 'UPDATE_POST'
/*export const VOTEINCREMENT_POST = 'VOTEINCREMENT_POST'
export const VOTEDECREMENT_POST = 'VOTEDECREMENT_POST'*/

// ********** Comentários ***********
export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
/*export const VOTEINCREMENT_COMMENT = 'VOTEINCREMENT_COMMENT'
export const VOTEDECREMENT_COMMENT = 'VOTEDECREMENT_COMMENT'*/

// *********** Actions creators ****************

// *********** Categorias ********************
function selectCategory(name, posts) {
    return {
        type: SELECT_CATEGORY,
        name,
        posts
    }
}
function loadCategories(categories) {
    return {
        type: LOAD_CATEGORIES,
        categories
    }
}

// *********** Posts ********************
function createPosts(posts) {
    return {
        type: ADD_POST,
        posts
    }
}
function updatePost(post, posts) {
    return {
        type: UPDATE_POST,
        post,
        posts
    }
}
function loadPosts(posts) {
    return {
        type: LOAD_POSTS,
        posts
    }
}
function sortPosts(posts) {
    return {
        type: SORT_POSTS,
        posts
    }
}
function selectPost(post) {
    return {
        type: SELECT_POST,
        post
    }
}
function removePost(posts) {
    return {
        type: REMOVE_POST,
        posts
    }
}

// *********** Comments *******************
function loadComments(comments) {
    return {
        type: LOAD_COMMENTS,
        comments
    }
}
function createComment(comments) {
    return {
        type: ADD_COMMENT,
        comments
    }
}
function removeComment(comments) {
    return {
        type: REMOVE_COMMENT,
        comments
    }
}
function updateComment(comments) {
    return {
        type: UPDATE_COMMENT,
        comments
    }
}
// ********* Thunks functions ***********


// ********** Categorias ***************
export function fetchAllCategories() {
    return (dispatch) => {
        MyPostsAPI.getAllCategories().then((categorias) => {
            dispatch(loadCategories(categorias))
        })
        MyPostsAPI.getAllPosts().then((posts) => {
            dispatch(loadPosts(posts.sort((a, b) => { return b.voteScore - a.voteScore })))

        })
    }
}

// ********** Posts ***************
export function fetchAllPosts() {
    return (dispatch) => {
        MyPostsAPI.getAllPosts().then((posts) => {
            dispatch(loadPosts(posts.sort((a, b) => { return b.voteScore - a.voteScore })))
        })
    }
}

export function fetchPostsByCategory(category) {
    return (dispatch) => {
        MyPostsAPI.getPostsByCategory(category).then((posts) => {
            dispatch(selectCategory(category, posts.sort((a, b) => { return b.voteScore - a.voteScore })))
        })
    }
}
export function sortAllPosts(info, posts) {
    return (dispatch) => {
        if (info == 'voteScore')
            dispatch(sortPosts(posts.sort((a, b) => { return b.voteScore - a.voteScore })))
        else
            dispatch(sortPosts(posts.sort((a, b) => { return a.timestamp - b.timestamp })))
    }
}
export function selectedPost(post) {
    return (dispatch) => {
        dispatch(selectPost(post[0]))
        MyPostsAPI.getCommentsByPost(post[0].id).then((comments) => {
            dispatch(loadComments(comments.sort((a, b) => { return b.voteScore - a.voteScore })))
        })
    }
}

export function addPost(post, posts) {
    return (dispatch) => {
        MyPostsAPI.createPost(post).then((postAdded) => {
            dispatch(createPosts(posts.concat(postAdded)))
        })
    }
}

export function updatePost(post, posts) {
    return (dispatch) => {
        MyPostsAPI.updatePost(post).then((postAdded) => {
            dispatch(updatePost(post, posts.filter(a => a.id != postAdded.id).concat(postAdded)))
        })
    }
}

export function deletePost(post, posts) {
    return (dispatch) => {
        MyPostsAPI.removePost(post).then((postRemoved) => {
            dispatch(removePost(posts.filter(a => a.id != postRemoved.id)))
        })
    }
}

// ********** Comments ***************
export function addComment(comment, comments) {
    return (dispatch) => {
        MyPostsAPI.createComment(comment).then((commentAdded) => {
            dispatch(createComment(comments.concat(commentAdded)))
        })
    }
}

export function deleteComment(comment, comments) {
    return (dispatch) => {
        MyPostsAPI.removeComment(comment).then((commentRemoved) => {
            dispatch(removeComment(comments.filter(a => a.id != commentRemoved.id)))
        })
    }
}

export function updateComment(comment, comments) {
    return (dispatch) => {
        MyPostsAPI.updateComment(comment).then((commentAdded) => {
            dispatch(updateComment(comments.filter(a => a.id != commentAdded.id).concat(commentAdded)))
        })
    }
}

export function vote(type, option, data, datas) {
    /*
        type => Post ou Comment
        option => "upVote" or "downVote"
        data => Comentário ou Post incrementado/decrementado
    */
    
    return (dispatch) => {
        MyPostsAPI.vote(type, data.id, option).then((dataUpdated) => {
            if (type == 'Post')
                dispatch(updatePost(data, datas.filter(a => a.id != dataUpdated.id).concat(dataUpdated)))
            else
                dispatch(updateComment(datas.filter(a => a.id != dataUpdated.id).concat(dataUpdated)))
        })
    }
}

/*export function fetchCommentsByPost(post) {
    return (dispatch) => {
        MyPostsAPI.getCommentsByPost(post.id).then((comments) => {
            dispatch(loadComments(comments.sort((a,b) => {return b.voteScore - a.voteScore})))
        })
    }
}*/