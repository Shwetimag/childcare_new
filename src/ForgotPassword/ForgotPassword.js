import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { NavLink } from 'react-router-dom';
import Dashboard from '../components/common/dashboard';
import { BarLoader } from 'react-css-loaders';
import Footer from '../components/common/footer';

class Forgotpassword extends React.Component {
    constructor(props) {
        super(props);
        // reset login status
        this.props.dispatch(userActions.logout());
        this.state = {
            Email: '',
            loading: true,
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        debugger;
        e.preventDefault();
        this.setState({ submitted: true });
        const { Email } = this.state;
        const { dispatch } = this.props;
        if (Email) {
            dispatch(userActions.Forgotpassword(Email));
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1500); // simulates an async action, and hides the spinner
    }

    render() {
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
        const { registering } = this.props;
        const { Email, submitted } = this.state;
        return (
            <div className="container">
                <Dashboard />
                <div className="col-md-4 col-md-offset-4 mt-5 card forgotform">
                    {/* <div className="alert alert-info">
                    Username: test<br />
                    Password: test
                </div> */}
                    <h2 className="labl tc">Forgot your password?</h2>
                    <form onSubmit={this.handleSubmit}>

                        <div className={'form-group' + (submitted && !Email ? ' has-error' : '')}>
                            <label htmlFor="Email" className="labl tc">Email</label>
                            <input type="email" className="form-control " name="Email" value={Email} onChange={this.handleChange} />
                            {submitted && !Email &&
                                <div className="help-block labl zoom">Email is required</div>
                            }
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary labl" >Submit</button>
                            <Link to="/login" className="labl tc"> Cancel </Link>
                            {registering &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="" />
                            }
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
    const { registering } = state.authentication;
    return {
        registering
    };
}
const connectedregister = connect(mapStateToProps)(Forgotpassword);
export { connectedregister as Forgotpassword }; 