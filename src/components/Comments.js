import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { deleteComment } from '../actions'
import Vote from './Vote'

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
                            <p> {comment.voteScore}<Vote type="Comment" data={comment}/></p>
                            <Link to={
                                {
                                    pathname: "/editcomment",
                                    state: { 
                                        updateComment: true,
                                        comment: comment
                                     }
                                }
                            }><button>Editar</button></Link>
                            <button key={`comment-${index}`} onClick={() => this.props.remove(comment, this.props.comments)}>Excluir</button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        remove: (comment, comments) => dispatch(deleteComment(comment, comments))
    }
}

const mapStateToProps = store => ({
    comments: store.comments
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Comments))