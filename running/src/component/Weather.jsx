import React, { Component } from "react";
import { Card } from "react-bootstrap";


export default class Weather extends Component {
  render() {
    return (
      <div>
        <Card style={{ width: "15rem", height: "11rem" }}>
          <Card.Body>
            <Card.Title>{this.props.city} weather</Card.Title>
            <Card.Text>
              <li>{this.props.weather.temp} °C</li>
              <li>{this.props.weather.temp_min} °C</li>
              <li>{this.props.weather.temp_max} °C</li>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
