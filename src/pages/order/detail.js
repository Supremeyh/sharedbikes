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
      this.setState({
        orderInfo: res.result
      })
    })
  }

  render() {
    const { orderInfo } = this.state
    return (
      <div className='detail'>
        <Card>
          <div id='orderDetailMap'></div>
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