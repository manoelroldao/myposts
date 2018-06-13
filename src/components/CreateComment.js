import React, { Component } from 'react'
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { uuidv4 } from '../utils/Uuid';
import { addComment, updateComment } from '../actions';

class CreateComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateComment: (this.props.location.state) ? this.props.location.state.updateComment : false,
            comment: (this.props.location.state) ? this.props.location.state.comment : ""
        }
    }

    handleChange = (e) => {
        
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        let myComment = {
            id: uuidv4(),
            parentId: this.props.post.id,
            timestamp: Date.now(),
            ...values
        }

        if (this.state.updateComment){
            myComment.id = this.state.comment.id
            myComment.timestamp = this.state.comment.timestamp
            this.props.update(myComment, this.props.comments)
            this.props.history.goBack()
        }
        else{
            this.props.createComment(myComment, this.props.comments)
            e.target.value = ''
        }
    }

    componentWillMount(){
        this.commentAuthor =  this.state.comment ? this.state.comment.author : ""
        this.commentBody = this.state.comment ? this.state.comment.body : ""
    }

    render() {
        return (
            <div>
                <h4>Comentar</h4>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div><input type="text" name="author" placeholder="Autor" defaultValue={this.commentAuthor} size="100" /></div>
                        <div><textarea cols="101" rows="10" name="body" placeholder="Conteúdo" defaultValue={this.commentBody} /></div>
                        <div><button>comentar</button></div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createComment: (comment, comments) => dispatch(addComment(comment, comments)),
        update: (comment, comments) => dispatch(updateComment(comment, comments))
    }
}

const mapStateToProps = store => (
    {
        comments: store.comments,
        post: store.post,
    }
)

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateComment));