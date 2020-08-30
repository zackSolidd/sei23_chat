import React, { Component } from "react";
import { Row, Form, Button, Container } from "react-bootstrap";

export default class register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    isAuth: false,
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  registerHandler = () => {
    //login here
    this.props.register(this.state);
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <div>
          <Container>
            <Row>
              <Form.Control
                name="username"
                type="username"
                placeholder="username"
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              <Form.Control
                name="email"
                type="email"
                placeholder="email"
                onChange={this.changeHandler}
              />
            </Row>
            <Row>
              <Form.Control
                name="password"
                type="password"
                placeholder="password"
                onChange={this.changeHandler}
              />
            </Row>
            <Button variant="primary" block onClick={this.registerHandler}>
              {" "}
              Register
            </Button>
          </Container>
        </div>
      </div>
    );
  }
}
