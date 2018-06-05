import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { deleteComment } from '../actions'

class Comments extends Component {    
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {                              
        console.log(event.target.value)
        
    }    

    render() {        
        //const onRemoveComment = this.props.remove
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
                            <Link to="/"><button>Editar</button></Link>
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