import React, { Component, Fragment } from 'react'
import { Row, Col, Icon } from 'antd'
import './index.less'
import Utils from '../../util/util'
import request from '../../request'

class Header extends Component {
  state = {
    userName: 'Supremeyh',
    weather: '',
    dayPictureUrl: ''
  }
  componentWillMount() {
    this.getWeather()
    setInterval(() => {
      let systemTime = Utils.formatDate(new Date().getTime())
      this.setState({
        systemTime
      })
    }, 1000);
  }

  getWeather() {
    let city = encodeURIComponent('北京')
    // let ak = 'gAInfsvkT2wrwhbWG7obgNvEP7bEW2kf'
    let ak = '3p49MVra6urFRGOT9s8UBWr2'
    request.jsonp({
      url: 'http://api.map.baidu.com/telematics/v3/weather?location='+city+'&output=json&ak=' + ak
    })
      .then(res => {
        if(res.status === 'success') {
          const data = res.results[0].weather_data[0]
          this.setState(() => ({
            weather: data.weather,
            dayPictureUrl: data.dayPictureUrl
          }))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { userName, systemTime, weather, dayPictureUrl } = this.state
    const { menuType } = this.props
    return (
      <div className='header'>
        <Row className='top'>
          {
            menuType ? (
              <Col span={6}>
                <div className='logo'>
                  <Icon className='logo-img' type="twitter" />
                  <h1>Shared Bikes</h1>
                </div>
              </Col>
            ) : null
          }
          <Col span={ menuType ? 18 : 24}>
            <span>欢迎， {userName}</span>
            <a href='javascript:;'>退出</a>
          </Col>
        </Row>
        {
          menuType ? null : (
            <Row className='breadcrumb'>
              <Col span={4} className='title'>首页</Col>
              <Col span={20} className='weather'>
                <span className='date'>{systemTime}</span>
                <div className='detail'>
                  <img className='detail-img' src={dayPictureUrl} alt=''/>
                  <span>{weather}</span>
                </div>
              </Col>
            </Row>
          )
        }
      </div>
    )
  }
}

export default Header