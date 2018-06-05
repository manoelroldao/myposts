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

// ********** Comentários ***********
export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

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
// ********* Thunks functions ***********


// ********** Categorias ***************
export function fetchAllCategories() {    
    return (dispatch) => {
        MyPostsAPI.getAllCategories().then((categorias) => {
            dispatch(loadCategories(categorias))
        })
        MyPostsAPI.getAllPosts().then((posts) => {
            dispatch(loadPosts(posts.sort((a,b)=>{return b.voteScore-a.voteScore})))

        })
    }
}

// ********** Posts ***************
export function fetchAllPosts() {
    return (dispatch) => {
        MyPostsAPI.getAllPosts().then((posts) => {
            dispatch(loadPosts(posts.sort((a,b)=>{return b.voteScore-a.voteScore})))
        })
    }
}

export function fetchPostsByCategory(category) {
    return (dispatch) => {
        MyPostsAPI.getPostsByCategory(category).then((posts) => {
            dispatch(selectCategory(category, posts.sort((a,b) => {return b.voteScore - a.voteScore})))
        })
    }
}
export function sortAllPosts(info, posts) {    
    return (dispatch) => {
        if (info == 'voteScore')
            dispatch(sortPosts(posts.sort((a,b)=>{return b.voteScore - a.voteScore})))
        else
            dispatch(sortPosts(posts.sort((a,b)=>{return a.timestamp - b.timestamp})))        
    }
}
export function selectedPost(post){    
    return (dispatch) =>{
        dispatch(selectPost(post[0]))        
        MyPostsAPI.getCommentsByPost(post[0].id).then((comments) => {
            dispatch(loadComments(comments.sort((a,b) => {return b.voteScore - a.voteScore})))            
        })
    }
}

export function addPost(post, posts){    
    return (dispatch) =>{       
        //console.log(post, posts) 
        MyPostsAPI.createPost(post).then((postAdded) => {
            dispatch(createPosts(posts.concat(postAdded)))            
        })
    }
}

// ********** Comments ***************
export function addComment(comment, comments){    
    return (dispatch) =>{       
        //console.log(comment, comments) 
        MyPostsAPI.createComment(comment).then((commentAdded) => {
            dispatch(createComment(comments.concat(commentAdded)))            
        })
    }
}

export function deleteComment(comment, comments){    
    return (dispatch) =>{       
        console.log(comment, comments) 
        MyPostsAPI.removeComment(comment).then((commentRemoved) => {
            dispatch(removeComment(comments.filter(a => a.id != commentRemoved.id)))            
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