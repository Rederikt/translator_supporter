import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import "./App.css"
import {
  Title,
  SignIn,
  SignUp,
  Order,
  OrderList,
  Thanks,
  OrderComment,
  Payment,
} from "./containers"
import { Header } from "./components"
import "fontsource-roboto"
import { AuthProvider } from "./context/auth"
import { PrivateRoute } from "./context/privateRoute"
import { PublicRoute } from "./context/publicRoute"
import { OrderProvider } from "./context/order"

const App = () => {
  return (
    <AuthProvider>
      <OrderProvider>
        <Router>
          <Header />
          <Switch>
            <PublicRoute path={`/signin`} component={SignIn} />
            <PublicRoute path={`/signup`} component={SignUp} />
            <PrivateRoute path={`/order`} component={Order} />
            <PrivateRoute path={`/thank`} component={Thanks} />
            <Route exact path={`/`} component={Title} />
            <PrivateRoute path={`/orderlist`} component={OrderList} />
            <PrivateRoute path={`/comment`} component={OrderComment} />
            <PrivateRoute path={`/payment`} component={Payment} />
          </Switch>
        </Router>
      </OrderProvider>
    </AuthProvider>
  )
}

export default App
