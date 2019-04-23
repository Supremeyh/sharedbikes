import React, { Component } from 'react'
import { Card, Button, Icon, Radio } from 'antd'
import './index.less'

const  ButtonGroup  = Button.Group
const  RadioGroup  = Radio.Group


class Buttons extends Component {
  state ={
    loading: true,
    value: 2
  }

  handleLoadingClose = () => {
    this.setState((prevState, props) => ({
      loading: !prevState.loading
    }))
    // this.setState({
    //   loading: !this.state.loading
    // })
  }

  handleRadioChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    }

    return (
      <div className='button'>
        <Card 
          title='Title'
          extra={<a href='#'>More</a>}
          bordered={false}
          >
          <Button type='primary' icon='edit'>primary</Button>
          <Button shape='round'>default</Button>
          <Button shape='circle' type='dashed' icon='search'></Button>
          <Button type='danger' disabled>danger</Button>
          <Button icon='plus'>danger</Button>
          <ButtonGroup>
            <Button loading={this.state.loading} style={{marginRight: '0px'}}>loading</Button>
            <Button type='danger' onClick={this.handleLoadingClose} >Close</Button>
          </ButtonGroup>
          <Icon type="scissor" />
        </Card>

        <Card title='Radio'>
          <RadioGroup value={this.state.value} onChange={this.handleRadioChange}>
            <Radio value={1} style={radioStyle}>A</Radio>
            <Radio value={2} style={radioStyle}>B</Radio>
            <Radio value={3} style={radioStyle}>C</Radio>
          </RadioGroup>
        </Card>
      </div>
    )
  }
}

export default Buttons