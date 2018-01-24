import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {
  
  /* Constructor to initialise state */
  constructor() {
    /* Super allows up to use this inside the constructor within the context of the App class
      rather than the parent component class we're extending from react */
    super();
    this.state = {
      gifs: [], 
      loading: true
    };
  } 

  /* Is called immeaditely after a component is added to the DOM so if you need to lead external data
    right when a compoent is mounted to the DOM this is the place to create the request */
  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = 'cats') => {
    /* using fetch */
    /*
    fetch('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
      .then(response => response.json())
      .then(responseData => {
        this.setState({ gifs: responseData.data });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      }); */
    /* no need for first then callback because axios auto returns response in json format */
    /* https://github.com/axios/axios */

    axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=dc6zaTOxFJmzC`)
      .then(response => {
        this.setState({
          gifs: response.data.data,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });    
  }

  render() { 
    console.log(this.state.gifs);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch} />      
          </div>   
        </div>    
        <div className="main-content">
        {
          (this.state.loading)
          ? <p> Loading ... </p>
          : <GifList data={this.state.gifs}/>
        }
          
        </div>
      </div>
    );
  }
}
