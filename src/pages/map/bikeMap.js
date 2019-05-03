import React, { Component } from 'react'
import { Card, Form } from 'antd'
import request from '../../request'
import BaseForm from '../../components/BaseForm'


const FormItem = Form.Item


class BikeMap extends Component {

  state = {
    total_count: 0
  }

  map = {}

  params = {
    page: 1
  }

  formList = [
    {
      type: 'Select',
      label: '城市',
      field: 'city',
      placeholder: '全部',
      width: 100,
      initialValue: '0',
      list: [{id: '0', name: '全部'}, {id: '1', name: '北京'}, {id: '2', name: '天津'}, {id: '3', name: '上海'}]
    },
    {
      type: 'DatePicker',
      label: '选择时间',
      field: 'time',
      width: 100
    },
    {
      type: 'Select',
      label: '订单状态',
      field: 'order_status',
      placeholder: '全部',
      width: 100,
      initialValue: '0',
      list: [{id: '0', name: '全部'}, {id: '1', name: '进行中'}, {id: '2', name: '行程结束'}]
    }
  ]

  handleFilter = (params) => {
    this.params = params
    this.getBikeMapList()
  }


  componentDidMount() {
    this.getBikeMapList()
  }

  getBikeMapList = () => {
    request.axios({
      url: 'map/bike_list',
      method: 'get',
      params: this.params
    }).then(res => {
      if(res.code===2000) {
        console.log(res) 
        
        this.renderMap(res.result)
        this.setState({
          total_count: res.result.total_count
        })
      }
    })
  }

  renderMap = (res) => {
    let BMap = window.BMap
    this.map = new BMap.Map('bikeMapContainer')
    this.map.enableScrollWheelZoom(true)
    this.map.addControl(new window.BMap.NavigationControl())
    this.addMapControl()
    this.drawBikeRoute(res.route_list)
    this.drawServiceArea(res.service_list)
    this.drawBikeList(res.bike_list)
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
    let BMap = window.BMap
    let gps1 = positionList[0].split(',')
    let gps2 = positionList[positionList.length-1].split(',')
    let startPoint = new BMap.Point(gps1[0], gps1[1])
    let endPoint = new BMap.Point(gps2[0], gps2[1])

    let startIcon = new window.BMap.Icon('/assets/images/start_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 21)
    })
    let endIcon = new window.BMap.Icon('/assets/images/end_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 21)
    })
    let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon })
    let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon })
    map.addOverlay(startMarker)
    map.addOverlay(endMarker)

    let trackPoint = []
      for(let i=0; i<positionList.length; i++) {
        let point = positionList[i].split(',')
        trackPoint.push(new window.BMap.Point(point[0], point[1]))
      }
      let polyline = new window.BMap.Polyline(trackPoint, {
        strokeColor: 'blue',
        strokeWeight: 2,
        strokeOpacity: 0.8
      })
      map.addOverlay(polyline)
      this.map.centerAndZoom(endPoint, 12)
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

  drawBikeList = (bikeList) => {
    let map = this.map
    let bikeIcon = new window.BMap.Icon('/assets/images/bike.jpg', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 21)
    })
    bikeList.forEach((item) => {
      let p = item.split(',')
      let point = new window.BMap.Point(p[0], p[1])
      let bikeMarker = new window.BMap.Marker(point, {icon: bikeIcon})
      map.addOverlay(bikeMarker)
    })
  }

  render() {
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter}></BaseForm>
        </Card>
        <Card>
          <p>{this.state.total_count}</p>
          <div id='bikeMapContainer' style={{height: 500}}></div>
        </Card>
      </div>
    )
  }
}


export default BikeMap