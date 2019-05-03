import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import App from '../App'
import Login from '../pages/login'
import Admin from '../admin'
import Button from '../pages/admin/ui/button'
import Modal from '../pages/admin/ui/modal'
import Spin from '../pages/admin/ui/spin'
import Gallery from '../pages/admin/ui/gallery'
import Carousel from '../pages/admin/ui/carousel'
import LoginForm from '../pages/admin/form/login'
import Register from '../pages/admin/form/register'
import Table from '../pages/admin/table'
import City from '../pages/city'
import Order from '../pages/order'
import Common from '../common'
import OrderDetail from '../pages/order/detail'
import BikeMap from '../pages/map/bikeMap'
import User from '../pages/user'
import Bar from '../pages/echarts/bar'
import Pie from '../pages/echarts/pie'
import NotFound from '../pages/notFound'

class IRouter extends Component {
  render() {
    return (
      <Router>
        <App>
          <Route path='/login' component={Login}></Route>
          <Route path='/admin' render={ () => 
              <Admin>
                <Switch>
                  <Route path='/admin/ui/button' component={Button}></Route>
                  <Route path='/admin/ui/modal' component={Modal}></Route>
                  <Route path='/admin/ui/spin' component={Spin}></Route>
                  <Route path='/admin/ui/gallery' component={Gallery}></Route>
                  <Route path='/admin/ui/carousel' component={Carousel}></Route>
                  <Route path='/admin/form/login' component={LoginForm}></Route>
                  <Route path='/admin/form/register' component={Register}></Route>
                  <Route path='/admin/table' component={Table}></Route>
                  <Route path='/admin/city' component={City}></Route>
                  <Route path='/admin/order' component={Order}></Route>
                  <Route path='/admin/user' component={User}></Route>
                  <Route path='/admin/bikemap' component={BikeMap}></Route>
                  <Route path='/admin/bar' component={Bar}></Route>
                  <Route path='/admin/pie' component={Pie}></Route>
                  <Route component={NotFound}></Route>
                </Switch>
              </Admin>
            }>
          </Route>
          <Route path='/common' render={() => 
            <Common>
              <Route path='/common/order/detail/:orderId' component={OrderDetail}></Route>
            </Common>
          }>
          </Route>
        </App>
      </Router>
    )
  }
}

export default IRouter