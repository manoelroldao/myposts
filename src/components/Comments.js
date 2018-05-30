import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class Comments extends Component {    
    render() {        
        return (
            <div>
                <div>
                    <h3>Comentários</h3>
                </div>
                <div className="grid-posts" >
                    {this.props.comments.map((comment, index) => (
                        <div key={`comment-${index}`} className="posts">
                            <p> {comment.body}</p>
                            <p> {new Date(comment.timestamp).toLocaleDateString()}</p>
                            <p> {comment.author}</p>
                            <p> {comment.voteScore}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    comments: store.comments
})

export default withRouter(connect(
    mapStateToProps,
)(Comments))