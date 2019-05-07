import React, { Component } from 'react'
import { Card, Button, Table, Modal } from 'antd'
import BaseForm from '../../components/BaseForm'
import request from '../../request'


class Order extends Component {
  state = {
    list: [],
    selectedRowKeys: '',
    selectedRowItem: {} 
  }

  params = {
    page: 1
  }

  formList = [
    {
      type: 'Select',
      label: '城市',
      field: 'city_id',
      width: 100,
      placeholder: '全部',
      initialValue: 0,
      list: [{id: 0, name: '全部'}, {id: 1, name: '北京'}, {id: 2, name: '上海'}, {id: 3, name: '重庆'}]
    },
    {
      type: 'DatePicker'
    },
    {
      type: 'Select',
      label: '订单状态',
      field: 'order_status',
      width: 100,
      placeholder: '全部',
      initialValue: 0,
      list: [{id: 0, name: '全部'}, {id: 1, name: '进行中'}, {id: 2, name: '结束行程'}]
    },
  ]

  componentDidMount() {
    this.getOrderList()
  }

  getOrderList = () => {
    let _this = this
    request.requestList(_this, 'order_list', _this.params, this.getOrderList)
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRowItem: selectedRows[0]})
  }

  onRowClick = (record, index) => {
    console.log(record, index)
    this.setState({
      selectedRowKeys: [index],
      selectedRowItem: record
    })
  }

  redirectToOrderDetail = () => {
    let orderInfo = this.state.selectedRowItem
    
    if(!orderInfo.id) {
      Modal.info({title: '提示', content: '请选择一条订单'})
      return
    }
    window.open(`/common/order/detail/${orderInfo.id}`, '_blank')
  }

  handleFilter = (params) => {
    this.params = params
    this.getOrderList()
  }

  render() {
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'order_sn'
      },
      {
        title: '车辆编号',
        dataIndex: 'bike_sn'
      },
      {
        title: '用户名',
        dataIndex: 'user_name'
      },
      {
        title: '手机号',
        dataIndex: 'mobile'
      },
      {
        title: '里程',
        dataIndex: 'distance'
      },
      {
        title: '行驶时长',
        dataIndex: 'total_time'
      },
      {
        title: '状态',
        dataIndex: 'status'
      },
      {
        title: '开始时间',
        dataIndex: 'start_time'
      },
      {
        title: '结束时间',
        dataIndex: 'end_time'
      },
      {
        title: '订单金额',
        dataIndex: 'total_fee' 
      },
      {
        title: '实付金额',
        dataIndex: 'user_pay'
      }
    ]

    const rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange
    }


    return (
      <div className='order'>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
        </Card>
        <Card>
          <Button type='primary' onClick={this.redirectToOrderDetail}>订单详情</Button>
          <Button type='primary'>结束订单</Button>
        </Card>
        <Card title='Order'>
          <Table 
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            >
          </Table>
        </Card>
      </div>
    )
  }
}

export default Order