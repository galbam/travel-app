import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  user,
  path,
  redirectPath = "/",
  ...rest
}) => {
  return (
    <Route
      path={path}
      render={props => {
        return user ? (
          <Component {...props} {...rest} user={user} />
        ) : (
          <Redirect to={redirectPath} />
        );
      }}
    />
  );
};

export default ProtectedRoute;
