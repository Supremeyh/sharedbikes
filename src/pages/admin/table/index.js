import React,{ Component } from 'react'
import { Table, Tag, Divider, Card } from 'antd'
import axios from '../../../axios'
import Util from '../../../util/util'


class Tables extends Component {

  state = {
    selectedRowKeys: []
  }

  params = {
    page: 1
  }

  request = () => {
    axios.request({
      url: 'table_list',
      method: 'get',
      data: {
        params: {
          page: 1
        }
      }
    })
    .then((res) => {
      this.setState({
        data: res.result.list,
        pagination: Util.pagination(res.result, (current) => {
          this.params.page = current
          this.request()
        })
      })
    })

  }

  componentDidMount() {
    this.request()
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys
    })
  }

  handleTableChange = (pagination, filters, sorter) => {
      console.log(pagination, filters, sorter)
  }
  
  render() {

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href='javascript:;'>{text}</a>
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: 'Sex',
        dataIndex: 'sex',
        key: 'sex',
        render(sex) {
          return sex ===1 ? '男' : '女'
        }
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render(status) {
          let config = {
            '1': '菜鸟',
            '2': '中级',
            '3': '大神'
          }
          return config[status]
        }
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
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
        render: (text, recode) => (
          <span>
            <a href='javascript:;'>Invite {recode.name}</a>
            <Divider type='vertical'></Divider>
            <a href='javascript:;'>Delete</a>
          </span>
        )
      }
    ]

    const rowSelection = {
      type: 'checkbox',
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange
    }

    
    return (
      <div className='table'>
        <Card title='Table'>
          <Table 
            bordered
            pagination={this.state.pagination}
            columns={columns} 
            dataSource={this.state.data}
            onChange={this.handleTableChange}
            >
          </Table>
        </Card>
      </div>
    )
  }
}


export default Tables