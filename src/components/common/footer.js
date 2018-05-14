import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/css/App.css';

const Footer = () => {
    return (
        <div>
            <div className=" text-light mt-4 pt-1  footerclr fixed-bottom">
                <div className="container  text-md-left">
                    <div className="col-md-3">
                        <h6 className=" mb-4 mt-3 font-weight-bold">© 2018</h6>
                    </div>
                        
                    <div className="offset-md-3 col-md-2">
                        <NavLink to="#" className="text-md-right font-weight-bold">  About Us </NavLink>
                    </div>

                    <div className="col-md-2">
                        <NavLink to="#" className="text-md-right  font-weight-bold">Privacy Policy </NavLink>
                    </div>

                    <div className="col-md-2">
                        <NavLink to="#" className=" text-md-right font-weight-bold">Site Map </NavLink>
                    </div>
                </div>
            </div>

            {/* <h6 className="text-center">
            <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                    <h6 className="btn-floating btn-sm btn-fb mx-1">
                        <i className="fa fa-facebook"> </i>
                    </h6>
                </li>
                <li className="list-inline-item">
                    <h6 className="btn-floating btn-sm btn-tw mx-1">
                        <i className="fa fa-twitter"> </i>
                    </h6>
                </li>
                <li className="list-inline-item">
                    <h6 className="btn-floating btn-sm btn-gplus mx-1">
                        <i className="fa fa-google-plus"> </i>
                    </h6>
                </li>
                <li className="list-inline-item">
                    <h6 className="btn-floating btn-sm btn-li mx-1">
                        <i className="fa fa-linkedin"> </i>
                    </h6>
                </li>
            </ul>
        </h6> */}
        </div>
    );
};
export default Footer;