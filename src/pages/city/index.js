import React, { Component } from 'react'
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import request from '../../request';
import Utils from '../../util/util';
const FormItem = Form.Item;
const Option = Select.Option;


class City extends Component {

  state = {
    list: [],
    isShowOpenCity: false
  }

  params = {
    page: 1
  }

  componentDidMount() {
    this.getOpenCity()
  }

  getOpenCity = () => {
    request.axios({
      url: '/open_city',
      method: 'get',
      params: {
        page: this.params.page
      }
    }).then((res) => {
      const list = res.result.item_list
      list.map((item, index) => {
        item.key= index
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

  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    })
  }

  handleSubmit = () => {
    let openCityInfo = this.OpenCityForm.props.form.getFieldsValue()
    request.axios({
      url: 'city_open',
      method: 'post',
      data: openCityInfo
    }).then(res => {
      message.success('开通成功')
      this.setState({
        isShowOpenCity: false
      })
      this.getOpenCity()
    })
    
  } 

  render() {

    const columns = [
      {
          title:'城市ID',
          dataIndex:'id'
      }, {
          title: '城市名称',
          dataIndex: 'name'
      }, {
          title: '用车模式',
          dataIndex: 'mode',
          render(mode){
              return mode ===1 ?'停车点':'禁停区';
          }
      }, {
          title: '营运模式',
          dataIndex: 'op_mode',
          render(op_mode) {
              return op_mode === 1 ? '自营' : '加盟';
          }
      }, {
          title: '授权加盟商',
          dataIndex: 'franchisee_name'
      }, {
          title: '城市管理员',
          dataIndex: 'city_admins',
          render(arr) {
            return arr.map((item) => {
              return item.user_name
            }).join(', ')
          },
      }, {
          title: '城市开通时间',
          dataIndex: 'open_time'
      }, {
          title: '操作时间',
          dataIndex: 'update_time',
          render(time) {
            return Utils.formatDate(time)
          }
      }, {
          title: '操作人',
          dataIndex: 'sys_user_name'
      }
    ]

    return (
      <div className='city'>
        <Card>
          <FilterFormWrap/>
        </Card>
        <Card>
          <Button type='primary' onClick={this.handleOpenCity}>开通城市</Button>
        </Card>
        <Card title='City'>
          <Table 
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}>
          </Table>
        </Card>
        <Modal 
          title='开通城市'
          visible={this.state.isShowOpenCity}
          onOk={this.handleSubmit}
          onCancel={() => {
            this.setState({
              isShowOpenCity: false
            })
          }}>
          <OpenCityFormWrap wrappedComponentRef={(form) => this.OpenCityForm = form}/>
        </Modal>
      </div>
    )
  }
}

export default City


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
            <FormItem label="用车模式">
              {
                getFieldDecorator('mode')(
                  <Select
                    style={{ width: 120 }}
                    placeholder="全部">
                      <Option value="">全部</Option>
                      <Option value="1">指定停车点模式</Option>
                      <Option value="2">禁停区模式</Option>
                  </Select>
                )
              }
          </FormItem>
          <FormItem label="营运模式">
            {
              getFieldDecorator('op_mode')(
                <Select
                  style={{ width: 80 }}
                  placeholder="全部">
                    <Option value="">全部</Option>
                    <Option value="1">自营</Option>
                    <Option value="2">加盟</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem label="加盟商授权状态">
            {
              getFieldDecorator('auth_status')(
                <Select
                  style={{ width: 100 }}
                  placeholder="全部">
                    <Option value="">全部</Option>
                    <Option value="1">已授权</Option>
                    <Option value="2">未授权</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem>
            <Button type="primary" style={{margin:'0 30px 0 80px'}}>查询</Button>
            <Button>重置</Button>
          </FormItem>
        </Form>
      );
  }
}
const FilterFormWrap = Form.create({})(FilterForm)


class OpenCityForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 12}
    }
    return (
      <Form layout='horizontal' {...formItemLayout}>
        <FormItem label='选择城市'>
          {
            getFieldDecorator('city_id', {
              initialValue: '1'
            })(
              <Select>
                <Option value='0'>全部</Option>
                <Option value='1'>北京</Option>
                <Option value='2'>上海</Option>
                <Option value='3'>成都</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label='运营模式'>
          {
            getFieldDecorator('op_mode', {
              initialValue: '1'
            })(
              <Select>
                <Option value='0'>全部</Option>
                <Option value='1'>自营</Option>
                <Option value='2'>加盟</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label='用车模式'>
          {
            getFieldDecorator('use_mode', {
              initialValue: '1'
            })(
              <Select>
                <Option value='0'>全部</Option>
                <Option value='1'>指定停车点</Option>
                <Option value='2'>禁停处</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}

const OpenCityFormWrap = Form.create({name: 'open-city-form'})(OpenCityForm)