import React, { Component } from 'react'
import { Card, Row, Col, Modal } from 'antd'

class Gallery extends Component {

  state = {
    visible: false,
    imgSrc: ''
  }

  handleClick = (item) => {
    this.setState({
      visible: true,
      imgSrc: '/assets/images/gallery/' + item
    })
  }

  render() {
    const imgs = [
      ['1.png', '2.png', '3.png', '4.png', '5.png'],
      ['6.png', '7.png', '8.png', '9.png', '10.png'],
      ['11.png', '12.png', '13.png', '14.png', '15.png'],
      ['16.png', '17.png', '18.png', '19.png', '20.png'],
      ['21.png', '22.png', '23.png', '24.png', '25.png']
    ]

    const imgList = imgs.map((list) => list.map((item) => 
      <Card
        key={item}
        hoverable
        style={{ width: '20%', textAlign: 'center', display: 'inline-block' }}
        cover={<img src={'/assets/images/gallery/' + item} alt='' />}
        onClick={() => this.handleClick(item)}>
        <Card.Meta title={item} description='图片'></Card.Meta>
      </Card>
    ))

    return (
      <div className='gallery'>
        {imgList}
        <Modal title='图片' visible={this.state.visible} footer={null} onCancel={() => this.setState({visible: false})} style={{width: 240, height: 240}}>
          <img src={this.state.imgSrc} alt='' style={{width: '100%'}}/>
        </Modal>
      </div>
    )
  }
}


export default Gallery