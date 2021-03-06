import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import * as attendenceActions from '../../../actions/attendenceActions';
import Sidebar from '../../common/sidebar';
import Dashboard from '../../common/dashboard';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-css-loaders';
import { userActions } from '../../../_actions';
import Footer from '../../common/footer';

class MarkAttendence extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AId: '',
            FirstName: '',
            LastName: '',
            Class1: '',
            Start_time: '',
            End_time: '',
            loading: true,
            submitted: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1500); // simulates an async action, and hides the spinner
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }


    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { FirstName, LastName, Class1, Start_time, End_time } = this.state;
        if (FirstName && LastName && Class1 && Start_time) {
            this.props.actions.addattendence(this.state);
        }
    }

    render() {
        const { loading } = this.state;
        if (loading) { // if your component doesn't have to wait for an async action, remove this block 
            return (
                <div className="col-sm-12">
                <Dashboard> <h6 className="Signoutalig">
                    Welcome {JSON.parse(localStorage.getItem('userName'))} </h6>
                    <Link to="/login">
                        <button className=" Signoutalign btn btn-primary">
                            Logout
                        </button ></Link>
                </Dashboard>

                <div className="col-sm-2">
                    <Sidebar />
                </div>
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
        const { FirstName, LastName, Class1, Start_time, End_time, submitted } = this.state;
        return (
            <div className="col-sm-12">
                <Dashboard> <h6 className="Signoutalig">
                    Welcome {JSON.parse(localStorage.getItem('userName'))} </h6>
                    <Link to="/login">
                        <button className=" Signoutalign btn btn-primary">
                            Logout
                        </button ></Link>
                </Dashboard>

                <div className="col-sm-2">
                    <Sidebar />
                </div>
                <div className="col-sm-10 mt-5 card attendenceform">
                    <div className="container scroller">
                        <form onSubmit={this.onSubmit}>
                            <div>
                                <div className="tc">

                                    <div className="form-row ">
                                        <div className="col-md-5">
                                            <div className={'form-group' + (submitted && !Class1 ? ' has-error' : '')}>
                                                <label className="labl">Name</label>
                                                <div className="form-group name1">
                                                    <input type="Name" className="form-control " placeholder="Enter class name" name="Class1" onChange={this.onChange}  />
                                                    {submitted && !Class1 &&
                                                        <div className="help-block labl zoom">Class name is required</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row ">
                                        <div className="form-group col-md-5">
                                        <div className={'form-group' + (submitted && !FirstName ? ' has-error' : '')}>
                                            <label className=" labl">First Name</label>

                                            <input type="Name" className="form-control " placeholder="Enter the first name" name="FirstName" onChange={this.onChange}  />
                                            {submitted && !FirstName &&
                                                        <div className="help-block labl zoom">Firstname is required</div>
                                                    }
                                        </div>
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label className="labl">Last Name</label>
                                            <div className={'form-group' + (submitted && !LastName ? ' has-error' : '')}>
                                            <input type="text" className="form-control" id="inputPassword4" placeholder="Enter the last name" name="LastName" onChange={this.onChange}  />
                                            {submitted && !LastName &&
                                                        <div className="help-block labl zoom">Lastname is required</div>
                                                    }
                                                    </div>
                                        </div>
                                    </div>

                                    <div className="form-row ">
                                        <div className="form-group col-md-5">
                                        <div className={'form-group' + (submitted && !Start_time ? ' has-error' : '')}>
                                        
                                            <label for="inputCity" className="labl">Start Time</label>
                                            <input type="time" className="form-control"  name="Start_time" onChange={this.onChange}  />
                                            {submitted && !Start_time &&
                                                        <div className="help-block labl zoom">Start time is required</div>
                                                    }
                                                    </div>
                                        </div>

                                        <div className="form-group col-md-5">
                                            <label for="inputCity" className="labl">End Time</label>
                                            <input type="time" className="form-control" id="inputCity" name="End_time" onChange={this.onChange} disabled />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" onSubmit={this.onChange} className="btn btn-danger buttonedit">Add</button> &nbsp; &nbsp;
                        <button type="reset" className="btn btn-primary">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-sm-12">
        <Footer />
        </div>
            </div >

        );
    }

}

function mapDispatchToProps(dispatch) {

    return {
        actions: bindActionCreators(attendenceActions, dispatch)
    };
}

function mapStateToProps(state, ownProps) {
    return {
        attendences: state.attendenceReducer
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkAttendence);
