import React, { Component } from 'react'
import { Card, Button, Table, Modal, Form, Input, Select, message, Tree, Transfer, Switch } from 'antd'
import request from '../../request'
import Utils from '../../util/util'
import menuConfig from '../../config/menuConfig'

const FormItem = Form.Item
const Option = Select.Option
const TreeNode = Tree.TreeNode

class Permission extends Component {

  state = {
    list: [],
    pagination: {},
    selectedRowKeys: '',
    selectedRowItem: {},
    isCreateRoleVisible: false,
    isSetPermissionVisble: false,
    isRoleAuthVisible: false,
  }

  params = {
    page: 1
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRowItem: selectedRows[0]})
  }

  componentDidMount() {
    this.getPermissionUser()
  }

  getPermissionUser = () => {
    let _this = this
    request.requestList(_this, 'role/list', _this.params, this.getPermissionUser)
  }

  handleCreateRole = () => {
    this.setState({
      isCreateRoleVisible: true
    })
  }
  
  handlePermission = () => {
    let item = this.state.selectedRowItem
    if(!item.id) {
      Modal.info({
        title: '提示',
        content: '请选择角色'
      })
      return
    }
    this.setState({
      isSetPermissionVisble: true,
      detailInfo: item,
      menuInfo: item.menus
    })
  }
  
  handleRoleAuth = () => {
    let item = this.state.selectedRowItem
    if(!item.id) {
      Modal.info({
        title: '提示',
        content: '请选择角色'
      })
      return
    }
    this.getRoleUserList(item.id)
    this.setState({
      isRoleAuthVisible: true,
      detailInfo: item
    })
  }

  getRoleUserList = (userId) => {
    request.axios({
      url: 'role/user_list',
      methods: 'get',
      params: userId
    }).then(res => {
      this.setState({
        isRoleAuthVisible: true
      })
      this.getAuthUserList(res.result)
    })
  }

  getAuthUserList = (dataSource) => {
    const mockData = []
    const targetKeys = []
    if(dataSource && dataSource.length > 0) {
      for (let i = 0; i < dataSource.length; i++) {
        const data = {
          key: dataSource[i].user_id,
          title: dataSource[i].user_name,
          description: dataSource[i].user_name,
          status: dataSource[i].status
        }
        mockData.push(data)
        if(data.status===1) {
          targetKeys.push(data.key)
        }
      }
    }
    this.setState({
      mockData,
      targetKeys
    })
  }

  handleCreateRoleModalSubmit = () => {
    const roleInfo = this.roleForm.props.form.getFieldsValue()
    request.axios({
      url: 'role/create',
      method: 'post',
      data: roleInfo
    }).then(res => {
      message.success('创建成功!')
      this.getPermissionUser()
      this.handleCreateRoleModalCancel()
    })
  }
  
  handleCreateRoleModalCancel = () => {
    this.roleForm.props.form.resetFields()
    this.setState({
      isCreateRoleVisible: false
    })
  }

  handleSetPermissionSubmit = () => {
    const data = this.permForm.props.form.getFieldsValue()
    data.roleId = this.state.selectedRowItem.id
    data.menus = this.state.menuInfo
    console.log(data, data.menus)
    
    request.axios({
      url: 'permission/edit',
      method: 'post',
      data: data
    }).then(res => {
      message.success('修改成功!')
      this.getPermissionUser()
      this.handleSetPermissionCancel()
    })
  }
  
  handleSetPermissionCancel = () => {
    this.permForm.props.form.resetFields()
    this.setState({
      isSetPermissionVisble: false
    })
  }

  handleRoleAuthSubmit = () => {
    let data = {}
    data.user_ids = this.state.targetKeys
    data.role_id = this.state.selectedRowItem.id
    request.axios({
      url: 'role/user_role_edit',
      method: 'post',
      data
    }).then(res => {
      message.success('修改成功!')
      this.handleRoleAuthCancel()
      this.getPermissionUser()
    })
  }
  
  handleRoleAuthCancel = () => {
    this.setState({
      isRoleAuthVisible: false
    })
  }

  handlePatchMenuInfo = (menus) => {
    this.setState({
      menuInfo: menus
    })
  }

  handleTargetKeysTransfer = (targetKeys) => {
    this.setState({
      targetKeys
    })
  }

  render() {
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'id'
      },
      {
        title: '角色名称',
        dataIndex: 'role_name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render(create_time) {
          return Utils.formatDate(create_time)
        }
      },
      {
        title: '使用状态',
        dataIndex: 'status',
        render(status) {
          return status === 1 ? '启用' : '停用'
        }

      },
      {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render(authorize_time) {
          return Utils.formatDate(authorize_time)
        }
      },
      {
        title: '授权人',
        dataIndex: 'authorize_user_name'
      }
    ]

    const rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange
    }


    return (
      <div>
        <Card>
          <Button type='primary' onClick={this.handleCreateRole}>创建角色</Button>
          <Button type='primary' onClick={this.handlePermission}>设置权限</Button>
          <Button type='primary' onClick={this.handleRoleAuth}>用户授权</Button>
        </Card>
        <Card>
          <Table 
              bordered
              columns={columns}
              dataSource={this.state.list}
              pagination={this.state.pagination}
              rowSelection={rowSelection}
              >
            </Table>
        </Card>
        <Modal 
          title='创建角色'
          visible={this.state.isCreateRoleVisible}
          width={500}
          onOk={this.handleCreateRoleModalSubmit}
          onCancel={this.handleCreateRoleModalCancel}>
          <RoleFormWrap 
            type={this.state.type} 
            userInfo={this.state.userInfo} 
            wrappedComponentRef={(form) => this.roleForm= form}/>
        </Modal>
        <Modal 
          title='设置权限'
          width={500}
          visible={this.state.isSetPermissionVisble}
          onOk={this.handleSetPermissionSubmit}
          onCancel={this.handleSetPermissionCancel}
          >
            <PermissionFormWrap 
              detailInfo={this.state.detailInfo}
              menuInfo={this.state.menuInfo}
              patchMenuInfo={this.handlePatchMenuInfo}
              wrappedComponentRef={(form) => this.permForm= form}
              >
            </PermissionFormWrap>
        </Modal>
        <Modal
          title='选择角色'
          width={600}
          visible={this.state.isRoleAuthVisible}
          onOk={this.handleRoleAuthSubmit}
          onCancel={this.handleRoleAuthCancel}
        >
          <AuthFormWrap
            mockData={this.state.mockData}
            targetKeys={this.state.targetKeys}
            selectedKeys={this.state.selectedKeys}
            targetKeysTransfer={this.handleTargetKeysTransfer}
            currentRole={this.state.selectedRowItem} 
          /> 
        </Modal>
      </div>
    )
  }
}


