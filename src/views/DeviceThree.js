import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import SmallStats from "../components/common/SmallStats";
import SensorData from "../components/blog/SensorData";


const DeviceThree = ({ smallStats }) => (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle title="Device Three" subtitle="" className="text-sm-left mb-3" />
    </Row>

    {/* Small Stats Blocks */}
    <Row>
      {smallStats.map((stats, idx) => (
        <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
          <SmallStats
            id={`small-stats-${idx}`}
            variation="1"
            chartData={stats.datasets}
            chartLabels={stats.chartLabels}
            label={stats.label}
            value={stats.value}
            percentage={stats.percentage}
            increase={stats.increase}
            decrease={stats.decrease}
          />
        </Col>
      ))}
    </Row>

    <Row>
      {/* Users Overview */}
      <Col lg="12" md="12" sm="12" className="mb-4">
        <SensorData title="Voltage and Current"/>
      </Col>
    </Row>
  </Container>
);

DeviceThree.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

DeviceThree.defaultProps = {
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

export default DeviceThree;
