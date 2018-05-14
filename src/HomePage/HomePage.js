import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { BarLoader } from 'react-css-loaders';
import Nav from '../common/nav';
import { userActions } from '../_actions';
import { authHeader } from '../_healpers/auth-header';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import Sidebar from '../components/common/sidebar';
import '../assets/css/App.css';
import Dashboard from '../components/common/dashboard';
import Footer from '../components/common/footer';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
        setTimeout(() => this.setState({ loading: false }), 1500); // simulates an async action, and hides the spinner
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { loading } = this.state;
        if (loading) { // if your component doesn't have to wait for an async action, remove this block 
            return (
                <div className="col-sm-12">
                    <Dashboard>
                        <h6 className="Signoutalig">Welcome {JSON.parse(localStorage.getItem('userName'))} !</h6>
                        <Link to="/login">
                            <button className="Signoutalign btn btn-primary">
                                Logout
                        </button ></Link>
                    </Dashboard>
                    <div className="col-sm-2">
                        <Sidebar />
                    </div>
                    <div className="">
                        <BarLoader color="#4B4E53" />
                    </div>
                    <div className="col-sm-12">
                        <Footer />
                    </div>
                </div>
            );
        }
        const { user, users } = this.props;
        return (
            <div className="col-sm-12">
                <Dashboard>
                    <h6 className="Signoutalig">Welcome {JSON.parse(localStorage.getItem('userName'))} !</h6>
                    <Link to="/login">
                        <button className="Signoutalign btn btn-primary">
                            Logout
                    </button ></Link>
                </Dashboard>
                <div className="col-sm-2">
                    <Sidebar />
                </div>
                <div className="col-sm-12">
                    <Footer />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };