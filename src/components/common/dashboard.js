import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/css/App.css';
import ccc from '../../assets/images/ccc.gif';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg grad fixed-top clearfix" id="mainNav">
                    <div>
                        <img src={ccc} className="App-logo" alt="logo" />
                    </div>
                    <div >
                        <div> {this.props.children}</div>
                    </div>
                    <ul >
                        <div className="nav-item text-nowrap Signoutalign">
                        </div>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Dashboard;