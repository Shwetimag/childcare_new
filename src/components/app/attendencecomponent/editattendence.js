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
import axios from 'axios';
import Footer from '../../common/footer';

class EditAttendence extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attendences: {},
            loading: true,
        };
    }
    componentDidMount() {
        axios.get('http://localhost:57840/api/Attendence/' + this.props.match.params.aId)
            .then(res => {
                this.setState({ attendences: res.data });
                console.log(this.state.attendences);
            });
        setTimeout(() => this.setState({ loading: false }), 1500); // simulates an async action, and hides the spinner
    }
    onChange = (e) => {
        const state = this.state.attendences
        state[e.target.name] = e.target.value;
        this.setState({ attendences: state });
    }
    onSubmit = (e) => {
        e.preventDefault();

        const { aId, firstName, lastName, class1, start_time, end_time, } = this.state.attendences;
        console.log("value", this.state.attendences);

        axios.put('http://localhost:57840/api/Attendence/' + this.props.match.params.aId, { aId, firstName, lastName, class1, start_time, end_time, })
            .then((result) => {
                this.props.history.push('/showattendence');
            });
    }


    render() {
        const { loading } = this.state;
        if (loading) { // if your component doesn't have to wait for an async action, remove this block 
            return (
                <div className="col-sm-12">
                <Dashboard>
                <h6 className="Signoutalig">
                Welcome {JSON.parse(localStorage.getItem('userName'))} </h6>
                <Link to="/login">
                <button  className=" Signoutalign btn btn-primary">
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

        return (
            <div className="col-sm-12">
                <Dashboard> <h6 className="Signoutalig">
                    Welcome {JSON.parse(localStorage.getItem('userName'))} </h6>
                    <Link to="/login">
                        <button className=" Signoutalign btn btn-primary">
                            Logout
                    </button >
                    </Link>
                </Dashboard>
                <div className="col-sm-2">
                    <Sidebar />
                </div>
                <div className="col-sm-10 mt-5 card attendenceform">
                    <div className="container scroller">
                    <h3 className="container tc">EDIT DETAILS</h3>
                        <form onSubmit={this.onSubmit}>
                        <div className="tc">
                                
                                    <div className="form-row ">
                                        <div className="col-md-5">
                                            <label className="labl">Name</label>
                                        </div>
                                        <div className="form-group name1">
                                            <input type="Name" className="form-control " placeholder="Enter class name" name="class1" onChange={this.onChange} value={this.state.attendences.class1} required />
                                        </div>
                                    </div>

                                    <div className="form-row ">
                                        <div className="form-group col-md-5">
                                            <label className="control-label labl">First Name</label>

                                            <input type="Name" className="form-control " placeholder="Enter the first name" name="firstName" onChange={this.onChange} value={this.state.attendences.firstName} required />

                                        </div>
                                        <div className="form-group col-md-5">
                                            <label className="labl">Last Name</label>
                                            <input type="text" className="form-control" id="inputPassword4" placeholder="Enter the last name" name="lastName" onChange={this.onChange} value={this.state.attendences.lastName} required />
                                        </div>
                                    </div>

                                    <div className="form-row ">
                                        <div className="form-group col-md-5">
                                            <label for="inputCity" className="labl">Start Time</label>
                                            <input type="time" className="form-control" id="inputCity" name="start_time" onChange={this.onChange} value={this.state.attendences.start_time} required disabled/>
                                        </div>

                                        <div className="form-group col-md-5">
                                            <label for="inputCity" className="labl">End Time</label>
                                            <input type="time" className="form-control" id="inputCity" name="end_time" onChange={this.onChange} value={this.state.attendences.end_time} required/>
                                        </div>
                                    </div>
                              
                                <button type="submit" onSubmit={this.onChange} className="btn btn-danger buttonedit">Submit</button> &nbsp; &nbsp;
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
export default EditAttendence;
