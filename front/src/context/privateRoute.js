import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "./auth"

export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { userInfo, currentStatus } = useContext(AuthContext)
  return currentStatus ? (
    <Route
      {...rest}
      render={(routeProps) =>
        userInfo ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/signin"} />
        )
      }
    />
  ) : null
}
