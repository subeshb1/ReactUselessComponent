import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';


export default class Home extends React.Component {
    render() {
        return (
            <div>
                {/* <NavBar active="Home"/> */}
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col">
            
                        <form  disabled>
                            <input className="form-control" />
                        </form>
                        </div>
                    </div>
                </div>
                
            </div>
            
        );
    }
}   