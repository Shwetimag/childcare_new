import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import * as classActions from '../../../actions/classActions';
import Sidebar from '../../common/sidebar';
import Footer from '../../common/footer';
import Dashboard from '../../common/dashboard';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-css-loaders';
import { userActions } from '../../../_actions';


class Addclass extends Component {
    constructor() {
        super();
        debugger;
        this.state = {
            CId: '',
            Name: '',
            Max_no_of_student: '',
            Students_enrolled: '',
            Min_age: '',
            Max_age: '',
            Start_time: '',
            End_time: '',
            loading: true,
            submitted: false,
                  
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { Name, Max_no_of_student, Students_enrolled, Min_age, Max_age, Start_time, End_time } = this.state;
        if (Name && Max_no_of_student && Students_enrolled && Min_age && Max_age && Start_time && End_time) {
            this.props.actions.addclass(this.state);
        }
    }
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1500); // simulates an async action, and hides the spinner
    }
    render() {
        const { loading } = this.state;
        const { Name, Max_no_of_student, Students_enrolled, Min_age, Max_age, Start_time, End_time, submitted } = this.state;
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

                <div className="col-sm-10 mt-5 card addform">
                    <div className="container scroller">
                        <form onSubmit={this.onSubmit}>
                            <div>
                                <div className="tc">
                                    <div className="form-row ">
                                        <div className="col-md-5">
                                            <div className={'form-group' + (submitted && !Name ? ' has-error' : '')}>
                                                <label className="labl">Name</label>
                                            </div>
                                            <div className="form-group name1 ">
                                                <input type="Name" className="form-control " placeholder="Enter your name" value={Name} name="Name" onChange={this.onChange} />
                                                {submitted && !Name &&
                                                    <div className="help-block labl zoom">Name is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row ">
                                        <div className="form-group col-md-5 ">
                                            <div className={'form-group' + (submitted && !Max_no_of_student ? ' has-error' : '')}>
                                                <label className="labl">Class Capacity</label>
                                                <input type="text" className="form-control" id="inputPassword4" placeholder="Maximum no. of Students" name="Max_no_of_student" onChange={this.onChange} />
                                                {submitted && !Max_no_of_student &&
                                                    <div className="help-block labl zoom">Maximum no of student is required</div>
                                                }
                                            </div>

                                        </div>
                                        <div className="form-group  col-md-5 ">
                                            <div className={'form-group' + (submitted && !Students_enrolled ? ' has-error' : '')}>
                                                <label className="labl">Students Enrolled</label>
                                                <input type="text" className="form-control" id="stuenroll" placeholder="No. of Students Enrolled" name="Students_enrolled" onChange={this.onChange} />
                                                {submitted && !Students_enrolled &&
                                                    <div className="help-block labl zoom">Total no of student is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row ">
                                        <div className="form-group col-md-5">
                                            <label className="labl">Minimum Age</label>
                                            <select id='select1' onChange={this.onChange} name="Min_age" className="form-control">
                                                {/* {this.state.states} */}
                                                <option> </option>
                                                <option> 6</option>
                                                <option> 7</option>
                                                <option> 8</option>
                                                <option> 9</option>
                                            </select>
                                        </div>


                                        <div className="form-group col-md-5 ">
                                            <label className="labl">Maximum Age</label>
                                            <select id='select1' onChange={this.onChange} name="Max_age" className="form-control">
                                                {/* {this.state.states} */}
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
                                            <div className={'form-group' + (submitted && !Start_time ? ' has-error' : '')}>
                                                <label for="inputCity" className="labl">Start Time</label>
                                                <input type="time" className="form-control" id="inputCity" name="Start_time" onChange={this.onChange} />
                                                {submitted && !Start_time &&
                                                    <div className="help-block labl zoom">Start time is required</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group col-md-5">
                                            <div className={'form-group' + (submitted && !End_time ? ' has-error' : '')}>
                                                <label for="inputCity" className="labl">End Time</label>
                                                <input type="time" className="form-control" id="inputCity" name="End_time" onChange={this.onChange} />
                                                {submitted && !End_time &&
                                                    <div className="help-block labl zoom">End time is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <button className="btn btn-primary labl" >Register</button> */}
                                <button className="btn btn-danger buttonedit">Add</button> &nbsp; &nbsp;
                        <button type="reset" className="btn btn-primary">Reset</button>
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


function mapDispatchToProps(dispatch) {

    return {
        actions: bindActionCreators(classActions, dispatch)
    };
}

function mapStateToProps(state, ownProps) {
    return {
        classes: state.classReducer
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Addclass);
