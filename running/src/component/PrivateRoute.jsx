import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, isAuth, weather, city, country, businessNews, sportsNews, techNews, user ,...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} {...weather} {...user} city={city} country={country} {...businessNews} {...sportsNews} {...techNews}/> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;