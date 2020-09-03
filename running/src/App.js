import React, { Component } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Axios from "axios";
import Register from "./component/auth/Register";
import { decode } from "jsonwebtoken";
import Home from "./component/Home";
import Login from "./component/auth/Login";
import Navigation from "./component/Navigation";
import PrivateRoute from "./component/PrivateRoute";
import { Alert } from "react-bootstrap";
import ChatRoom from "./component/ChatRoom/ChatRoom";

const URL = process.env.REACT_APP_URL;
const iptoken = process.env.REACT_APP_INFO_TOKEN;
const weather = process.env.REACT_APP_WEATHER;
const newsapi = process.env.REACT_APP_NEWSAPI
export default class App extends Component {
  state = {
    items: [],
    errorMessage: null,
    isAuth: false,
    user: null,
    city: "",
    country: "",
    weather: { temp: "", temp_max: "", temp_min: "" },
    businessNews: { news1: {}, news2: {}, news3: {} },
    sportsNews: { sportsnews1: {}, sportsnews2: {}, sportsnews3: {} },
    techNews: { technews1: {}, technews2: {}, technews3: {} },
  };

  logoutHandler = (e) => {
    e.preventDefault();
    console.log("i logged out");
    this.setState({
      items: [],
      errorMessage: null,
      isAuth: false,
      user: null,
    });
    localStorage.removeItem("token");
  };

  getUserProfile = (token) => {
    Axios.get(`${URL}/auth/user`, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        console.log(res.data);

        this.setState({
          isAuth: true,
          user: res.data.user,
        });
      })
      .catch((err) => {
        // console.log(err);
        // this.setState({
        //   isAuth: false,
        // });
      });
  };

  loginHandler = (credentials) => {
    //login here
    Axios.post(`${URL}/auth/login`, credentials)
      .then((res) => {
        console.log(res.data);

        localStorage.setItem("token", res.data.token);
        this.getUserProfile(res.data.token); //get uptodate user information

        // this.setState({
        //   isAuth: true,
        //   errorMessage: res.data.message,
        // });
      })
      .catch((err) => {
        // console.log(err);
        this.setState({
          isAuth: false,
          errorMessage: err.response.data.message,
        });
      });
  };
  registerHandler = (credentials) => {
    //login here
    console.log(URL);
    Axios.post(`${URL}/auth/register`, credentials)
      .then((res) => {
        // console.log(res.data);

        localStorage.setItem("token", res.data.token);
        this.getUserProfile(res.data.token);
        this.setState({
          isAuth: true,
        });
      })
      .catch((err) => {
        // console.log(err);
        this.setState({
          isAuth: false,
        });
      });
  };

  getUserCity = () => {
    Axios.get(`https://ipinfo.io/?token=${iptoken}`)
      .then((res) => {
        this.setState({ city: res.data.city });
        this.setState({ country: res.data.country });
        // console.log(res.data)
        Axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${res.data.city}&appid=${weather}&units=metric`
        )
          .then((res) => {
            // console.log(res.data.main);
            this.setState({
              weather: {
                temp: res.data.main.temp,
                temp_max: res.data.main.temp_max,
                temp_min: res.data.main.temp_min,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
        Axios.get(
          `http://newsapi.org/v2/top-headlines?country=${res.data.country}&category=business&apiKey=${newsapi}`
        )
          .then((res) => {
            // console.log(res.data);
            this.setState({
              businessNews: {
                news1: res.data.articles[0],
                news2: res.data.articles[1],
                news3: res.data.articles[2],
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
        Axios.get(
          `http://newsapi.org/v2/top-headlines?country=${res.data.country}&category=sports&apiKey=${newsapi}`
        )
          .then((res) => {
            //  console.log(res.data);
            this.setState({
              sportsNews: {
                sportsnews1: res.data.articles[0],
                sportsnews2: res.data.articles[1],
                sportsnews3: res.data.articles[2],
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
        Axios.get(
          `https://newsapi.org/v1/articles?source=the-verge&apiKey=${newsapi}`
        )
          .then((res) => {
            //  console.log(res.data);
            this.setState({
              techNews: {
                technews1: res.data.articles[0],
                technews2: res.data.articles[1],
                technews3: res.data.articles[2],
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    let token = localStorage.getItem("token");

    if (!(token == null)) {
      let decodedToken = decode(token);

      if (!decodedToken) {
        localStorage.removeItem("token");
      } else {
        this.getUserProfile(token);
        // this.setState({
        //   isAuth: true,
        // });
      }
    }
    this.getUserCity();
  }
  render() {
    let { isAuth, user, errorMessage } = this.state;
    return (
      <Router>
        <Navigation user={user} logout={this.logoutHandler} />
        {errorMessage && <Alert>{errorMessage}</Alert>}
        <Switch>
          <PrivateRoute
            exact
            path="/"
            isAuth={isAuth}
            component={Home}
            weather={this.state.weather}
            user={user}
            city={this.state.city}
            country={this.state.country}
            businessNews={this.state.businessNews}
            sportsNews={this.state.sportsNews}
            techNews={this.state.techNews}
          />
          <Route
            path="/register"
            exact
            render={() =>
              isAuth ? (
                <Redirect to="/" />
              ) : (
                <Register register={this.registerHandler} />
              )
            }
          />
          <Route
            path="/login"
            exact
            render={() =>
              isAuth ? <Redirect to="/" /> : <Login login={this.loginHandler} />
            }
          />
          <Route
            path="/chat"
            exact
            render={() =>
              isAuth ? (
                <ChatRoom user={user} />
              ) : (
                <Login login={this.loginHandler} />
              )
            }
          />
        </Switch>
      </Router>
    );
  }
}
