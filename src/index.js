import React from 'react';

import ReactDOM from 'react-dom';
import NavBar from './Components/NavBar';
class App extends React.Component {
    render() {
        
      return (
           <NavBar />
        );
    }
}

ReactDOM.render(<App /> ,document.getElementById('react-container'));