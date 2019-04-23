import React, { Component } from 'react'
import { Modal, Button, Card } from 'antd'
// import './index.less'

class Modals extends Component {
  state = {
    visible: false
  }

  showModal = (type) => {
    this.setState({
      [type]: true
    })
  }

  handleOk = () => {
    this.setState({
      visible: false
    })
  }

  hanleCancel = () => {
    this.setState({
      visible: false
    })
  }

  showConfirm = () => {
    Modal.confirm({
      title: 'confirm modal',
      content: 'some ...',
      okType: 'dashed'
    })
  }

  showInfo = () => {
    Modal.info({
      title: 'info',
      content: 'info',
      onOk() {
        console.log(true)
      }
    })
  }

  showMethod = (type) => {
    Modal[type]({
      title: 'type',
      content: 'some type',
      onOk() {
        console.log(type)
      }
    })
  }
 
  render() {
    return (
      <div className='modal'>
        <Card title='modal card'>
          <Button onClick={this.showModal.bind(this, 'visible')}>show modal</Button>
          <Button onClick={this.showConfirm}>show confirm</Button>
          <Button onClick={this.showInfo}>show info</Button>
          <Button onClick={() => this.showMethod('confirm')}>show method</Button>
          <Modal 
            title='modal'
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.hanleCancel}
            okText='好了'
            cancelText='取消'
            style={{top: 100}}
            >
            <p>hhhhh</p>
          </Modal>
        </Card>
      </div>
    )
  }
}

export default Modals