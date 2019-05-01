import React, { Component } from 'react'
import { Card } from 'antd'
import request from '../../request'
import './detail.less'

class OrderDetail extends Component {

  state = {
    orderInfo: []
  }

  params = {
    page: 1
  }

  componentDidMount() {
    this.getOrderDetail()
  }

  getOrderDetail = () => {
    let orderId = this.props.match.params.orderId
    request.axios({
      url: 'order/detail',
      method: 'get',
      params: {
        orderId: orderId
      }
    }).then(res => {
      this.renderMap(res.result)
      this.setState({
        orderInfo: res.result
      })
    })
  }

  renderMap = (result) => {
    this.map = new window.BMap.Map('orderDetailMap')
    this.map.enableScrollWheelZoom(true)
    this.map.addControl(new window.BMap.NavigationControl())
    this.addMapControl()
    this.drawBikeRoute(result.position_list)
    this.drawServiceArea(result.area)
  }

  addMapControl = () => {
    let map = this.map    
    map.addControl(new window.BMap.ScaleControl())
    map.addControl(new window.BMap.NavigationControl())
    map.addControl(new window.BMap.ScaleControl())
    map.addControl(new window.BMap.OverviewMapControl())
    map.addControl(new window.BMap.MapTypeControl())
    map.setCurrentCity("北京")
  }

  drawBikeRoute = (positionList) => {
    let map = this.map
    let startPoint = ''
    let endPoint = ''
    if(positionList.length > 0) {
      let first = positionList[0]
      let last = positionList[positionList.length-1]
      startPoint = new window.BMap.Point(first.lon, first.lat)
      endPoint = new window.BMap.Point(last.lon, last.lat)
      let startIcon = new window.BMap.Icon('/assets/images/start_point.png', new window.BMap.Size(36, 42), {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(36, 42)
      })
      let endIcon = new window.BMap.Icon('/assets/images/end_point.png', new window.BMap.Size(36, 42), {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(36, 42)
      })
      let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon })
      let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon })
      map.addOverlay(startMarker)
      map.addOverlay(endMarker)

      let trackPoint = []
      for(let i=0; i<positionList.length; i++) {
        let point = positionList[i]
        trackPoint.push(new window.BMap.Point(point.lon, point.lat))
      }
      let polyline = new window.BMap.Polyline(trackPoint, {
        strokeColor: 'blue',
        strokeWeight: 2,
        strokeOpacity: 0.8
      })
      map.addOverlay(polyline)
      this.map.centerAndZoom(startPoint, 12)
    }
  }

  drawServiceArea = (positionList) => {
    let map = this.map
    let trackPoint = []
    for(let i=0; i<positionList.length; i++) {
      let point = positionList[i]
      trackPoint.push(new window.BMap.Point(point.lon, point.lat))
    }

    let polygon = new window.BMap.Polygon(trackPoint, {
      strokeColor: 'red',
      strokeWeight: 2,
      strokeOpacity: 0.8,
      fillColor: '#ff8605',
      fillOpacity: 0.3
    })
    map.addOverlay(polygon)
  }

  render() {
    const { orderInfo } = this.state
    return (
      <div className='detail'>
        <Card>
          <div id='orderDetailMap' className='order-map'></div>
          <div className='detail-items'>
            <div className='item-title'>基础信息</div>
            <ul className='detail-form'>
              <li>
                <div className='detail-form-left'>用车模式</div>
                <div className='detail-form-right'>{orderInfo.mode===1 ? '服务区' : '停车点'}</div>
              </li>
              <li>
                <div className='detail-form-left'>订单编号</div>
                <div className='detail-form-right'>{orderInfo.order_sn}</div>
              </li>
              <li>
                <div className='detail-form-left'>车辆编号</div>
                <div className='detail-form-right'>{orderInfo.bike_sn}</div>
              </li>
              <li>
                <div className='detail-form-left'>用户姓名</div>
                <div className='detail-form-right'>{orderInfo.user_name}</div>
              </li>
              <li>
                <div className='detail-form-left'>手机号码</div>
                <div className='detail-form-right'>{orderInfo.mobile}</div>
              </li>
            </ul>
          </div>

          <div className='detail-items'>
            <div className='item-title'>行驶轨迹</div>
            <ul className='detail-form'>
              <li>
                <div className='detail-form-left'>行程起点</div>
                <div className='detail-form-right'>{orderInfo.start_location}</div>
              </li>
              <li>
                <div className='detail-form-left'>行程终点</div>
                <div className='detail-form-right'>{orderInfo.end_location}</div>
              </li>
              <li>
                <div className='detail-form-left'>行驶里程</div>
                <div className='detail-form-right'>{orderInfo.distance}</div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    )
  }
}


export default OrderDetail