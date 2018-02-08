import React from 'react';
import {api} from '../utils/api';
export default class TopRepos extends React.Component {

    constructor(props) {
        super(props);
        this._unmount = false;
        this.state = {
            selectedLanguage: 'java',
            repos: null
        }
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        api.fetchPopularRepos(this.state.selectedLanguage)
        .then((repos) => {
            console.log(repos);
            if(!this._unmount)
           this.setState({repos: repos});
            
        })
    }
    componentWillUnmount() {
        this._unmount = true;
    }
    updateLanguage(lang) {
        this.setState ( {selectedLanguage: lang  } );
    }

    render() {
        return !this.state.repos ?<h1>Loading ... </h1>:<div className="container"><div className="card-columns ">{ this.detail(this.state.repos) }</div></div>
    }

    detail(repos) {
        return repos.map( (repo,index) => {
            return this.display(repo,index);
        });
    }
    
    display({name,html_url,description,owner},index) {
        return (
            <div className="card" style={{width:'300'}} key={index}>
            <img className="card-img-top" src={owner.avatar_url} />
            <div className="card-body">
                <h4 className="card-title">{name}</h4>
                <p className="card-text">{ description?description.substring(0,30):'' + ' ...'}</p>
                <a href={html_url} className="btn btn-primary">Link</a>
            </div>
            </div>
        );
    }
}