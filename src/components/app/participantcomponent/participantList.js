import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as participantActions from '../../../actions/participantActions';
import { NavLink } from 'react-router-dom';
import Sidebar from '../../common/sidebar';
import Dashboard from '../../common/dashboard';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-css-loaders';
//import { userActions } from '../../../_actions';
import Pagination from '../classcomponent/pagination';
import Footer from '../../common/footer';

class ParticipantList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageOfItems: [],
      loading: true,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.myFunction = this.myFunction.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  handleDelete(classId) {
    this.props.actions.deleteOneParticipant(classId)
      .then(response => {
        this.props.actions.fetchAllParticipant();
      });
  }
  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }
  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500); // simulates an async action, and hides the spinner
  }
  // page(num) {
  //   this.props.actions.fetchAllParticipants(num);
  // }
  myFunction() {
    debugger;
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  page(num) {
    this.props.actions.fetchAllParticipant(num);
  }
  render() {
    const allparticipants = this.props.participants;
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
        <div className="col-sm-10 mt-5">
          <div className="container scroller">
            <datalist Id="empName" >
              {allparticipants.map(emp => {
                return (

                  <option value={emp.firstName} />
                )
              })}
              {this.state.pageOfItems.map(item =>
                <div key={item.pId}>{item.firstName}</div>
              )}
            </datalist >
            <div className="form-group">
              <div className="row">

                <input type="text" list="empName" className="form-control col-md-6 mt-1" placeholder="Search Name" id="myInput" onChange={this.myFunction} /> &nbsp; &nbsp;
        <button class="btn btn-primary mt-1" onClick={this.myFunction}>Search</button>
              </div></div>
            <table className="table table-hover tc">
              <thead>
                <tr>
                  <th><center>ID</center></th>
                  <th><center>Name</center></th>
                  {/* <th><center> Last Name</center></th> */}
                  <th><center>Gender</center></th>
                  <th><center> Date Of Birth</center></th>

                  {/* <th><center>Country</center></th> */}
                  {/* <th><center>State</center></th> */}
                  <th><center>BloodGroup</center></th>
                  <th><center> Enrollment Date</center></th>
                  {/* <th><center>Mother Name </center></th> */}
                  {/* <th><center>Father Name</center></th>
              <th><center>Cell Phone </center></th> */}
                  <th><center>Actions</center></th>
                </tr>
              </thead>
              <tbody id="myTable">
                {/* {allparticipants.map(clss => { */}
                {this.state.pageOfItems.map(clss => {
                  return (
                    <tr >
                      <td><center>{clss.pId}</center></td>
                      <td><center>{clss.firstName} {clss.lastName}</center></td>
                      {/* <td><center>{clss.LastName}</center></td> */}
                      <td><center>{clss.gender}</center></td>
                      <td><center>{clss.dateOfBirth}</center></td>
                      {/* <td><center>{clss.country}</center></td> */}
                      {/* <td><center>{clss.state}</center></td> */}
                      <td><center>{clss.bloodGroup}</center></td>
                      <td><center>{clss.enrollmentDate}</center></td>
                      {/* <td><center>{clss.motherName}</center></td> */}
                      {/* <td><center>{clss.fatherName}</center></td>
                  <td><center>{clss.fCellPhone}</center></td> */}
                      <td>


                        <NavLink exact to={`/editparticipant/${clss.pId}`}>Edit</NavLink> |{' '}
                        <a
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.handleDelete(clss.pId)}
                        >
                          Delete
                    </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination items={allparticipants} onChangePage={this.onChangePage} />

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

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantList);
