import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as classActions from '../../../actions/classActions';
import { NavLink } from 'react-router-dom';
import Pagination from './pagination';
import Sidebar from '../../common/sidebar';
import Dashboard from '../../common/dashboard';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-css-loaders';
import { userActions } from '../../../_actions';
import Footer from '../../common/footer';

class ClassList extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.myFunction = this.myFunction.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.state = {
      pageOfItems: [],
      loading: true,
    };
  }

  handleDelete(classId) {
    this.props.actions.deleteOneClass(classId)
      .then(response => {
        this.props.actions.fetchAllClasses();
      });
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
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

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500); // simulates an async action, and hides the spinner
}
  page(num) {
    this.props.actions.fetchAllClasses(num);
  }
  render() {
    const allclasses = this.props.classes;
    const { loading } = this.state;
    if (loading) { // if your component doesn't have to wait for an async action, remove this block 
        return (
          <div className="col-sm-12 ">
          <Dashboard> <h6 className="Signoutalig">
          Welcome {JSON.parse(localStorage.getItem('userName'))} </h6>
          <Link to="/login">
          <button  className="Signoutalign btn btn-primary">
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
      <div className="col-sm-12 ">
         <Dashboard> <h6 className="Signoutalig">
         Welcome {JSON.parse(localStorage.getItem('userName'))} </h6>
         <Link to="/login">
         <button  className="Signoutalign btn btn-primary">
               Logout
                 </button ></Link>
                    </Dashboard>
        <div className="col-sm-2">
          <Sidebar />
        </div>
        <div className="col-sm-10 mt-5">
          <div className="container scroller">
            <datalist Id="empName" >
              {allclasses.map(emp => {
                return (
                  <option value={emp.name} />
                )
              })}

              {this.state.pageOfItems.map(item =>
                <div key={item.cId}>{item.name}</div>
              )}

            </datalist >
            <div className="form-group">
              <div className="row">
                <input type="text" list="empName" className="form-control col-md-6 mt-1" placeholder="Search Name" id="myInput" onChange={this.myFunction} /> &nbsp; &nbsp;
         <button class="btn btn-primary mt-1" onClick={this.myFunction}>Search</button>
              </div></div>
            <table className="table table-hover tc" >
              <thead>
                <tr>
                  <th><center>ID</center></th>
                  <th><center>Name</center></th>
                  <th><center>Max.No of Students</center></th>
                  <th><center>Student enrolled</center></th>
                  <th><center>Min Age</center></th>
                  <th><center>Max Age</center></th>
                  <th><center>Start Time</center></th>
                  <th><center>End Time</center></th>
                  <th><center>Actions</center></th>
                </tr>
              </thead>
              <tbody id="myTable">
                {/* {allclasses.map(clss => { */}
                  {this.state.pageOfItems.map(clss => {
                  return (
                    <tr >
                      <td><center>{clss.cId}</center></td>
                      <td><center>{clss.name}</center></td>
                      <td><center>{clss.max_no_of_student}</center></td>
                      <td><center>{clss.students_enrolled}</center></td>
                      <td><center>{clss.min_age}</center></td>
                      <td><center>{clss.max_age}</center></td>
                      <td><center>{clss.start_time}</center></td>
                      <td><center>{clss.end_time}</center></td>
                      <td><center>
                        <NavLink to={`/editclass/${clss.cId}`}>Edit</NavLink> |{' '}
                        <a
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.handleDelete(clss.cId)}
                        >
                          Delete
                    </a>
                      </center></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
             <Pagination items={allclasses} onChangePage={this.onChangePage} /> 
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

export default connect(mapStateToProps, mapDispatchToProps)(ClassList);
