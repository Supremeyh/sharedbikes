import React, { Component } from 'react'
import { Form, Card, Input, Button, Icon, message, Checkbox } from 'antd'

const FormItem = Form.Item


class Login extends Component {

  handleSubmit = () => {
    let loginInfo = this.props.form.getFieldsValue()    
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if(!errors) {
        console.log(values)
        message.success(`${loginInfo.userName}, 登录成功`)
      }
    })

  }
  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <div className='login'>
        <Card title='horizontal'>
          <Form layout='horizontal' style={{width: 260}}>
            <FormItem>
              {getFieldDecorator('userName', {
                initialValue: '',
                rules: [{ required: true, message: '必填项'}]
              })(
                <Input prefix={<Icon type='user'></Icon>} placeholder='username' />
              )}
            </FormItem>
            <FormItem>
            {getFieldDecorator('userPwd', {
                initialValue: '',
                rules: [{ required: true, message: 'it is required'}, { min:2, max: 10, message: '输入2-10个字符'}]
              })(
                <Input  prefix={<Icon type='lock'></Icon>} placeholder='password' />
              )}
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: false
                })(
                  <Checkbox>remember me</Checkbox>
                )
              }
              <a href='#'>忘记密码</a>
            </FormItem>
            <FormItem>
              <Button type='primary' onClick={this.handleSubmit}>Login In</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(Login);


export default WrappedHorizontalLoginForm