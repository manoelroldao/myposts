import React, { Component } from 'react';

const categorias = ['React', 'Reactive Native', 'Node', 'JavaScript', 'Heroku', 'CSS']

class Categories extends Component {
    render(){
        return (
            <div className="grid-categories">
                Categorias
                <ul>
                    {categorias.map((categoria) => (
                        <li>{categoria}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Categories;