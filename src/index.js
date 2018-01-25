import React from 'react';
import data from './store.json';
import ReactDOM from 'react-dom';
import NavBar from './Components/NavBar';
import {BrowserRouter,Route} from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        let [x,y] = [50,50];

        super(props);
        this.state = {pos:{x,y}}
        this.move = this.move.bind(this);
    }


    move(e) {
        let x = e.clientX;
        let y = e.clientY-40;
        this.setState ( {pos:{x,y}});
    }
    render() {
        
      return (
        <BrowserRouter>
           <NavBar store={data} />
        </BrowserRouter>
        
        );
    }
}

ReactDOM.render(<App /> ,document.getElementById('react-container'));