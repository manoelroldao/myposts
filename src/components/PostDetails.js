import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class PostDetails extends Component {    
    render() {
        const {post} = this.props        
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
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    post: store.post
})

export default withRouter(connect(
    mapStateToProps,
)(PostDetails));