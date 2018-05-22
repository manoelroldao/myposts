import React, { Component } from 'react';
import * as MyPostsAPI from '../utils/MyPostsAPI'

/*const posts = [
    {
        titulo: 'Aprendendo React',
        autor: 'Fulano de tal',
        data_criacao: '05-05-2018',
        vote_score: 5
    },
    {
        titulo: 'React passo a passo',
        autor: 'Beltrano de tal',
        data_criacao: '10-05-2018',
        vote_score: 4
    },
    {
        titulo: 'Ninja React',
        autor: 'Beltrano de tal',
        data_criacao: '07-05-2018',
        vote_score: 7
    }
]*/

class Posts extends Component {
    state = {posts: []}    

    componentDidMount(){
        MyPostsAPI.getAllPosts().then((posts) => {
            this.setState({posts})
        })        
    }   
        
    render() {
        console.log(this.state.posts)
        return (
            <div className="grid-posts">            
                {this.state.posts.map((post, index) => (
                    <div key={`post-${index}`} className="posts">
                        <p><b>Título:</b> {post.title}</p>
                        <p><b>Autor:</b> {post.author}</p>                        
                        <p><b>Pontuação:</b> {post.voteScore}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Posts;