export default Permission



class RoleForm extends Component {

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
    }

    return (
      <Form layout='horizontal' {...formItemLayout}>
        <FormItem label='角色名称'>
          {
            getFieldDecorator('role_name', {

            })(
              <Input text='text' placeholder='角色名称'/>
            )
          }
        </FormItem>
        <FormItem label='状态'>
          {
            getFieldDecorator('state', {
              initialValue: 0
            })(
              <Select>
                <Option value={1}>开启</Option>
                <Option value={0}>关闭</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}

const RoleFormWrap = Form.create({})(RoleForm)


class PermissionForm extends Component {
  renderTreeNodes = (data) => {
    return data.map((item, index) => {
      if(item.children) {
        return (
          <TreeNode {...item} >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      } else {
        return <TreeNode {...item} />
      }
    })
  }

  onTreeSelect = (selectedKeys, info) => {
    // console.log('selected', selectedKeys, info);
  }

  onTreeCheck = (checkedKeys, info) => {
    this.props.patchMenuInfo(checkedKeys)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
    }

    return (
      <Form layout='horizontal' {...formItemLayout}>
        <FormItem label='角色名称'>
          {
            getFieldDecorator('role_name', {
              initialValue: this.props.detailInfo.role_name
            })(
              <Input disabled/>
            )
          }
        </FormItem>
        <FormItem label='状态'>
          {
            getFieldDecorator('status', {
              initialValue: this.props.detailInfo.status
            })(
              <Select>
                <Option value={1}>开启</Option>
                <Option value={0}>关闭</Option>
              </Select>
            )
          }
        </FormItem>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={this.props.menuInfo}
          onSelect={this.onTreeSelect}
          onCheck={this.onTreeCheck}
        >
          <TreeNode title='平台权限' key='platform_all'>
            {this.renderTreeNodes(menuConfig)}
          </TreeNode>
        </Tree>
      </Form>
    )
  }
}

const PermissionFormWrap = Form.create({})(PermissionForm)


class AuthForm extends Component {

  filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1

  handleChange = (targetKeys, direction, moveKeys) => {
    this.props.targetKeysTransfer(targetKeys)
  }

  render() {
    const { mockData, targetKeys, selectedKeys, currentRole } = this.props    
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
    }

    return (
      <Form layout='horizontal' {...formItemLayout}>
        <FormItem label='角色名称'>
          {
            getFieldDecorator('role_name', {
              initialValue: currentRole.role_name
            })(
              <Input text='text' disabled placeholder='角色名称'/>
            )
          }
        </FormItem>
        <FormItem label='选择角色'>
          <Transfer
            titles={['待选用户', '已选用户']}
            listStyle={{width: 200, height: 300}}
            dataSource={mockData}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            showSearch
            filterOption={this.filterOption}
            onChange={this.handleChange}
            onScroll={this.handleScroll}
            render={item => item.title}
          />
        </FormItem>
      </Form>
    )
  }
}

const AuthFormWrap = Form.create({})(AuthForm)