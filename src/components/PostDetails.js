import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { deletePost, selectedPost } from '../actions';
import Vote from './Vote'



class PostDetails extends Component {    
    //state = {post:{}}

    componentDidMount(){        
        if (this.props.post.id === null)                            
            this.props.selectPost(this.props.match.params.post_id)
            //this.setState({post: this.props.post})        
    }
    
    render() {        
        //const post = this.state.post
        const {post, posts} = this.props        
        return (            
            <div>
                <div className="grid-posts">
                    <p><h1>{post.title}</h1></p>
                    <p><b>Autor:</b> {post.author}</p>
                    <p><b>Criado em:</b> {new Date(post.timestamp).toLocaleDateString()}</p>
                    <p><b>Categoria:</b> {post.category}</p>
                    <p><b>Conteúdo:</b> {post.body}</p>
                    <p><b>Pontuação:</b> {post.voteScore}</p>
                </div>
                <Link to="/"><button>Voltar</button></Link>
                <Link to={
                    {
                        pathname: "/posts/add",                        
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
        remove: (post, posts) => dispatch(deletePost(post, posts)),
        selectPost: (post_id) => dispatch(selectedPost(post_id)),
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