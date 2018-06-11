import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { deletePost } from '../actions';
import Vote from './Vote'


class PostDetails extends Component {    
    render() {
        const {post, posts} = this.props        
        return (            
            <div>
                <div className="grid-posts">
                    <p><h1>{post.title}</h1></p>
                    <p><b>Autor:</b> {post.author}</p>
                    <p><b>Criado em:</b> {new Date(post.timestamp).toLocaleDateString()}</p>
                    <p><b>Categoria:</b> {post.category}</p>
                    <p><b>Conteúdo:</b> {post.body}</p>
                    <p><b>Pontuação:</b> {post.voteScore}<Vote type="Post" data={post}/></p>
                </div>
                <Link to="/"><button>Voltar</button></Link>
                <Link to={
                    {
                        pathname: "/createpost",                        
                        state: { updatePost: true }
                    }
                }><button>Editar</button></Link>
                <Link to="/"><button onClick={() => this.props.remove(post, posts)}>Excluir</button></Link>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        remove: (post, posts) => dispatch(deletePost(post, posts))
    }
}

const mapStateToProps = (store) => ({
    post: store.post,
    posts: store.posts
    
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(PostDetails));