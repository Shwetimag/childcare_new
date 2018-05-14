import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/css/App.css';

const Sidebar = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="col-sm-4">
                    <div className="bg sidebar w3-sidebar mt-5 sidebr">
                        <ul className="tc">
                            <li className="">
                            </li>
                            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-5 mb-1 text-muted">
                                <span className="ts">Class</span>
                                <NavLink className="d-flex align-items-center text-muted" to="#">
                                    <span data-feather="plus-circle"></span>
                                </NavLink>
                            </h6>


                            <li className="nav-item ml-3 mt-2">
                                <NavLink exact to="/addclass" className="tc">Add Class</NavLink>
                            </li>

                            <li className="nav-item ml-3 mt-2">
                                <NavLink to="/classlist" className="tc">List Class</NavLink>
                            </li>


                            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-5 mb-1 text-muted">
                                <span className="ts">Participant</span>
                                <NavLink className="d-flex align-items-center text-muted" to="#">
                                    <span data-feather="plus-circle"></span>
                                </NavLink>
                            </h6>


                            <li className="nav-item ml-3 mt-2">
                                <NavLink to="/addparticipant" className="tc">Add Participant</NavLink>
                            </li>

                            <li className="nav-item ml-3 mt-2">
                                <NavLink to="/participantlist" className="tc">List Participant</NavLink>
                            </li>


                            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-5 mb-1 text-muted">
                                <span className="ts">Attendance</span>
                                <NavLink className="d-flex align-items-center text-muted" to="#">
                                    <span data-feather="plus-circle"></span>
                                </NavLink>
                            </h6>


                            <li className="nav-item ml-3 mt-2">
                                <NavLink to="/markattendence" className="tc">Mark Attendance</NavLink>
                            </li>
                            <li className="nav-item ml-3 mt-2">
                                <NavLink to="/showattendence" className="tc">Show Attendance</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;