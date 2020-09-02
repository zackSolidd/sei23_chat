import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, isAuth, weather, city, country, businessNews, sportsNews, user ,...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} {...weather} {...user} city={city} country={country} {...businessNews} {...sportsNews} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;