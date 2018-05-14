import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { NavLink } from 'react-router-dom';
import Dashboard from '../components/common/dashboard';
import { BarLoader } from 'react-css-loaders';
import Footer from '../components/common/footer';

class register extends React.Component {
    constructor(props) {
        super(props);
        // reset login status
        this.props.dispatch(userActions.logout());
        this.state = {
            Name: '',
            Email: '',
            Password: '',
            ConfirmPassword: '',
            submitted: false,
            loading: true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {

        e.preventDefault();
        this.setState({ submitted: true });
        const { Name, Email, Password, ConfirmPassword } = this.state;
        const { dispatch } = this.props;
        if (Email && Password && ConfirmPassword) {
            dispatch(userActions.register(Name, Email, Password, ConfirmPassword));
        }
    }
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1500); // simulates an async action, and hides the spinner
    }

    render() {
        //    const { registering } = this.props;
        const { Name, Email, Password, ConfirmPassword, submitted } = this.state;
        const { loading } = this.state;
        if (loading) { // if your component doesn't have to wait for an async action, remove this block 
            return (
                <div className="container">
                    <Dashboard />
                    <div className="">
                        <BarLoader
                            color="#4B4E53"
                        />
                    </div>
                    <div className="col-sm-12">
                        <Footer />
                    </div>
                </div>
            );
        }

        return (
            <div className="container">
                <Dashboard />
                <div className="col-md-4 col-md-offset-4 mt-5 card registerform">
                    <h2 className="labl tc">Register</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !Name ? ' has-error' : '')}>
                            <label htmlFor="Name" className="labl tc">Username</label>
                            <input type="text" className="form-control" name="Name" value={Name} onChange={this.handleChange} />
                            {submitted && !Name &&
                                <div className="help-block labl zoom">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !Email ? ' has-error' : '')}>
                            <label htmlFor="Email" className="labl tc">Email</label>
                            <input type="email" className="form-control" name="Email" value={Email} onChange={this.handleChange} />
                            {submitted && !Email &&
                                <div className="help-block labl zoom">Email is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !Password ? ' has-error' : '')}>
                            <label htmlFor="Password" className="labl tc">Password</label>
                            <input type="password" className="form-control" name="Password" value={Password} onChange={this.handleChange} />
                            {submitted && !Password &&
                                <div className="help-block labl zoom">Password is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !ConfirmPassword ? ' has-error' : '')}>
                            <label htmlFor="ConfirmPassword" className="labl tc">ConfirmPassword</label>
                            <input type="password" className="form-control" name="ConfirmPassword" value={ConfirmPassword} onChange={this.handleChange} />
                            {submitted && !ConfirmPassword &&
                                <div className="help-block labl zoom">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary labl" >Register</button>
                            <Link to="/login" className="labl tc"> Cancel </Link>
                        </div>
                    </form>
                </div>
                <div className="col-sm-12">
                    <Footer />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { a } = state.authentication;
    return {
        a
    };
}

const connectedregister = connect(mapStateToProps)(register);
export { connectedregister as register }; 