import React, { Component } from 'react'
import { Card, Table, Button, Modal, Form, Input, Radio, DatePicker, Select, message } from 'antd'
import moment from 'moment'
import BaseForm from '../../components/BaseForm'
import request from '../../request'
import './index.less'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const TextArea = Input.TextArea
const Option = Select.Option

class User extends Component {
  state = {
    list: [],
    pagination: '',
    selectedRowKeys: '',
    selectedRowItem: [],
    type: '',
    isVisible: false
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

  handleOperate = (type) => {
    let item = this.state.selectedRowItem
    if(type==='create') {
      this.setState({
        type,
        isVisible: true,
        title: '创建员工',
        userInfo: {}
      })
    } else if (type==='edit') {
      if(!item.id) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return
      }
      this.setState({
        type,
        isVisible: true,
        title: '编辑员工',
        userInfo: item
      })
    } else if (type==='detail') {
      if(!item.id) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return
      }
      this.setState({
        type,
        isVisible: true,
        title: '员工详情',
        userInfo: item
      })
    } else {
      let that = this
      if(!item.id) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return
      }
      Modal.confirm({
        title: '确认删除',
        content: '是否要删除当前用户?',
        onOk() {
          request.axios({
            url: 'user/delete',
            method: 'delete',
            data: {id: item.id}
          }).then(res => {
            if(res.code===2000) {
              message.success('删除成功')
              that.setState({
                isVisible: false,
                selectedRowKeys: '',
                selectedRowItem: []
              })
              that.getUserList()
            }
          })
        }
      })
    }
  }

  handleModalSubmit = () => {
    const type = this.state.type
    const userInfo = this.userForm.props.form.getFieldsValue()
    request.axios({
      url:  type==='edit' ? 'user/edit' : 'user/create',
      method: 'post',
      data: userInfo
    }).then(res => {
      if(res.code===2000) {
        message.success('创建成功')
        this.handleModalCancel()
        this.getUserList()
      }
      this.getUserList()
    })
  }
  handleModalCancel = () => {
    this.userForm.props.form.resetFields()
    this.setState({
      isVisible: false
    })
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

    let footer = {}
    if(this.state.type==='detail') {
      footer = {
        footer: null
      }
    }

    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter}></BaseForm>
        </Card>
        <Card className='operate-wrap'>
          <Button type='primary' icon='plus' onClick={() => this.handleOperate('create')}>创建员工</Button>
          <Button type='primary' icon='edit' onClick={() => this.handleOperate('edit')}>编辑员工</Button>
          <Button type='primary' onClick={() => this.handleOperate('detail')}>员工详情</Button>
          <Button icon='delete'  onClick={() => this.handleOperate('delete')}>删除员工</Button>
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
        <Modal 
          title={this.state.title} 
          visible={this.state.isVisible}
          width={600}
          onOk={this.handleModalSubmit}
          onCancel={this.handleModalCancel}
          {...footer}>
          <UserFormWrap 
            type={this.state.type} 
            userInfo={this.state.userInfo} 
            wrappedComponentRef={(form) => this.userForm= form}/>
        </Modal>
      </div>
    )
  }
}


export default User


class UserForm extends Component {
  mapSex = (sex) => {
    return sex===1 ? '男' : '女'
  }

  mapState = (state) => {
    return {
      '1': '菜鸟',
      '2': '大神',
      '3': '骨灰'
    }[state]
  }

  render() {
    let type = this.props.type
    let userInfo = this.props.userInfo ||  {}
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
    }

    return (
      <Form layout='horizontal' {...formItemLayout}>
        <FormItem label='用户名'>
          {
            type==='detail' ? userInfo.username :
            getFieldDecorator('user_name', {
              initialValue: userInfo.username
            })(
              <Input text='text' placeholder='用户名'/>
            )
          }
        </FormItem>
        <FormItem label='性别'>
          {
            type==='detail' ? this.mapSex(userInfo.sex) :
            getFieldDecorator('sex', {
              initialValue: userInfo.sex
            })(
              <RadioGroup>
                <Radio value={0}>男</Radio>
                <Radio value={1}>女</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <FormItem label='状态'>
          {
            type==='detail' ? this.mapState(userInfo.state) :
            getFieldDecorator('state', {
              initialValue: userInfo.state
            })(
              <Select>
                <Option value={1}>菜鸟</Option>
                <Option value={2}>大神</Option>
                <Option value={3}>骨灰</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label='生日'>
          {
            type==='detail' ? userInfo.birthday :
            getFieldDecorator('birthday', {
              initialValue: type === 'edit' ? moment(userInfo.birthday) : null
            })(
              <DatePicker />
            )
          }
        </FormItem>
        <FormItem label='地址'>
          {
            type==='detail' ? userInfo.address :
            getFieldDecorator('address', {
              initialValue: userInfo.address
            })(
              <TextArea row={3} placeholder='请输入联系地址'/>
            )
          }
        </FormItem>
      </Form>
    )
  }
}

const UserFormWrap = Form.create({})(UserForm)