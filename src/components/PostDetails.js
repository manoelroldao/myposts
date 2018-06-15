import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom'
import { deletePost, selectedPost } from '../actions';
import Comments from './Comments'
import CreateComment from './CreateComment'
import Vote from './Vote'

class PostDetails extends Component {
    componentWillMount() {
        if (this.props.post.id === null)
            this.props.selectPost(this.props.match.params.post_id)
    }

    componentDidUpdate() {
        if (!this.props.post.id || this.props.post.id === null)
            this.props.history.push('/404')
    }

    render() {
        const { post, posts } = this.props
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
                <CreateComment />
                <Comments />
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

const mapStateToProps = (store) => {
    return {
        post: store.post,
        posts: store.posts
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(PostDetails));