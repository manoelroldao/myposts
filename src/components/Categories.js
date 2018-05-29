import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllCategories, fetchPostsByCategory } from '../actions'
import { withRouter } from 'react-router-dom'

class Categories extends Component {
    componentDidMount() {
        this.props.fetchData()
    }
    
    render() {
        return (
            <div className="grid-categories">
                <div>                    
                    <button onClick={() => this.props.fetchData()}>Categorias</button>                    
                </div>                               
                    {this.props.categories.map((categoria, index) => (
                        //<li key={`categoria-${index}`} onClick={() => this.props.selectCategory(categoria.name)}>{categoria.name}</li>
                        <button key={`categoria-${index}`} onClick={() => this.props.selectCategory(categoria.name)}>{categoria.name}</button>
                    ))}
                
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchAllCategories()),
        selectCategory: (category) => dispatch(fetchPostsByCategory(category))
    };
};

const mapStateToProps = store => ({
    categories: store.categories
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Categories));