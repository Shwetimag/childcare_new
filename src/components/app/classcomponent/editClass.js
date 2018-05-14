import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from '../../common/sidebar';
import Dashboard from '../../common/dashboard';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-css-loaders';
import { userActions } from '../../../_actions';
import Footer from '../../common/footer';
import { history } from '../../../_healpers/history';
import * as types from '../../../actions/actionTypes';
import * as classActions from '../../../actions/classActions';

class EditClass extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
            classess: {},
            loading: true,

        };
      
    }

    componentDidMount() {
        axios.get('http://localhost:57840/api/Class/' + this.props.match.params.cId)
            .then(res => {
                this.setState({ classess: res.data });
               
            });
        setTimeout(() => this.setState({ loading: false }), 1500); // simulates an async action, and hides the spinner
    }


    onChange = (e) => {
        const state = this.state.classess
        state[e.target.name] = e.target.value;
        this.setState({ classess: state });
    }


    onSubmit = (e) => {
        e.preventDefault();
        const { cId, name, max_no_of_student, students_enrolled, min_age, max_age, start_time, end_time, } = this.state.classess;
        // o console.log("value", this.state.classess);

        axios.put('http://localhost:57840/api/Class/' + this.props.match.params.cId, { cId, name, max_no_of_student, students_enrolled, min_age, max_age, start_time, end_time, })
            .then((result) => {
                this.props.history.push('/classlist');
            });
    }


    render() {
        // console.log("props", this.props)
        const { loading } = this.state;
        if (loading) { // if your component doesn't have to wait for an async action, remove this block 
            return (
                <div className="col-sm-12">
                    <Dashboard> <h6 className="Signoutalig">
                        Welcome {JSON.parse(localStorage.getItem('userName'))} </h6>
                        <Link to="/login">
                            <button className="Signoutalign btn btn-primary">
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
                        <button className="Signoutalign btn btn-primary">
                            Logout
                       </button ></Link>
                </Dashboard>
                <div className="col-sm-2">
                    <Sidebar />
                </div>
                <div className="col-sm-10 mt-5 card addform">
                    <div className="container scroller">
                        <h3 className="container tc">EDIT DETAILS</h3>
                        <form onSubmit={this.onSubmit}>
                            <div>
                                <div className="tc">
                                    <div className="form-row ">
                                        <div className="col-md-5">
                                            <label className="labl">Name</label>
                                        </div>
                                        <div className="form-group name1">
                                            <input type="Name" className="form-control " placeholder="Enter your name" name="name" value={this.state.classess.name} onChange={this.onChange} />
                                        </div>
                                    </div>

                                    <div className="form-row ">
                                        <div className="form-group col-md-5">
                                            <label className="labl">Max No. Of Student</label>
                                            <input type="text" className="form-control" id="inputPassword4" placeholder="Class Capacity" value={this.state.classess.max_no_of_student} name="max_no_of_student" onChange={this.onChange} />
                                        </div>
                                        <div className="form-group  col-md-5">
                                            <label className="labl">Students Enrolled</label>
                                            <input type="text" className="form-control" id="stuenroll" placeholder="No. of Students Enrolled" value={this.state.classess.students_enrolled} name="students_enrolled" onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-row ">
                                        <div className="form-group col-md-5">
                                            <label className="labl">Minimum Age</label>
                                            <select id='select1' onChange={this.onChange} name="min_age" value={this.state.classess.min_age} className="form-control">
                                                {/* {this.state.states} */}
                                                >
                                                <option> </option>
                                                <option> 6</option>
                                                <option> 7</option>
                                                <option> 8</option>
                                                <option> 9</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label className="labl">Maximum Age</label>
                                            <select id='select1' onChange={this.onChange} name="max_age" value={this.state.classess.max_age} className="form-control">
                                                {/* {this.state.states} */}
                                                >
                                                <option> </option>
                                                <option> 13</option>
                                                <option>14 </option>
                                                <option>15 </option>
                                                <option>16 </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row ">
                                        <div className="form-group col-md-5">
                                            <label for="inputCity" className="labl">Start Time</label>
                                            <input type="time" className="form-control" id="inputCity" name="start_time" value={this.state.classess.start_time} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label for="inputCity" className="labl">End Time</label>
                                            <input type="time" className="form-control" id="inputCity" name="end_time" value={this.state.classess.end_time} onChange={this.onChange} />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-danger buttonedit">Save</button> &nbsp; &nbsp;
                                <button type="reset" className="btn btn-primary  ">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-sm-12">
                    <Footer />
                </div>
            </div>
        );
    }
}
export default EditClass;