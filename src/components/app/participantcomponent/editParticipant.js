import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from '../../common/sidebar';
import Dashboard from '../../common/dashboard';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-css-loaders';
import { userActions } from '../../../_actions';
import Autocomplete from 'react-google-autocomplete';
import Footer from '../../common/footer';

class EditParticipant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            participantss: {},
            loading: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.onChange = this.onChange.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        const state = this.state.participantss
        state[e.target.name] = e.target.value;
        this.setState({ participantss: state });
    }

    updateAddress(address) {
        this.setState({
            city: address.address_components[1].long_name,
            State: address.address_components[2].long_name,
            country: address.address_components[3].long_name
        })
        if (address.address_components.length > 4) {
            this.setState({
                Zipcode: address.address_components[address.address_components.length - 1].long_name
            })
        }
    }

    handleChange(date) {
        this.setState({
            dateOfBirth: date
        });
    }

    handleChange1(date) {
        this.setState({
            enrollmentDate: date
        });
    }

    componentDidMount() {
        axios.get('http://localhost:57840/api/Participant/' + this.props.match.params.pId)
            .then(res => {
                this.setState({ participantss: res.data });
              //  console.log(this.state.participantss);
            });
        setTimeout(() => this.setState({ loading: false }), 1500);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { pId, firstName, lastName, gender, dateOfBirth, country, state, city, street, zipCode, bloodGroup, enrollmentDate, motherName, occupation, email, cellPhone, fatherName, fOccupation, fEmail, fCellPhone, guardianName, gCellPhone } = this.state.participantss;
       // console.log("value", this.state.participantss);
        axios.put('http://localhost:57840/api/Participant/' + this.props.match.params.PId, { pId, firstName, lastName, gender, dateOfBirth, country, state, city, street, zipCode, bloodGroup, enrollmentDate, motherName, occupation, email, cellPhone, fatherName, fOccupation, fEmail, fCellPhone, guardianName, gCellPhone })
            .then((result) => {
                this.props.history.push("/participantlist")
            });
    }

    render() {
        console.log("props", this.props)
        const { loading } = this.state;
        if (loading) { // if your component doesn't have to wait for an async action, remove this block 
            return (
                <div className="col-sm-12">
                <Dashboard><h6 className="Signoutalig">
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
                <Dashboard><h6 className="Signoutalig">
                    Welcome {JSON.parse(localStorage.getItem('userName'))} </h6>
                    <Link to="/login">
                        <button className="Signoutalign btn btn-primary">
                            Logout
                      </button ></Link>
                </Dashboard>
                <div className="col-sm-2">
                    <Sidebar />
                </div>
                <div className="col-sm-10 mt-5 card paticipantform">
                    <div className="container scroller ">
                        <h3 className="container tc">EDIT DETAILS</h3>
                        <form onSubmit={this.onSubmit}>
                            <div>
                                <div className="tc">
                                    <div className="form-row ">
                                    </div>
                                    <div className="form-row ">
                                        <div className="form-group col-md-5">
                                            <label className="control-label labl">First Name</label>
                                            <input type="Name" className="form-control " value={this.state.participantss.firstName} placeholder="Enter your first name" name="firstName" onChange={this.onChange} />
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label className="control-label labl">Last Name</label>
                                            <input type="Name" className="form-control " placeholder="Enter your last name" value={this.state.participantss.lastName} name="lastName" onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-row ">
                                        <div className="form-group col-md-5">
                                            <label className="labl control-label mt-3">Gender</label>
                                            <label className="labl control-label  mt-3">Male</label>
                                            <input className="mt-3" type="radio" id="a" name="Gender" value={this.state.participantss.gender} onChange={this.onChange} />
                                            <label className="labl control-label  mt-3">Female</label>
                                            <input className="mt-3" type="radio" id="a" name="Gender" value={this.state.participantss.gender} onChange={this.onChange} />
                                        </div>

                                        {/* <div className="form-group  col-md-5">
                                <label>Date of Birth</label> */}
                                        {/* <input type="date" className="form-control" name="dateOfBirth" value={this.state.participantss.dateOfBirth} onChange={this.onChange} />
                            </div> */}

                                        <div className="form-group  col-md-5">
                                            <label className="labl control-label">Date of Birth</label>
                                            <DatePicker
                                                className="form-control"
                                                selected={this.state.dateOfBirth}
                                                onChange={this.handleChange}
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                minDate={moment().subtract(20, "year")}
                                                maxDate={moment()}
                                                value={this.state.participantss.dateOfBirth}
                                                name="dateOfBirth"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-5">
                                            <label className="labl">Country</label>
                                            <input type="text" className="form-control " name="country" value={this.state.participantss.country} onChange={this.onChange} />

                                        </div>


                                        <div className="form-group col-md-5">
                                            <label className="labl">State</label>
                                            <input type="text" className="form-control " name="state" value={this.state.participantss.state} onChange={this.onChange} />
                                        </div>
                                    </div>

                                    <div className="form-row ">
                                        <div className="form-group col-md-5">
                                            <label className="labl">City</label>
                                            <input type="text" className="form-control " name="city" value={this.state.participantss.city} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label for="inputCity" className="labl">Street</label>
                                            <input type="text" className="form-control" id="inputCity" name="street" value={this.state.participantss.street} onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-row ">
                                        <div className="form-group col-md-5">
                                            <label for="inputCity" className="labl">Zipcode</label>
                                            <input type="text" className="form-control" id="inputCity" value={this.state.participantss.zipCode} name="zipCode" onChange={this.onChange} />
                                        </div>

                                        <div className="form-group col-md-5">
                                            <label className="labl">Image</label>
                                            <input type="file" className="form-control-image" id="inputCity" name=" Image" onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-row ">
                                        <div className="form-group col-md-5">
                                            <label for="inputCity" className="labl">Bloodgroup</label>
                                            <input type="text" className="form-control" id="inputCity" value={this.state.participantss.bloodGroup} name="bloodGroup" onChange={this.onChange} />
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label for="inputCity" className="labl">EnrollmentDate</label>
                                            <DatePicker
                                                className="form-control"
                                                selected={this.state.enrollmentDate}
                                                onChange={this.handleChange1}
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                minDate={moment().subtract(10, "year")}
                                                maxDate={moment()}
                                                value={this.state.participantss.enrollmentDate}
                                                name="enrollmentDate"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="conatiner">Parent Details</h3>
                                    <div className="form-row">
                                        <div className="form-group col-md-5">
                                            <label className="labl"> Mother Name </label>
                                            <input type="text" className="form-control" name="motherName" value={this.state.participantss.motherName} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label className="labl"> Occupation </label>
                                            <input type="text" className="form-control" name="occupation" value={this.state.participantss.occupation} onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-5">
                                            <label className="labl"> Email </label>
                                            <input type="email" className="form-control" name="email" value={this.state.participantss.email} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label className="labl"> Cell Phone </label>
                                            <input type="text" className="form-control" name="cellPhone" value={this.state.participantss.cellPhone} onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-5">
                                            <label className="labl"> Father Name </label>
                                            <input type="text" className="form-control" name="fatherName" value={this.state.participantss.fatherName} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label className="labl"> Occupation </label>
                                            <input type="text" className="form-control" name="fOccupation" value={this.state.participantss.fOccupation} onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-5">
                                            <label className="labl"> Email </label>
                                            <input type="email" className="form-control" name="fEmail" value={this.state.participantss.fEmail} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label className="labl"> Cell Phone </label>
                                            <input type="text" className="form-control" name="fCellPhone" value={this.state.participantss.fCellPhone} onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-5">
                                            <label className="labl"> Guardian Name </label>
                                            <input type="text" className="form-control" name="guardianName" value={this.state.participantss.guardianName} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group col-md-5">
                                            <label className="labl"> Cell Phone </label>
                                            <input type="text" className="form-control" name="gCellPhone" value={this.state.participantss.gCellPhone} onChange={this.onChange} />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-danger buttonedit">Submit</button> &nbsp; &nbsp;
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
export default EditParticipant;