import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import App from '../App'
import Login from '../pages/login'
import Home from '../pages/home'
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
import RichText from '../pages/richText'
import Permission from '../pages/permission'
import NotFound from '../pages/notFound'

class IRouter extends Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path='/login' component={Login}></Route>
            <Route path='/common' render={() => 
              <Common>
                <Route path='/common/order/detail/:orderId' component={OrderDetail}></Route>
              </Common>
            }>
            </Route>
            <Route path='/' render={ () => 
                <Admin>
                  <Switch>
                    <Route path='/home' component={Home}></Route>
                    <Route path='/ui/button' component={Button}></Route>
                    <Route path='/ui/modal' component={Modal}></Route>
                    <Route path='/ui/spin' component={Spin}></Route>
                    <Route path='/ui/gallery' component={Gallery}></Route>
                    <Route path='/ui/carousel' component={Carousel}></Route>
                    <Route path='/form/login' component={LoginForm}></Route>
                    <Route path='/form/register' component={Register}></Route>
                    <Route path='/table' component={Table}></Route>
                    <Route path='/city' component={City}></Route>
                    <Route path='/order' component={Order}></Route>
                    <Route path='/user' component={User}></Route>
                    <Route path='/bikemap' component={BikeMap}></Route>
                    <Route path='/bar' component={Bar}></Route>
                    <Route path='/pie' component={Pie}></Route>
                    <Route path='/richtext' component={RichText}></Route>
                    <Route path='/permission' component={Permission}></Route>
                    <Redirect to='/home'></Redirect>
                    <Route component={NotFound}></Route>
                  </Switch>
                </Admin>
              }>
            </Route>
          </Switch>
        </App>
      </Router>
    )
  }
}

export default IRouter