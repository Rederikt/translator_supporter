import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "./auth"

export const PublicRoute = ({ component: RouteComponent, ...rest }) => {
  const { userInfo, currentStatus } = useContext(AuthContext)
  return currentStatus ? (
    <Route
      {...rest}
      render={(routeProps) =>
        userInfo ? <Redirect to={"/"} /> : <RouteComponent {...routeProps} />
      }
    />
  ) : null
}
