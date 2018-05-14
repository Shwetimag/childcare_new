import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import jquery from 'jquery';
import { NavLink } from 'react-router-dom';
import img1 from '../assets/images/img1.jpg';
import img5 from '../assets/images/img5.jpg';
import img3 from '../assets/images/img3.jpg';
import logo1 from '../assets/images/logo1.jpg';
import '../assets/css/App.css';

class Carousel extends Component {

  render() {
    return (
      <div id="demo" className="carousel slide" data-ride="carousel">
        <ul className="carousel-indicators">
          <li data-target="#demo" data-slide-to="0" className="active"></li>
          <li data-target="#demo" data-slide-to="1"></li>
          <li data-target="#demo" data-slide-to="2"></li>
          <li data-target="#demo" data-slide-to="3"></li>
        </ul>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={img1} alt="childcare" width="1100" height="300px !important" />

          </div>
          <div className="carousel-item">
            <img src={img5} alt="childcare" width="1100" height="300px !important" />

          </div>
          <div className="carousel-item">
            <img src={img3} alt="childcare" width="1100" height="300px !important" />

          </div>
          <div className="carousel-item">
            <img src={logo1} alt="childcare" width="1100" height="300px !important" />

          </div>
        </div>
        <NavLink className="carousel-control-prev" to="#demo" data-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </NavLink>
        <NavLink className="carousel-control-next" to="#demo" data-slide="next">
          <span className="carousel-control-next-icon"></span>
        </NavLink>
      </div>);
  }
}
export default Carousel;