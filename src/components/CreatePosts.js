import React, { Component } from 'react'
import serializeForm from 'form-serialize';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { uuidv4 } from '../utils/Uuid';
import { addPost, updatePost } from '../actions'

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            category: 'react', 
            postTitle:'',
            post: (this.props.location.state) ? this.props.location.state.post : {},           
            updatePost: (this.props.location.state) ? this.props.location.state.updatePost : ""
        };        
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

        if (this.state.updatePost){
            myPost.id = this.props.post.id
            myPost.timestamp = this.props.post.timestamp
            this.props.update(myPost, this.props.posts)
        }
        else        
            this.props.createPost(myPost, this.props.posts)
        
        this.props.history.push('/')
    }   

    handleChange(event) {               
        this.setState({ category: event.target.value })
    }
    
    componentWillMount(){
        let post = (this.state.post && this.state.updatePost) ? this.state.post : this.props.post

        this.postTitle = this.state.updatePost ? post.title : ""       
        this.postCategory = this.state.updatePost ? post.category : this.state.category
        this.postAuthor =  this.state.updatePost ? post.author : ""
        this.postBody = this.state.updatePost ? post.body : ""
    }

    render() {                                                                        
        return (
            <div>
                <h3>Post</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div><input type="text" name="title" placeholder="Título" size="100" defaultValue={this.postTitle}/></div>
                        <div>                            
                            <select name="category" value={this.state.category} style={{marginBottom: '5px'}} onChange={this.handleChange}>
                                {this.props.categories.map((category, index) => (
                                    <option key={`category-${index}`} value={category.name}>{category.name}</option>                                    
                                ))}                                
                            </select>
                        </div>
                        <div><input type="text" name="author" placeholder="Autor" size="100" defaultValue={this.postAuthor}/></div>                        
                        <div><textarea cols="101" rows="15" name="body" placeholder="Conteúdo" defaultValue={this.postBody}/></div>
                        <div><button>{this.state.updatePost ? "Salvar" : "Adicionar"}</button></div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {    
    return {
        createPost: (post, posts) => dispatch(addPost(post, posts)),
        update: (post, posts) => dispatch(updatePost(post, posts))
    }
}

const mapStateToProps = store => {        
    return {
        categories:store.categories,
        posts:store.posts,
        post:store.post,
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreatePost));