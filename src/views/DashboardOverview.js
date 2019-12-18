import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import SensorData from "../components/blog/SensorData";
import Devices from "../components/blog/Devices";
import DeviceOne from "./DeviceOne";
import DeviceTwo from "./DeviceTwo";
import DeviceThree from "./DeviceThree";


const DashboardOverview = ({ smallStats }) => (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle title="Overview" subtitle="Dashboard" className="text-sm-left mb-3" />
    </Row>

    <Row>
      {/* Users Overview */}
      <Col lg="8" md="12" sm="12" className="mb-4">
        <SensorData />
      </Col>

      {/* Users by Device */}
      <Col lg="4" md="6" sm="12" className="mb-4">
        <Devices />
      </Col>
    </Row>
    <div className="no-padding">
      <DeviceOne />
    </div>
    <div className="no-padding">
      <DeviceTwo />
    </div>
    <div className="no-padding">
      <DeviceThree />
    </div>
    
  </Container>
  
);

DashboardOverview.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

DashboardOverview.defaultProps = {
  smallStats: [
    {
      label: "Voltage",
      value: "2.5",
      increase: true,
      chartLabels: ["2.4", "2.3", null, null, null, null, null],
      attrs: { md: "6", sm: "12" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [2.3, 2.5, 2.4, 2.5, 2.5, 2.4, 2.5]
        }
      ]
    },
    {
      label: "Current",
      value: "0.5",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "12" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(23,198,113,0.1)",
          borderColor: "rgb(23,198,113)",
          data: [0.5, 0.6, 0.5, 0.4, 0.4, 0.4, 0.5]
        }
      ]
    }
  ]
};

export default DashboardOverview;
