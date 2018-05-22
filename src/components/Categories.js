import React, { Component } from 'react';
import * as MyPostsAPI from '../utils/MyPostsAPI';

class Categories extends Component {

    state = {categorias: []}

    componentDidMount(){
        MyPostsAPI.getAllCategories().then((categorias) => {            
            this.setState({categorias})
        })
    }    

    render() {        
        return (
            <div className="grid-categories">
                Categorias
                <ol>
                    {this.state.categorias.map((categoria, index) => (                        
                        <li key={`categoria-${index}`}>{categoria.name}</li>                        
                    ))}
                </ol>
            </div>
        );
    }
}

export default Categories;