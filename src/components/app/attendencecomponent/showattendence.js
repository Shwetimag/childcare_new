import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as attendenceActions from '../../../actions/attendenceActions';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../common/sidebar';
import Dashboard from '../../common/dashboard';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-css-loaders';
//import { userActions } from '../../../_actions';
import Pagination from '../classcomponent/pagination';
import Footer from '../../common/footer';

class ShowAttendence extends Component {

  constructor(props) {
    super(props);
    this.myFunction = this.myFunction.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      pageOfItems: [],
      loading: true,
  };
  }
  
  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500); // simulates an async action, and hides the spinner
}
  typeHead(event) {
    event.preventDefault();
    console.log("...........", event.target.value)
    this.props.actions.search(event.target.value)
  }
  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  handleDelete(attendenceId) {
    this.props.actions.deleteOneAttendence(attendenceId)
      .then(response => {
        this.props.actions.fetchAllAttendence();
      });
  }


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
    this.props.actions.fetchAllAttendence(num);
  }
  render() {

    const allattendence = this.props.attendences;
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
        <div className="col-sm-10 mt-5">
          <div className="container scroller">
            <datalist Id="empName" >
              {allattendence.map(emp => {
                return (
                  <option value={emp.firstName} />
                )
              })}
               {this.state.pageOfItems.map(item =>
                <div key={item.aId}>{item.firstName}</div>
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
                  <th><center>Class</center></th>
                  <th><center>CheckIn</center></th>
                  <th><center>CheckOut</center></th>
                  <th><center>Actions</center></th>
                </tr>
              </thead>
              <tbody id="myTable">
                {/* {allattendence.map(clss => { */}
                  {this.state.pageOfItems.map(clss => {
                  return (
                    <tr >
                      <td><center>{clss.aId}</center></td>
                      <td><center>{clss.firstName} {clss.lastName}</center></td>
                      <td><center>{clss.class1}</center></td>
                      <td><center>{clss.start_time}</center></td>
                      <td><center>{clss.end_time}</center></td>
                      <td><center>
                        <NavLink to={`/editattendence/${clss.aId}`}>Edit</NavLink> |{' '}
                        <a
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.handleDelete(clss.aId)}
                        >
                          Delete
                    </a>
                      </center></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination items={allattendence} onChangePage={this.onChangePage} />
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
    actions: bindActionCreators(attendenceActions, dispatch)
  };
}

function mapStateToProps(state, ownProps) {
  return {
    attendences: state.attendenceReducer
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowAttendence);
