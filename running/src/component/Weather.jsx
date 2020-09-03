import React, { Component } from "react";
import { Card } from "react-bootstrap";


export default class Weather extends Component {
  render() {
    return (
      <div>
        <Card style={{ width: "15rem", height: "10rem" }}>
          <Card.Body>
            <Card.Title>{this.props.city} weather</Card.Title>
            <Card.Text>
              
              <span>Temp : {this.props.weather.temp} °C</span><br />
              <span>Temp Min : {this.props.weather.temp_min} °C</span><br />
              <span>Temp Max : {this.props.weather.temp_max} °C</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
