import React, { Component } from 'react';

const posts = [
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
]

class Posts extends Component {
    render() {
        return (
            <div className="grid-posts">
                {posts.map((post) => (
                    <div className="posts">
                        <p>Título: {post.titulo}</p>
                        <p>Autor: {post.autor}</p>
                        <p>Criado em: {post.data_criacao}</p>
                        <p>Pontuação: {post.vote_score}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Posts;

