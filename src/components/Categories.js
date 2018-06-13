import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllCategories, fetchPostsByCategory } from '../actions'
import { withRouter, Link } from 'react-router-dom'

class Categories extends Component {
    state = {allCategories:[]}
    
    componentDidMount() {
        this.props.fetchData()
        if (this.props.match.params.category)
            this.props.selectCategory(this.props.match.params.category)        
    }
    
    render() {
        return (
            <div className="grid-categories">
                <div>                    
                    <Link to="/"><button onClick={() => this.props.fetchData()}>Todos posts</button></Link>                    
                </div>                               
                    {this.props.categories.map((categoria, index) => (                        
                        <Link to={`/${categoria.name}`}>
                            <button key={`categoria-${index}`} onClick={() => this.props.selectCategory(categoria.name)}>{categoria.name}</button>
                        </Link>
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