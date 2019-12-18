import React from "react";
import { Container, Row, Col } from "shards-react";
import axios from "axios";

import PageTitle from "../components/common/PageTitle";
import SmallStats from "../components/common/SmallStats";
import SensorData from "../components/blog/SensorData";
import input from "../input2.json";

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const API = 'https://7600b504-7fb3-435c-b926-eadd5270bb5d-bluemix:69c90417e026c214650f1934af725e257b289419326c8c2e5150852a2c8208c1@7600b504-7fb3-435c-b926-eadd5270bb5d-bluemix.cloudant.com/test_temperature_data/_design/tempDoc/_view/findAll?limit=25&reduce=false&descending=true';

var charData = []
var cData = null
class DeviceOne extends React.Component{
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
        //this.setState({dataC: charData});
        
        
    }
    createDataSet(){
        this.popArr();
        cData={
            labels: Array.from(new Array(20), (_, i) => (i === 0 ? 1 : i)),
            datasets: [
              {
                label: "Temperature",
                fill: "start",
                data: charData,
                backgroundColor: "rgba(0,123,255,0.1)",
                borderColor: "rgba(0,123,255,1)",
                pointBackgroundColor: "#ffffff",
                pointHoverBackgroundColor: "rgb(0,123,255)",
                borderWidth: 1.5,
                pointRadius: 0,
                pointHoverRadius: 3      
                }
              ]
            }
            this.setState({data:this.state.data, loading:true, dataC: cData});
    }
    async someFunc(){        
        await axios.get(proxyurl + API).then(response => {
            const data = response.data;
            //console.log(data);
            this.setState({ data:data, cData:this.state.cData });     
        });
        this.createDataSet(); 
        input[0] = 1;
        console.log(input);
        this.forceUpdate();
    }
  
    
        render(){
            const {loading} = this.state;
            return(
            <Container fluid className="main-content-container px-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
            <PageTitle title="Device One" subtitle="" className="text-sm-left mb-3" />
            </Row>      
            <Row>        
                <Col className="col-lg mb-4">
                {loading ?
                <SmallStats                
                    variation="1"
                    chartData={DeviceOne.props.temperature.datasets}
                    chartLabels={DeviceOne.props.temperature.chartLabels}
                    label={DeviceOne.props.temperature.label}
                    value={this.state.data.rows[0].value}
                    percentage={DeviceOne.props.temperature.percentage}
                    increase={DeviceOne.props.temperature.increase}
                    decrease={DeviceOne.props.temperature.decrease}
                />:null
                }
                </Col>
                <Col>
                <SmallStats                
                    variation="1"
                    chartData={DeviceOne.props.battery.datasets}
                    chartLabels={DeviceOne.props.battery.chartLabels}
                    label={DeviceOne.props.battery.label}
                    value={DeviceOne.props.battery.value}
                    percentage={DeviceOne.props.battery.percentage}
                    increase={DeviceOne.props.battery.increase}
                    decrease={DeviceOne.props.battery.decrease}
                />
                </Col>                
            </Row>
             
            <Row>
            {/* Temperature Chart */}
            <Col lg="12" md="12" sm="12" className="mb-4">               
                 {loading ? 
               <SensorData title= {DeviceOne.props.title} chartData = {this.state.dataC}/>:null }  
            
            </Col>
            </Row>
            
            </Container>
        )
            
    }

}

DeviceOne.propTypes = {

};

DeviceOne.props = {
    title: "Temperature Data",
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
        }
      ]
    },
    temperature: {
          label: "Temperature",
          value: "76",
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
    battery: {
          label: "Battery",
          value: "100%",
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

DeviceOne.defaultProps = {
  
};

export default DeviceOne;
