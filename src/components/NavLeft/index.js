import React, { Component, Fragment } from 'react'
import menuConfig from '../../config/menuConfig'
import { Menu, Icon } from 'antd'
import './index.less'

const SubMenu = Menu.SubMenu
const Item = Menu.Item

class NavLeft extends Component {
  
  componentWillMount() {
    const menuTree = this.getMenu(menuConfig)
    this.setState({
      menuTree
    })
  }

  getMenu = (data) => {
    return data.map((item) => {
      if(item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            { this.getMenu(item.children) }
          </SubMenu>
        )
      } else {
        return (
          <Item key={item.key}>{item.title}</Item>
        )
      }
    })

  }

  render() {
    return (
      <Fragment>
        <div className='logo'>
          <Icon className='logo-img' type="twitter" />
          <h1>Shared Bikes</h1>
        </div>
        <Menu mode='inline' theme='dark'>
          {this.state.menuTree}
        </Menu>
      </Fragment>
    )
  }
}

export default NavLeft