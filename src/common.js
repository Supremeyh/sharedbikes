import React, { Component, Fragment } from 'react'
import { Row } from 'antd';
import Header from './components/Header'
import Footer from './components/Footer'
import './style/common.less'

class Admin extends Component {
  render() {
    return (
      <Fragment>
        <Row className='simple-page'>
          <Header className='header' menuType='second'>Header</Header>
        </Row>
        <Row className='content'>
          {this.props.children}
        </Row>
        <Row>
          <Footer/>
        </Row>
      </Fragment>
    )
  }
}
export default Admin