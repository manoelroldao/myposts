import React, { Component } from 'react';
import { fetchAllPosts, sortAllPosts, selectedPost, deletePost } from '../actions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import Vote from './Vote'

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = { sort: 'voteScore'};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (name === "selectChangeOrder") {
            this.setState({ sort: value })
            this.props.sortPosts(value, this.props.posts)
        }
        else
            this.props.selectPost(value)
    }   

    render() {
        return (
            <div>
                <div>
                    Ordenação:
                    <select name="selectChangeOrder" value={this.state.sort} id="sort" onChange={this.handleChange}>
                        <option value="voteScore">Score</option>
                        <option value="timestamp">Criação</option>
                    </select>
                    <Link to="/posts/add">
                        <button>Novo post</button>
                    </Link>
                </div>
                <div className="grid-posts">
                    {this.props.posts.map((post, index) => (
                        <div key={`post-${index}`} className="posts">
                            <p><b>Título:</b> {post.title}</p>
                            <p><b>Categoria:</b> {post.category}</p>
                            <p><b>Criado em:</b> {new Date(post.timestamp).toLocaleDateString()}</p>
                            <p><b>Autor:</b> {post.author}</p>
                            <p><b>Comentários:</b> {post.commentCount}</p>
                            <p><b>Pontuação:</b> {post.voteScore}<Vote type="Post" data={post}/></p>                            
                            <Link to={`/${post.category}/${post.id}`}>
                                <button name={`btn-${index}`} value={post.id} onClick={this.handleChange} >Visualizar</button>
                            </Link>
                            <Link to={
                                {
                                    pathname: "/posts/add",
                                    state: { updatePost: true }
                                }
                            }><button name={`btn-2${index}`} value={post.id} onClick={this.handleChange}>Editar</button></Link>
                            <Link to="/"><button onClick={() => this.props.remove(post, this.props.posts)}>Excluir</button></Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    posts: store.posts
})

const mapDispatchToProps = (dispatch) => {
    return {
        sortPosts: (info, posts) => dispatch(sortAllPosts(info, posts)),
        selectPost: (post) => dispatch(selectedPost(post)),
        remove: (post, posts) => dispatch(deletePost(post, posts)),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Posts));