import React, { Component } from 'react'
import { Carousel, Card } from 'antd'
import './index.less'

class Carousels extends Component {
  render() {
    return (
      <Card title='carousel'>
        <Carousel effect='fade' easing='linear' dots autoplay>
          <div><img src='/assets/images/gallery/1.png' alt=''/></div>
          <div> <img src='/assets/images/gallery/2.png' alt=''/></div>
          <div><img src='/assets/images/gallery/10.png' alt=''/></div>
        </Carousel>
      </Card>  
    )
  }
}

export default Carousels