import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RoutesProtected({ component: Component, ...rest }) {
  const [user, loading] = useAuth();
  return (
    loading && (
      <Route
        {...rest}
        render={(props) => {
          if (user && user.type === "admin") {
            return <Component key={props.match.params.id} {...props} />;
          } else {
            return <Redirect to={"/"} />;
          }
        }}
      ></Route>
    )
  );
}

export default RoutesProtected;
