import React, {Component} from 'react'
import {vote} from '../actions'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class Vote extends Component{
        
    changeVote(option){
        let datas = (this.props.type === 'Post') ? this.props.posts : this.props.comments
        this.props.updateVote(this.props.type, option, this.props.data, datas)        
    }
    
    render(){
        return(
            <div>
                <button onClick={() => {this.changeVote('upVote')}}>+</button>
                <button onClick={() => {this.changeVote('downVote')}}>-</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        updateVote: (type, option, data, datas) => dispatch(vote(type, option, data, datas))
    }
}

const mapStateToProps = (store) =>{
    return{
        posts: store.posts,
        comments: store.comments
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,    
)(Vote))