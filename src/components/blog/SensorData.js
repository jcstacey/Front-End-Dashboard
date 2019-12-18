import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import axios from "axios";
import RangeDatePicker from "../common/RangeDatePicker";
import Chart from "../../utils/chart";

const proxyurl = "https://cors-anywhere.herokuapp.com/";
//const proxyurl = "";
const API = 'https://7600b504-7fb3-435c-b926-eadd5270bb5d-bluemix:69c90417e026c214650f1934af725e257b289419326c8c2e5150852a2c8208c1@7600b504-7fb3-435c-b926-eadd5270bb5d-bluemix.cloudant.com/test_temperature_data/_design/tempDoc/_view/findAll?limit=1&reduce=false';

var temp = ''

class UsersOverview extends React.Component {
  constructor(props) {
    super(props);    
    this.canvasRef = React.createRef();   
     this.state=({cha: null, loaded: false});
  }

    tick(){
        var self = this;        
        self.someFunc();
        this.setState({})
        self._timer = setInterval(self.someFunc.bind(self), 5000);
        
    }
    
    async someFunc(){     
        this.setState({ }); 
        this.forceUpdate(); 
    }

    componentWillUnmount() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }
    someFunc(){
      if(this.state.loaded)
      {
        this.state.cha.update();
      }
    }

    componentDidMount() {
    this.tick();
    const chartOptions = {
      ...{
        responsive: true,
        legend: {
          position: "top"
        },
        elements: {
          line: {
            // A higher value makes the line look skewed at this ratio.
            tension: 0.3
          },
          point: {
            radius: 0
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                callback(tick, index) {
                  // Jump every 2 values on the X axis labels to avoid clutter.
                  return index % 1 !== 0 ? "" : tick;
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                suggestedMax: 45,
                callback(tick) {
                  if (tick === 0) {
                    return tick;
                  }
                  // Format the amounts using Ks for thousands.
                  return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
                }
              }
            }
          ]
        },
        hover: {
          mode: "nearest",
          intersect: false
        },
        tooltips: {
          custom: false,
          mode: "nearest",
          intersect: false
        }
      },
      ...this.props.chartOptions
    };

    const BlogUsersOverview = new Chart(this.canvasRef.current, {
      type: "LineWithLine",
      data: this.props.chartData,
      options: chartOptions
    });

    // They can still be triggered on hover.
    const buoMeta = BlogUsersOverview.getDatasetMeta(0);
    buoMeta.data[0]._model.radius = 0;
    buoMeta.data[
      this.props.chartData.datasets[0].data.length - 1
    ]._model.radius = 0;

    // Render the chart.
    
    BlogUsersOverview.render();
    this.setState({cha: BlogUsersOverview, loaded:true});
  }

  render() {
    const { title } = this.props;
    return (
      
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="pt-0">
          <Row className="border-bottom py-2 bg-light">
            <Col sm="6" className="d-flex mb-2 mb-sm-0">
              <RangeDatePicker />
            </Col>            
          </Row>
          <canvas
            height="120"
            ref={this.canvasRef}
            style={{ maxWidth: "100% !important" }}
          />
        </CardBody>
      </Card>
    );
  }
}

UsersOverview.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart dataset.
   */
  chartData: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object,
   /**
   * The Chart.js options.
   */
  chartDataSet: PropTypes.object
};

UsersOverview.defaultProps = {
  title: "Sensor Data",
  chartData: {
    labels: Array.from(new Array(6), (_, i) => (i === 0 ? 1 : i)),
    datasets: [
      {
        label: "Temperature",
        fill: "start",
        data: [
          26,
          23,
          21,
          20,
          23,
          25
        ],
        backgroundColor: "rgba(0,123,255,0.1)",
        borderColor: "rgba(0,123,255,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgb(0,123,255)",
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 3
      },
      {
        label: "Humidity",
        fill: "start",
        data: [
          50,
          30,
          20,
          30,
          40,
          40
        ],
        backgroundColor: "rgba(255,65,105,0.1)",
        borderColor: "rgba(255,65,105,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgba(255,65,105,1)",
        borderDash: [3, 3],
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 2,
        pointBorderColor: "rgba(255,65,105,1)"
      }
    ]
  }
};

export default UsersOverview;
