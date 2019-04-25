import React, { Component } from 'react'
import { Form, Input, InputNumber, Button, Icon, Card, Checkbox, Radio, Select, Switch, Upload, DatePicker, TimePicker, message } from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const SelectOption = Select.Option
const TextArea = Input.TextArea

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  },
  labelAlign: 'right',
  colon: true
}

class Register extends Component {
  
  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div className='register'>
        <Card title='register'>
          <Form {...formItemLayout} layout='horizontal' >
            <FormItem  label='用户名'>
              {
                getFieldDecorator('userName', {
                  initialValue: 'abc',
                  rules: [{required: true, message: '必填'}, {min: 2, max: 10, message: '输入2-10个字符' }]
                })(
                  <Input placeholder='username'/>
                )
              }
            </FormItem>
            <FormItem  label='密码'>
              {
                getFieldDecorator('userPwd', {
                  rules: [{required: true, message: '必填'}, {min: 2, max: 10, message: '输入2-10个字符' }]
                })(
                  <Input placeholder='password'/>
                )
              }
            </FormItem>
            <FormItem  label='性别'>
              {
                getFieldDecorator('sex')(
                  <RadioGroup>
                    <Radio value='1'>男</Radio>
                    <Radio value='2'>女</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
            <FormItem label='年龄'>
              {
                getFieldDecorator('age', {
                  initialValue: 20
                })(
                  <InputNumber min={1} max={100} step={1}/>
                )
              }
            </FormItem>
            <FormItem label='当前状态'>
              {
                getFieldDecorator('status', {
                  initialValue: 'b'
                })(
                  <Select defaultActiveFirstOption>
                    <SelectOption value='a'>小白</SelectOption>
                    <SelectOption value='b'>菜鸟</SelectOption>
                    <SelectOption value='c'>大神</SelectOption>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label='爱好'>
              {
                getFieldDecorator('status', {
                  initialValue: ['a', 'b']
                })(
                  <Select mode="tags" defaultActiveFirstOption>
                    <SelectOption value='a'>游泳</SelectOption>
                    <SelectOption value='b'>健身</SelectOption>
                    <SelectOption value='c'>滑雪</SelectOption>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label='财富自由'>
              {
                getFieldDecorator('wealth', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Switch autoFocus checkedChildren='是' unCheckedChildren='否'></Switch>
                )
              }
            </FormItem>
            <FormItem label='出生日期'>
              {
                getFieldDecorator('birthday', {
                  initialValue: moment('2000-10-01')
                })(
                  <DatePicker showTime format='YYYY-MM-DD hh:mm:ss'></DatePicker>
                )
              }
            </FormItem>
            <FormItem label='地址'>
              {
                getFieldDecorator('address', {
                  initialValue: ''
                })(
                  <TextArea autosize={{minRows: 2, maxRows: 4}}></TextArea>
                )
              }
            </FormItem>
            <FormItem label='头像'>
              {
                getFieldDecorator('upload', {

                })(
                  <Upload name='avatar' action='' showUploadList={true}  listType='picture-card'>
                    <Button type='primary'>
                      <Icon type='upload' />
                      上传
                    </Button>
                  </Upload>
                )
              }
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

const WrapperRegisterForm = Form.create({name: 'register_form'})(Register)
export default  WrapperRegisterForm