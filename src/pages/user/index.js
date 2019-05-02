import React, { Component } from 'react'
import { Card, Table } from 'antd'
import BaseForm from '../../components/BaseForm'
import request from '../../request'


class User extends Component {
  state = {
    list: [],
    pagination: '',
    selectedRowKeys: '',
    selectedRowItem: [],
  }
  
  params = {
    page: 1
  }

  formList = [
    {
      type: 'Input',
      label: '用户名',
      field: 'user_name',
      width: 100,
      placeholder: '输入用户名'
    },
    {
      type: 'Input',
      label: '手机号',
      field: 'user_mobile',
      width: 100,
      placeholder: '输入手机号'
    },
    {
      type: 'DatePicker',
      label: '选择时间',
      field: 'time',
      width: 100
    },
  ]

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRowItem: selectedRows[0]})
  }

  handleFilter = (params) => {
    this.params = params
    this.getUserList()
  }

  getUserList = () => {
    let _this = this
    request.requestList(_this, 'user_list', _this.params, this.getUserList)
  }

  componentDidMount() {
    this.getUserList()
  }

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width: 60
      },
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex===1 ? '男' : '女'
        }
      },
      {
        title: '兴趣',
        dataIndex: 'interest',
        render(interest) {
          return {
            '1': '游泳',
            '2': '跑步',
            '3': '滑雪',
            '4': '拳击',
          }[interest]
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          const config = {
            '1': '菜鸟',
            '2': '大神',
            '3': '骨灰'
          }
          return config[state]
        }
      },
      {
        title: '是否已婚',
        dataIndex: 'isMarried',
        width: 100
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      }
    ]

    const rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange
    }

    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter}></BaseForm>
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


export default User