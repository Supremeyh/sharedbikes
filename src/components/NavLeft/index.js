import React, { Component, Fragment } from 'react'
import menuConfig from '../../config/menuConfig'
import { Menu, Icon } from 'antd'
import './index.less'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenuAction } from '../../store/actionCreators'


const SubMenu = Menu.SubMenu
const Item = Menu.Item

class NavLeft extends Component {
  
  componentWillMount() {
    const menuTree = this.getMenu(menuConfig)
    let currentPath = window.location.pathname
    this.setState({
      menuTree,
      defaultSelectedKeys: [currentPath],
      selectedKeys: [currentPath],
      defaultOpenKeys: [currentPath]
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
          <Item key={item.key}>
            <NavLink to={item.key}>{item.title}</NavLink>
          </Item>
        )
      }
    })

  }

  handleClick = (item) => {   
    let name = item.item.props.children.props.children
    this.setState({
      selectedKeys: [item.key]
    })
    this.props.changeMenuName(name)
  }

  render() {
    const { defaultSelectedKeys, selectedKeys, defaultOpenKeys } = this.state
    return (
      <Fragment>
        <div className='logo'>
          <Icon className='logo-img' type="twitter" />
          <h1>Shared Bikes</h1>
        </div>
        <Menu 
          mode='inline' 
          theme='dark' 
          selectedKeys={selectedKeys} 
          defaultSelectedKeys={defaultSelectedKeys} 
          defaultOpenKeys={defaultOpenKeys} 
          onClick={this.handleClick}
          >
          {this.state.menuTree}
        </Menu>
      </Fragment>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    changeMenuName(menuName) {
      const action = switchMenuAction(menuName)
      dispatch(action)
    }
  }
}

export default connect(null, mapDispatchToProps)(NavLeft)