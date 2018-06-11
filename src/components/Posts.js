import React, { Component } from 'react';
import { fetchAllPosts, sortAllPosts, selectedPost } from '../actions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = { sort: 'voteScore' };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {               
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        if (name === "selectChangeOrder") {
            this.setState({ sort: value })
            this.props.sortPosts(this.state.sort, this.props.posts)
        }
        else            
            this.props.selectPost(this.props.posts.filter((post) => (
                post.id == value
            )))
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
                    <Link to="/createpost">
                        <button>Novo post</button>
                    </Link>
                </div>
                <div className="grid-posts">
                    {this.props.posts.map((post, index) => (
                        <div key={`post-${index}`} className="posts">
                            <p><b>Título:</b> {post.title}</p>
                            <p><b>Criado em:</b> {new Date(post.timestamp).toLocaleDateString()}</p>
                            <p><b>Autor:</b> {post.author}</p>
                            <p><b>Pontuação:</b> {post.voteScore}</p>
                            <p><b>Comentários:</b> {post.commentCount}</p>
                            <Link to="/postdetails">
                                <button name={`btn-${index}`} value={post.id} onClick={this.handleChange} >Visualizar</button>
                            </Link>
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
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Posts));