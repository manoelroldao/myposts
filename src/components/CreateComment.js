import React, { Component } from 'react'
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { uuidv4 } from '../utils/Uuid';
import { addComment } from '../actions';
//import {Route} from 'react-router-dom'

class CreateComment extends Component {
    constructor(props) {
        super(props);
        //this.state = { category: 'react' };
        //this.handleChange = this.handleChange.bind(this);
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

        this.props.createComment(myComment, this.props.comments) 
        e.target.value = ''       
    }   

    /*handleChange(event) {               
        //this.setState({ category: event.target.value })
    }*/

    render() {       
        return (
            <div>
                <h4>Comentar</h4>
                <form onSubmit={this.handleSubmit}>
                    <div>                        
                        <div><input type="text" name="author" placeholder="Autor" size="100" /></div>                        
                        <div><textarea cols="101" rows="10" name="body" placeholder="Conteúdo" /></div>
                        <div><button>comentar</button></div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createComment: (comment, comments) => dispatch(addComment(comment, comments))
    }
}

const mapStateToProps = store => (
    {
      //  categories:store.categories,
        comments:store.comments,
        post: store.post,
    }
)

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateComment));

