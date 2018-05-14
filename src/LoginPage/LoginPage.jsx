import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from './carousel';
import jquery from 'jquery';
import '../assets/css/App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Nav from '../common/nav';
import Form from 'react-validation/build/form';
import Dashboard from '../components/common/dashboard';
import { NavLink } from 'react-router-dom';
import { BarLoader } from 'react-css-loaders';
import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        // reset login status
        this.props.dispatch(userActions.logout());
        this.state = {
            Username: '',
            Password: '',
            submitted: false,
            loading: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1500); // simulates an async action, and hides the spinner
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { Username, Password } = this.state;
        const { dispatch } = this.props;
        if (Username && Password) {
            dispatch(userActions.login(Username, Password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { Username, Password, submitted } = this.state;
        const { loading } = this.state;
        if (loading) { // if your component doesn't have to wait for an async action, remove this block 
            return (
                <div className="">
                <div className="container">
                    <Dashboard>
                        <Link to="/register">
                            <button className="btn btn-primary Registerbtn ">
                                Register
                            </button>
                        </Link>
                    </Dashboard>
                <div className="">
                    <BarLoader color="#4B4E53" />
                </div>
                </div>
                </div>
            );
        }

        return (
            <div className="">
                <div className="container">
                    <Dashboard>
                        <Link to="/register">
                            <button className="btn btn-primary Registerbtn ">
                                Register
                            </button>
                        </Link>
                    </Dashboard>
                    <div className="row">
                        <div className="col-md-6 mt-5">
                            <div className="txt">Welcome to</div>
                            <div className="txt1">Child Care</div>
                        </div>
                        <div className="col-md-5 mt-5 card lf">
                            <h2 className="labl tc">Sign In</h2>
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className="tc">
                                    <div className={'form-group' + (submitted && !Username ? ' has-error' : '')}>
                                        <label htmlFor="username" className="labl">Username</label>
                                        <input type="text" className="form-control" name="Username" value={Username} onChange={this.handleChange} />
                                        {submitted && !Username &&
                                            <div className="help-block labl zoom">Username is required</div>
                                        }
                                    </div>
                                    <div className={'form-group' + (submitted && !Password ? ' has-error' : '')}>
                                        <label htmlFor="password" className="labl">Password</label>
                                        <input type="password" className="form-control" name="Password" value={Password} onChange={this.handleChange} />
                                        {submitted && !Password &&
                                            <div className="help-block labl zoom">Password is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary mt-1 ml-5" >Login</button>
                                    <Link to="/forgotpassword" className="btn btn-link">Can't access your account ?</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 