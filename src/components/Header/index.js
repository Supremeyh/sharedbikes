import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './index.less'
import Util from '../../util/util'
import axios from 'axios'

class Header extends Component {
  state = {
    userName: 'Supremeyh'
  }
  componentWillMount() {
    this.getWeather()
    setInterval(() => {
      let systemTime = Util.formatDate(new Date().getTime())
      this.setState({
        systemTime
      })
      
    }, 1000);
  }

  getWeather() {
    axios.get('http://api.map.baidu.com/telematics/v3/weather?location=北京&output=json&ak=zf8mf17nBvG5EKZA0wR2TjonTZib7Rv8')
      .then(res => {
        console.log(res)
        
      })
    // zf8mf17nBvG5EKZA0wR2TjonTZib7Rv8
  }

  render() {
    return (
      <div className='header'>
        <Row className='top'>
          <Col span={24}>
            <span>欢迎， {this.state.userName}</span>
            <a href='#'>退出</a>
          </Col>
        </Row>
        <Row className='breadcrumb'>
          <Col span={4} className='title'>首页</Col>
          <Col span={20} className='weather'>
            <span className='date'>{this.state.systemTime}</span>
            <span className='detail'>晴转多云</span>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Header