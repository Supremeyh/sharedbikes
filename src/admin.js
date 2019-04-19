import React, { Component } from 'react'
import { Row, Col } from 'antd';
import Home from './pages/home'
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft'
import './style/common.less'

class Admin extends Component {
  render() {
    return (
      <Row className='container'>
        <Col className='nav-left' span={4}>
          <NavLeft></NavLeft>
        </Col>
        <Col className='main' span={20}>
          <Header className='header'>Header</Header>
            {/* <Home className='content'></Home> */}
            {this.props.children}
          <Footer className='footer'></Footer>
        </Col>
      </Row>
    )
  }
}
export default Admin