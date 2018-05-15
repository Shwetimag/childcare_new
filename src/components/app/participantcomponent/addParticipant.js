import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as participantActions from '../../../actions/participantActions';
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
import axios from 'axios';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';


class Addparticipant extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedFile: null }
        this.state = {
            PId: '',
            FirstName: '',
            LastName: '',
            Gender: ' ',
            DateOfBirth: moment(),
            Address: '',
            Country: ' ',
            State: ' ',
            City: ' ',
            street: ' ',
            ZipCode: ' ',
            Image: '',
            bloodgroup: ' ',
            EnrollmentDate: moment(),
            mothername: ' ',
            occupation: ' ',
            email: ' ',
            cellphone: ' ',
            fathername: ' ',
            foccupation: ' ',
            femail: ' ',
            fcellphone: ' ',
            GuardianName: ' ',
            GCellPhone: ' ',
            loading: true,
            submitted: false

        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this);
    }

    fileChangedHandler = (event) => {
        this.setState({ selectedFile: event.target.files[0] })
    }


    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    uploadHandler = (e) => {
        console.log("inside uploadeer handler");
        e.preventDefault();
        const formData = new FormData()
        formData.append('myFile', this.state.selectedFile, this.state.selectedFile.name)
        axios.post('http://localhost:57840/api/Image', formData)
    }

    updateAddress(address) {
        this.setState({
            City: address.address_components[1].long_name,
            State: address.address_components[2].long_name,
            Country: address.address_components[3].long_name
        })
        if (address.address_components.length > 4) {
            this.setState({
                ZipCode: address.address_components[address.address_components.length - 1].long_name
            })
        }
    }

    onSubmit = (e) => {

        e.preventDefault();
        let data = {
            PId: this.state.PId,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Gender: this.state.Gender,
            DateOfBirth: moment(this.state.DateOfBirth).format('DD/MM/YYYY'),
            Country: this.state.Country,
            State: this.state.State,
            City: this.state.City,
            Street: this.state.Street,
            ZipCode: this.state.zipcode,
            //  Image: this.state.Image,
            BloodGroup: this.state.BloodGroup,
            EnrollmentDate: moment(this.state.EnrollmentDate).format('DD/MM/YYYY'),
            MotherName: this.state.MotherName,
            Occupation: this.state.Occupation,
            Email: this.state.Email,
            CellPhone: this.state.CellPhone,
            FatherName: this.state.FatherName,
            FOccupation: this.state.FOccupation,
            FEmail: this.state.FEmail,
            FCellPhone: this.state.FCellPhone,
            GuardianName: this.state.GuardianName,
            GCellPhone: this.state.GCellPhone,
        }

        this.setState({ submitted: true });
        const { FirstName, LastName, Gender, DateOfBirth, Address, Country, State, City, street, ZipCode, bloodgroup, EnrollmentDate, mothername, occupation,
            email, cellphone, fathername, foccupation, femail, fcellphone, GuardianName, GCellPhone } = this.state;
        if (FirstName && LastName && Gender && DateOfBirth && Address && Country && State && City && street && ZipCode
            && bloodgroup && EnrollmentDate && mothername && occupation && email && cellphone && fathername && foccupation && femail
            && fcellphone && GuardianName && GCellPhone) {

            this.props.actions.addParticipant(data);
        }
    }
    handleChange(date) {
        this.setState({
            DateOfBirth: date,
        });
    }
    handleChange1(date) {
        this.setState({
            EnrollmentDate: date
        });
    }
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1500); // simulates an async action, and hides the spinner
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
                            <button className=" Signoutalign btn btn-primary">
                                Logout
                            </button >
                        </Link>
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
        const { FirstName, LastName, Gender, DateOfBirth, Address, Country, State, City, Street, ZipCode, BloodGroup, EnrollmentDate, MotherName,
            Occupation, Email, CellPhone, FatherName, FOccupation, FEmail, FCellPhone, GuardianName, GCellPhone, submitted } = this.state;

        return (
            <div className="col-sm-12">
                <Dashboard>
                    <h6 className="Signoutalig">
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
                <div className="col-sm-10 mt-5 card paticipantform">
                    <div className="container scroller">
                        <form onSubmit={this.onSubmit} name="participantform" id="a">
                            <div>
                                <div className="tc">

                                    <div className="form-row ">
                                        <div className="form-group col-md-5">
                                            <div className={'form-group' + (submitted && !FirstName ? ' has-error' : '')}>
                                                <label className=" labl">First Name</label>
                                                <input type="Name" className="form-control " placeholder="Enter your first name" name="FirstName" onChange={this.onChange} />
                                                {submitted && !FirstName &&
                                                    <div className="help-block labl zoom">Firstname is required</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group col-md-5">
                                            <div className={'form-group' + (submitted && !LastName ? ' has-error' : '')}>
                                                <label className="labl">Last Name</label>
                                                <input type="Name" className="form-control " placeholder="Enter your last name" name="LastName" onChange={this.onChange} />
                                                {submitted && !LastName &&
                                                    <div className="help-block labl zoom">Lastname is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row form-group ">
                                        <div className="form-group col-md-5">

                                            <label className="labl control-label mt-3">Gender</label>

                                            <label className="labl control-label  mt-3">Male</label>&nbsp;

                                        <input className="mt-3" type="radio" id="a" name="Gender" value="Male" onChange={this.onChange} />

                                            <label className="labl control-label  mt-3">Female</label> &nbsp;
                                        <input className="mt-3" type="radio" id="a" name="Gender" value="Female" onChange={this.onChange} />
                                        </div>
                                        <div className="form-row">

                                            <div className="col-md-5">

                                                <label className="labl">Date of Birth</label>
                                            </div>
                                            <div className="dob1">
                                                <DatePicker
                                                    className="form-control labl"
                                                    selected={this.state.DateOfBirth}
                                                    onChange={this.handleChange}
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    minDate={moment().subtract(20, "year")}
                                                    maxDate={moment()}
                                                    name="DateOfBirth"

                                                />

                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className={'form-group' + (submitted && !Address ? ' has-error' : '')}>
                                            <label className="labl">Resident Address</label>
                                            <div className="address1">
                                                {/* ------------------FOR GIVING THE ADDRESS AUTOMATICALLY WHEN USER TYPE A WORD  */}
                                                <Autocomplete
                                                    className="form-control"
                                                    data-toggle="tooltip"
                                                    data-placement="right"
                                                    title="Country, State and City will be automatically filled"
                                                    id="inputAddress2"
                                                    placeholder="Enter your Address"
                                                    name="Address"
                                                    value={this.state.Address}
                                                    onChange={this.onChange}
                                                    onPlaceSelected={this.updateAddress}
                                                    componentRestrictions={{ country: "in" }}
                                                />
                                                {submitted && !Address &&
                                                    <div className="help-block labl zoom">Address is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row ">
                                        <div className="form-group col-md-5">
                                            <div className={'form-group' + (submitted && !Country ? ' has-error' : '')}>
                                                <label className="labl">Country</label>
                                                <input type="text" className="form-control " name="Country" value={this.state.Country} onChange={this.onChange} />
                                                {submitted && !Country &&
                                                    <div className="help-block labl zoom">Country is required</div>
                                                }
                                            </div>
                                        </div>


                                        <div className="form-group col-md-5">
                                            <label className="labl">State</label>
                                            <input type="text" className="form-control " name="State" value={this.state.State} onChange={this.onChange} />
                                        </div>
                                    </div>

                                    <div className="form-row ">
                                        <div className="form-group col-md-5">
                                            <label className="labl">City</label>
                                            <input type="text" className="form-control " name="City" value={this.state.City} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group col-md-5">
                                            <div className={'form-group' + (submitted && !Street ? ' has-error' : '')}>
                                                <label className="labl">Street</label>
                                                <input type="text" className="form-control" placeholder="Enter the Street name" name="Street" onChange={this.onChange} />
                                                {submitted && !Street &&
                                                    <div className="help-block labl zoom">Street is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>


                                    <div className="form-row ">
                                        <div className="form-group col-md-5">
                                            <div className={'form-group' + (submitted && !ZipCode ? ' has-error' : '')}>
                                                <label className=" labl">Zipcode</label>
                                                <input type="Name" className="form-control " placeholder="Enter your Zipcode" name="ZipCode" onChange={this.onChange} />
                                                {submitted && !ZipCode &&
                                                    <div className="help-block labl zoom">Zipcode is required</div>
                                                }
                                            </div>
                                        </div>

                                        <div className="form-group col-md-5">
                                            <form name="imgform" id="ab">
                                                <label className="labl ">Image</label>
                                                <input name="name" type="file" onChange={this.fileChangedHandler} className="labl" />
                                                <button onClick={this.uploadHandler} className="btn btn-primary labl">Upload!</button>
                                            </form>
                                        </div>
                                    </div>


                                    <div className="form-row ">
                                        <div className="form-group col-md-5">
                                            <div className={'form-group' + (submitted && !BloodGroup ? ' has-error' : '')}>
                                                <label className=" labl">BloodGroup</label>
                                                <input type="Name" className="form-control " placeholder="Enter your blood group" name="BloodGroup" onChange={this.onChange} />
                                                {submitted && !BloodGroup &&
                                                    <div className="help-block labl zoom">Bloodgroup is required</div>
                                                }
                                            </div>
                                        </div>


                                        <div className="form-group col-md-5">
                                            <div className={'form-group' + (submitted && !EnrollmentDate ? ' has-error' : '')}>
                                                <label className="labl">EnrollmentDate</label>

                                                <DatePicker
                                                    className="form-control"
                                                    selected={this.state.EnrollmentDate}
                                                    onChange={this.handleChange1}
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    minDate={moment().subtract(10, "year")}
                                                    maxDate={moment()}
                                                    name="EnrollmentDate"

                                                />
                                                {submitted && !EnrollmentDate &&
                                                    <div className="help-block labl zoom">Enrollment date is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>


                                    <h3 className="container">Parent Details</h3>
                                    <div className="form-row">
                                        <div className="form-group col-md-5">
                                            <div className={'form-group' + (submitted && !MotherName ? ' has-error' : '')}>
                                                <label className="labl"> Mother Name </label>
                                                <input type="text" className="form-control" name="MotherName" placeholder="Enter the Mother name" onChange={this.onChange} />
                                                {submitted && !MotherName &&
                                                    <div className="help-block labl zoom">Mother name is required</div>
                                                }
                                            </div>
                                        </div>

                                        <div className="form-group col-md-5">
                                            <div className={'form-group' + (submitted && !Occupation ? ' has-error' : '')}>
                                                <label className="labl"> Occupation </label>
                                                <input type="text" className="form-control" name="Occupation" placeholder="Enter the Mother Occupation" onChange={this.onChange} />
                                                {submitted && !Occupation &&
                                                    <div className="help-block labl zoom">Occupation is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-5">
                                            <label className="labl"> Email </label>
                                            <input type="email" className="form-control" name="Email" placeholder="Enter the Mother Email" onChange={this.onChange} />
                                        </div>

                                        <div className="form-group col-md-5">
                                            <div className={'form-group' + (submitted && !CellPhone ? ' has-error' : '')}>
                                                <label className="labl"> Cell Phone </label>
                                                <input type="text" className="form-control" name="CellPhone" placeholder="Enter the Mother Phone number" onChange={this.onChange} />
                                                {submitted && !CellPhone &&
                                                    <div className="help-block labl zoom">Cell Phone is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>



                                    <div className="form-row">
                                        <div className="form-group col-md-5">
                                            <div className={'form-group' + (submitted && !FatherName ? ' has-error' : '')}>
                                                <label className="labl"> Father Name </label>
                                                <input type="text" className="form-control" name="FatherName" placeholder="Enter the Father name" onChange={this.onChange} />
                                                {submitted && !FatherName &&
                                                    <div className="help-block labl zoom">Father name is required</div>
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group col-md-5">
                                            <div className={'form-group' + (submitted && !FOccupation ? ' has-error' : '')}>
                                                <label className="labl"> Occupation </label>
                                                <input type="text" className="form-control" name="FOccupation" placeholder="Enter the Father Occupation" onChange={this.onChange} />
                                                {submitted && !FOccupation &&
                                                    <div className="help-block labl zoom">Occupation is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-5">
                                            <div className={'form-group' + (submitted && !FEmail ? ' has-error' : '')}>
                                                <label className="labl"> Email </label>
                                                <input type="email" className="form-control" placeholder="Enter the Father Email " name="FEmail" onChange={this.onChange} />
                                                {submitted && !FEmail &&
                                                    <div className="help-block labl zoom">Email is required</div>
                                                }
                                            </div>
                                        </div>

                                        <div className="form-group col-md-5">
                                            <div className={'form-group' + (submitted && !FCellPhone ? ' has-error' : '')}>
                                                <label className="labl"> Cell Phone </label>
                                                <input type="text" className="form-control" placeholder="Enter the Father Phone no." name="FCellPhone" onChange={this.onChange} />
                                                {submitted && !FCellPhone &&
                                                    <div className="help-block labl zoom">Cell phone is required</div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-5">
                                            <label className="labl"> Guardian Name </label>
                                            <input type="text" className="form-control" placeholder="Enter the Guardian name" name="GuardianName" onChange={this.onChange} />
                                        </div>

                                        <div className="form-group col-md-5">
                                            <label className="labl"> Cell Phone </label>
                                            <input type="text" className="form-control" name="GCellPhone" placeholder="Enter the Guardian Phone no." onChange={this.onChange} />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-danger buttonedit">Add</button> &nbsp; &nbsp;
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
        actions: bindActionCreators(participantActions, dispatch)
    };
}

function mapStateToProps(state, ownProps) {
    return {
        participants: state.participantReducer
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Addparticipant);
