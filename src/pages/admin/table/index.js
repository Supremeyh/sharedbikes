import React,{ Component } from 'react'
import { Table, Tag, Divider, Card, Badge } from 'antd'
import request from '../../../request'
import Util from '../../../util/util'


class Tables extends Component {

  state = {
    selectedRowKeys: [],
    pagination: {},
    sortOrder: 'ascend'
  }

  params = {
    page: 1
  }

  getTableList = () => {
    let that = this
    request.axios({
      url: 'table_list',
      method: 'get',
      params: {
        page: this.params.page
      }
    })
    .then((res) => {
      this.setState({
        data: res.result.list,
        pagination: Util.pagination(res.result, (current) => {
          that.params.page = current
          that.getTableList()
        })
      })
    })

  }

  componentDidMount() {
    this.getTableList()
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys
    })
  }

  handleTableChange = (pagination, filters, sorter) => {
      console.log(pagination, filters, sorter)
  }

  handleDelete = (text, record, index) => {
    console.log(text, record, index)
    
  }
  
  render() {

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 120,
        fixed: 'left',
        sorter: (a, b) => {
          return a.name.length - b.name.length
        },
        render: text => <a href='javascript:;'>{text}</a>
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 120,
        sorter: (a, b) => {
          return a.age - b.age
        }
      },
      {
        title: 'Sex',
        dataIndex: 'sex',
        key: 'sex',
        width: 120,
        render(sex) {
          return sex ===1 ? '男' : '女'
        }
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 120,
        render(status) {
          let config = {
            '1': <Badge status='success' text='菜鸟'/>,
            '2': <Badge status='error' text='中级'/>,
            '3': <Badge status='processing' text='大神'/>,
          }
          return config[status]
        }
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        width: 120,
      },
      {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        width: 120,
        render: tags => (
          <span>
            {tags.map((tag) => {
              let color = tag.length > 5 ? 'geekblue' : 'blue'
              if(tag === 'president') {
                color = 'volcano'
              }
              return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>
            })}
          </span>
        )
      },
      {
        title: 'Actions',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href='javascript:;'>Invite {record.name}</a>
          </span>
        )
      },
      {
        title: '操作',
        key: 'handle',
        render: (text, record, index) => {
          return <a href='javascript:;' onClick={() => {this.handleDelete(text, record, index)}}>Delete</a>
        }
      }
    ]
    
    return (
      <div className='table'>
        <Card title='Table'>
          <Table 
            bordered
            scroll={{y: 300}}
            columns={columns} 
            dataSource={this.state.data}
            onChange={this.handleTableChange}
            pagination={this.state.pagination}>
          </Table>
        </Card>
      </div>
    )
  }
}


export default Tables