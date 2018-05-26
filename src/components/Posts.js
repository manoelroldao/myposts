import React, { Component } from 'react';
import { fetchAllPosts } from '../actions'
import { connect } from 'react-redux';

class Posts extends Component {
    /*componentDidMount() {
        this.props.fetchData()
    }*/

    render() {
        return (
            <div className="grid-posts">
                {this.props.posts.map((post, index) => (
                    <div key={`post-${index}`} className="posts">
                        <p><b>Título:</b> {post.title}</p>
                        <p><b>Categoria:</b> {post.category}</p>
                        <p><b>Autor:</b> {post.author}</p>
                        <p><b>Pontuação:</b> {post.voteScore}</p>
                    </div>
                ))}
            </div>
        );
    }
}

/*const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchAllPosts())
    }
}*/

const mapStateToProps = store => ({
    posts: store.posts
})

export default connect(
    mapStateToProps,
   // mapDispatchToProps,
)(Posts);