import React, { Component } from 'react'
import { vote } from '../actions'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class Vote extends Component {

    handleClick = (event) => {
        event.preventDefault()        
        let datas = (this.props.type === 'Post') ? this.props.posts : this.props.comments
        this.props.updateVote(this.props.type, event.target.value, this.props.data, datas)        
    }

    render() {
        return (
            <div>
                <button value='upVote' onClick={(e) => this.handleClick(e)}>+</button>
                <button value='downVote' onClick={(e) => this.handleClick(e)}>-</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateVote: (type, option, data, datas) => dispatch(vote(type, option, data, datas))
    }
}

const mapStateToProps = (store) => {
    return {
        posts: store.posts,
        comments: store.comments
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Vote))