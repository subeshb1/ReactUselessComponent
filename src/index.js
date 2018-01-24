import React from 'react';
import data from './store.json';
import ReactDOM from 'react-dom';
import NavBar from './Components/NavBar';


class App extends React.Component {
    render() {
        
      return (
        <div>
           <NavBar store={data}/>
           <div className='collapse'>
                <a className="dropdown-item" href="#" >Action</a>
            </div>
         </div>
        );
    }
}

ReactDOM.render(<App /> ,document.getElementById('react-container'));