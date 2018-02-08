import React from 'react';
import data from './store.json';
import ReactDOM from 'react-dom';
import NavBar from './Components/NavBar';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import TopRepos from './pages/TopRepos';
import  SVG from './pages/DFA';
class App extends React.Component {
    constructor(props) {

        super(props);
      
    }

    render() {
        
      return (
        <BrowserRouter>
            <div >

                <NavBar store={data} />
                <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/about' component={About}/>
                <Route path='/top-repos' component={TopRepos}/>
                <Route path='/dfa' component={SVG} />
                <Route component={NoMatch} />
                </Switch>

           </div>
        </BrowserRouter>
        
        );
    }
}


const NoMatch = () => {
    return (
        <div className="container-fluid text-center">
            <h1 >No Content Found</h1>
        </div>
    )
}
ReactDOM.render(<App /> ,document.getElementById('react-container'));