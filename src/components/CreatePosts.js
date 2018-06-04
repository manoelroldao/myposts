import React, { Component } from 'react'
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { uuidv4 } from '../utils/Uuid';
import { addPost } from '../actions'
//import {Route} from 'react-router-dom'

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = { category: 'react' };

        this.handleChange = this.handleChange.bind(this);
    }
    
    handleSubmit = (e) => {
        e.preventDefault()        
        const values = serializeForm(e.target, { hash: true })
        let myPost = {
            id: uuidv4(),
            timestamp:Date.now(),
            ...values
        }

        console.log(myPost)
        this.props.createPost(myPost, this.props.posts)
        this.props.history.push('/')
        /*if (this.props.onCreatePost)
            this.props.onCreatePost(values)*/        
    }   

    handleChange(event) {               
        this.setState({ category: event.target.value })
    }

    render() {        
        return (
            <div>
                <h3>Novo post</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div><input type="text" name="title" placeholder="Título" size="100" /></div>
                        <div>                            
                            <select name="category" value={this.state.category} style={{marginBottom: '5px'}} onChange={this.handleChange}>
                                {this.props.categories.map((category, index) => (
                                    <option key={`category-${index}`} value={category.name}>{category.name}</option>                                    
                                ))}                                
                            </select>
                        </div>
                        <div><input type="text" name="author" placeholder="Autor" size="100" /></div>                        
                        <div><textarea cols="101" rows="15" name="body" placeholder="Conteúdo" /></div>
                        <div><button>Adicionar</button></div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (post, posts) => dispatch(addPost(post, posts))
    }
}

const mapStateToProps = store => (
    {
        categories:store.categories,
        posts:store.posts,
    }
)

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreatePost));

