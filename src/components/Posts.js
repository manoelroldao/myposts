import React, { Component } from 'react';
import { fetchAllPosts, sortAllPosts } from '../actions'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class Posts extends Component {    
    constructor(props) {
        super(props);
        this.state = {sort: 'voteScore'};
    
        this.handleChange = this.handleChange.bind(this);        
      }
    
    handleChange(event) {
        //this.setState(() => ({sort: event.target.value}))
        this.setState({sort: event.target.value})
        this.props.sortPosts(this.state.sort, this.props.posts)
    }
    
    render() {
        return (
            <div>
                <div>
                    Ordenação:
                    <select value={this.state.sort} id="sort" onChange={this.handleChange}> 
                        <option value="voteScore">Score</option>
                        <option value="timestamp">Criação</option>                    
                    </select>
                    <button>Novo post</button>
                </div>
                <div className="grid-posts">
                {this.props.posts.map((post, index) => (
                    <div key={`post-${index}`} className="posts">
                        <p><b>Título:</b> {post.title}</p>
                        <p><b>Criado em:</b> {new Date(post.timestamp).toLocaleDateString() }</p>
                        <p><b>Categoria:</b> {post.category}</p>
                        <p><b>Autor:</b> {post.author}</p>
                        <p><b>Pontuação:</b> {post.voteScore}</p>
                        <Link to="/postdetails">
                            <button id={`btn-${index}`}>Visualizar</button>
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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,   
)(Posts);