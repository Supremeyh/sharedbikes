import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './index.less'
import Util from '../../util/util'
import Aixos from '../../axios'

class Header extends Component {
  state = {
    userName: 'Supremeyh',
    weather: '',
    dayPictureUrl: ''
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
    let city = encodeURIComponent('北京')
    // let ak = 'gAInfsvkT2wrwhbWG7obgNvEP7bEW2kf'
    let ak = '3p49MVra6urFRGOT9s8UBWr2'
    Aixos.jsonp({
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
    return (
      <div className='header'>
        <Row className='top'>
          <Col span={24}>
            <span>欢迎， {userName}</span>
            <a href='#'>退出</a>
          </Col>
        </Row>
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
      </div>
    )
  }
}

export default Header