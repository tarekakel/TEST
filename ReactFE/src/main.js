import React, { Component } from "react";
import logo from "./logo.svg";
import GeoLocationDetail from "./component/geoLocationDetail";
import BarChart from "./component/BarChart";
import Dashboard from "./component/Dashboard";
class Main extends Component {
  render() {
    return (
      <div>
        <div className="toolbar" role="banner">
          <img width="40" alt="React Logo" src={logo} />
          <span>React Geo Location App</span>
          <div className="spacer"></div>
        </div>
        <div className="content" role="main">
          <GeoLocationDetail />
          <br />
          Charts Real Time Example
          <Dashboard />
        </div>
      </div>
    );
  }
}
export default Main;
