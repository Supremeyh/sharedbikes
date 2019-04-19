import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../App'
import Login from '../pages/login'
import Admin from '../admin'
import Button from '../pages/admin/ui/button'
import Modal from '../pages/admin/ui/modal'
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
                  <Route component={NotFound}></Route>
                </Switch>
              </Admin>
            }>
          </Route>
        </App>
      </Router>
    )
  }
}

export default IRouter