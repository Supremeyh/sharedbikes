import React, { Component, Fragment } from 'react'
import { Input, Icon, Button, Select, Checkbox, Radio, Form, DatePicker } from 'antd'
import Util from '../../util/util'

const FormItem = Form.Item
const Option = Select.Option

class BaseForm extends Component {
  state = {
    orderInfo: [],
    orderConfirmVisble: false,
  }
  params = {
    page: 1
  }

  initFormList = () => {
    const { getFieldDecorator } = this.props.form
    const formList = this.props.formList
    const formItemList = []
    if(formList && formList.length>0) {
      formList.forEach((item) => {
        let type = item.type
        let label = item.label
        let field = item.field
        let initialValue = item.initialValue
        let placeholder = item.placeholder
        let width = item.width
        if(type==='Input') {
          const INPUT = (
            <FormItem
              key={field}
              label={label}
              field={field}>
              {
                getFieldDecorator(field,{
                  initialValue,
                })(
                  <Input style={{width: width}} type='text' placeholder={placeholder} />
                )
              }
            </FormItem>
          )

          formItemList.push(INPUT)
        } else if(type==='Select') {
          const SELECT = (
            <FormItem
              key={field}
              label={label}
              field={field}>
              {
                getFieldDecorator(field,{
                  initialValue,
                })(
                  <Select
                    style={{width: width}}
                    placeholder={placeholder}>
                      {
                        Util.getOptionList(item.list)
                      }
                  </Select>
                )
              }
            </FormItem>
          )
          formItemList.push(SELECT)
        } else if (type==='Checkbox') {
          const CKECKBOX = (
            <FormItem
              key={field}
              label={label}
              field={field}>
              {
                getFieldDecorator(field,{
                  valuePropName: 'checkbox',
                  initialValue,
                })(
                  <Checkbox style={{width: width}} type='text' placeholder={placeholder}>
                    {label} 
                  </Checkbox>
                )
              }
            </FormItem>
          )
          formItemList.push(CKECKBOX)
        }
        if(type==='DatePicker') {
          const TIMEPICKER = (
            <Fragment key='DatePicker'>
              <FormItem label="选择时间" key='start_time'>
              {
                getFieldDecorator('start_time')(
                  <DatePicker
                    placeholder='开始时间'
                    showTime
                    format='YYYY-MM-DD HH:mm:ss'>
                  </DatePicker>
                ) 
              }
              </FormItem>
              <FormItem label="-" colon={false} key='end_time'>
                {
                  getFieldDecorator('end_time')(
                    <DatePicker
                      placeholder='结束时间'
                      showTime
                      format='YYYY-MM-DD HH:mm:ss'>
                    </DatePicker>
                  )
                }
              </FormItem>
            </Fragment>
          )
          formItemList.push(TIMEPICKER)
        }
      })
    }

    return formItemList
  }

  handleFilterSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue()
    this.props.filterSubmit(fieldsValue)
  }

  reset = () => {
    this.props.form.resetFields()
  }

  render() {
    
    return (
      <Form layout='inline'>
        <FormItem>
          { this.initFormList() }
        </FormItem>
        <FormItem>
            <Button type="primary" style={{margin:'0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
            <Button onClick={this.reset}>重置</Button>
          </FormItem>
      </Form>
    )
  }
}


export default Form.create({})(BaseForm)