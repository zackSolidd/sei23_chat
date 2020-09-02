import React, { Component } from "react";
import Weather from "./Weather";
import { Container, Row, Col, Card, CardDeck } from "react-bootstrap";
import Moment from "react-moment";

export default class Home extends Component {
  render() {
    //   console.log(this.props)
    return (
      <div>
        <Container>
          <Row>
            <Col sm={9} className="mt-5">
              <h1>Welcome to your dashboard, {this.props.username}</h1>
            </Col>
            <Col sm={3}>
              <Weather weather={this.props} city={this.props.city} />
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>Business News</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <CardDeck>
                <Card>
                  <Card.Img variant="top" src={this.props.news1.urlToImage} />
                  <Card.Body>
                    <Card.Title>{this.props.news1.title}</Card.Title>
                    <Card.Text>
                      <a href={this.props.news1.url}>
                        {this.props.news1.description}
                      </a>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Last updated{" "}
                      <Moment
                        date={this.props.news1.publishedAt}
                        durationFromNow
                      />{" "}
                      hours ago
                    </small>
                  </Card.Footer>
                </Card>
                <Card>
                  <Card.Img variant="top" src={this.props.news2.urlToImage} />
                  <Card.Body>
                    <Card.Title>{this.props.news2.title}</Card.Title>
                    <Card.Text>
                      <a href={this.props.news2.url}>
                        {this.props.news2.description}
                      </a>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Last updated{" "}
                      <Moment
                        date={this.props.news2.publishedAt}
                        durationFromNow
                      />{" "}
                      hours ago
                    </small>
                  </Card.Footer>
                </Card>
                <Card>
                  <Card.Img variant="top" src={this.props.news3.urlToImage} />
                  <Card.Body>
                    <Card.Title>{this.props.news3.title}</Card.Title>
                    <Card.Text>
                      <a href={this.props.news3.url}>
                        {this.props.news3.description}
                      </a>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Last updated{" "}
                      <Moment
                        date={this.props.news3.publishedAt}
                        durationFromNow
                      />{" "}
                      hours ago
                    </small>
                  </Card.Footer>
                </Card>
              </CardDeck>
            </Col>
          </Row>
          <Row className= 'mt-4'>
            <h3>Sport News</h3>
          </Row>
          <Row>
            <Col>
              <CardDeck>
                <Card>
                  <Card.Img variant="top" src={this.props.sportsnews1.urlToImage} />
                  <Card.Body>
                    <Card.Title>{this.props.sportsnews1.title}</Card.Title>
                    <Card.Text>
                      <a href={this.props.sportsnews1.url}>
                        {this.props.sportsnews1.description}
                      </a>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Last updated{" "}
                      <Moment
                        date={this.props.sportsnews1.publishedAt}
                        durationFromNow
                      />{" "}
                      hours ago
                    </small>
                  </Card.Footer>
                </Card>
                <Card>
                  <Card.Img variant="top" src={this.props.sportsnews2.urlToImage} />
                  <Card.Body>
                    <Card.Title>{this.props.sportsnews2.title}</Card.Title>
                    <Card.Text>
                      <a href={this.props.sportsnews2.url}>
                        {this.props.sportsnews2.description}
                      </a>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Last updated{" "}
                      <Moment
                        date={this.props.sportsnews2.publishedAt}
                        durationFromNow
                      />{" "}
                      hours ago
                    </small>
                  </Card.Footer>
                </Card>
                <Card>
                  <Card.Img variant="top" src={this.props.sportsnews3.urlToImage} />
                  <Card.Body>
                    <Card.Title>{this.props.sportsnews3.title}</Card.Title>
                    <Card.Text>
                      <a href={this.props.sportsnews3.url}>
                        {this.props.sportsnews3.description}
                      </a>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Last updated{" "}
                      <Moment
                        date={this.props.sportsnews3.publishedAt}
                        durationFromNow
                      />{" "}
                      hours ago
                    </small>
                  </Card.Footer>
                </Card>
              </CardDeck>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
