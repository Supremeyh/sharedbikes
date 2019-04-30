import React, { Component } from 'react'
import { Card, Button, Table, Form, Select, Modal, message, DatePicker } from 'antd'
import request from '../../request'
import Utils from '../../util/util'
const FormItem = Form.Item
const Option = Select.Option


class Order extends Component {
  state = {
    list: [],
    selectedRowKeys: '',
    selectedRowItem: {} 
  }

  params = {
    page: 1
  }

  componentDidMount() {
    this.getOrderList()
  }

  getOrderList = () => {
    request.axios({
      url: 'order_list',
      method: 'get',
      params: {
        page: this.params.page
      }
    }).then(res => {
      console.log(res)
      
      const list = res.result.item_list
      list.map((item) => {
        item.key =item.id
        return item
      })
      this.setState({
        list,
        pagination: Utils.pagination(res.result, (current) => {
          this.params.page = current
        })
      })
    })
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
    console.log(orderInfo)
    
    if(!orderInfo.id) {
      Modal.info({title: '提示', content: '请选择一条订单'})
      return
    }
    window.open(`/common/order/detail/${orderInfo.id}`, '_blank')
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
          <FilterFormWrap />
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


class FilterForm extends React.Component{

  render(){
      const { getFieldDecorator } = this.props.form;
      return (
          <Form layout="inline">
            <FormItem label="城市">
              {
                getFieldDecorator('city_id')(
                  <Select
                    style={{width:100}}
                    placeholder="全部">
                      <Option value="">全部</Option>
                      <Option value="1">北京市</Option>
                      <Option value="2">天津市</Option>
                      <Option value="3">深圳市</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="开始时间">
              {
                getFieldDecorator('start_time')(
                  <DatePicker
                    showTime
                    format='YYYY-MM-DD HH:mm:ss'>
                  </DatePicker>
                )
              }
          </FormItem>
          <FormItem label="结束时间">
              {
                getFieldDecorator('end_time')(
                  <DatePicker
                    showTime
                    format='YYYY-MM-DD HH:mm:ss'>
                  </DatePicker>
                )
              }
          </FormItem>
            <FormItem label="订单状态">
              {
                getFieldDecorator('status')(
                  <Select
                    style={{ width: 120 }}
                    placeholder="全部">
                      <Option value="">全部</Option>
                      <Option value="1">进行中</Option>
                      <Option value="2">已完成</Option>
                  </Select>
                )
              }
          </FormItem>
          <FormItem>
            <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
            <Button>重置</Button>
          </FormItem>
        </Form>
      );
  }
}
const FilterFormWrap = Form.create({})(FilterForm)