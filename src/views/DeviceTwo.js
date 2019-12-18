import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import axios from "axios";

import PageTitle from "../components/common/PageTitle";
import SmallStats from "../components/common/SmallStats";
import SensorData from "../components/blog/SensorData";


const proxyurl = "https://cors-anywhere.herokuapp.com/";
const API = 'dotnetappsqldb20190406050921dbserver.database.windows.net';

var charData = []
var cData = null

class DeviceTwo extends React.Component{
    constructor(props) {
        super(props);   
        this.state={data:null, loading: false, dataC:null};   
    }
    
    componentDidMount(){        
        this.tick();
    }
    tick(){
        var self = this;        
        self.someFunc();
        self._timer = setInterval(self.someFunc.bind(self), 5000);   
    }
    
    componentWillUnmount() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }
    popArr() {
        for(let i = 0; i < 20; i++){
            charData[i] = this.state.data.rows[i].value;
       } 
    }
    createDataSet(){
        this.popArr();
        cData={
            labels: Array.from(new Array(20), (_, i) => (i === 0 ? 1 : i)),
            datasets: [
              {
                label: "Humidity",
                fill: "start",
                data: charData,
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
            this.setState({data:this.state.data, loading:true, dataC: cData});
    }

    async someFunc(){        
        await axios.get(proxyurl + API, {auth: {
          username: 'EDPAlek',
          password: 'edp@ele800'
        }}).then(response => {
            const data = response.data;
            console.log(data);
            //this.setState({ data:data, cData:this.state.cData });                 
        });
        this.createDataSet(); 
        this.forceUpdate();
    }
  
    
    render(){
        const {loading} = this.state;
        return(
            <Container fluid className="main-content-container px-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
                <PageTitle title="Device Two" subtitle="" className="text-sm-left mb-3" />
            </Row>
            {/* Small Stats Blocks */}
            <Row>                
                    <Col className="col-lg mb-4">
                    {loading ?
                    <SmallStats
                        variation="1"
                        chartData={DeviceTwo.props.humidity.datasets}
                        chartLabels={DeviceTwo.props.humidity.chartLabels}
                        label={DeviceTwo.props.humidity.label}
                        value={this.state.data.rows[0].value}
                        percentage={DeviceTwo.props.humidity.percentage}
                        increase={DeviceTwo.props.humidity.increase}
                        decrease={DeviceTwo.props.humidity.decrease}
                    />:null
                }
                    </Col>
                    <Col>
                <SmallStats                
                    variation="1"
                    chartData={DeviceTwo.props.battery.datasets}
                    chartLabels={DeviceTwo.props.battery.chartLabels}
                    label={DeviceTwo.props.battery.label}
                    value={DeviceTwo.props.battery.value}
                    percentage={DeviceTwo.props.battery.percentage}
                    increase={DeviceTwo.props.battery.increase}
                    decrease={DeviceTwo.props.battery.decrease}
                />
                </Col>
            </Row>
            <Row>
                {/* Humidity Data Chart */}
                <Col lg="12" md="12" sm="12" className="mb-4">
                {loading ? 
               <SensorData title= {DeviceTwo.props.title} chartData = {this.state.dataC}/>:null }
                 </Col>
            </Row>
            </Container>
            );
        }
    }
DeviceTwo.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

DeviceTwo.props = {
    chart:{
    title: "Humidity Data",
    chartData: {
      labels: Array.from(new Array(6), (_, i) => (i === 0 ? 1 : i)),
      datasets: [        
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
},
    humidity: 
    {
      label: "Humidity",
      value: "34",
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
    battery:
    {
        label: "Battery",
        value: "85%",
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
            data: [50, 80, 85, 90, 94, 96, 100]
          }
        ]
      }
};

DeviceTwo.defaultProps = {
  
    
  
};

export default DeviceTwo;
