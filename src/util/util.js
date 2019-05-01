import React from 'react'
import { Select } from 'antd'

const Option = Select.Option

const Util = {
  formatDate(time) {
    if(!time) return
    let date = new Date(time)
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let seconds = date.getSeconds()
    month = this.checkGreaterThanTen(month)
    day = this.checkGreaterThanTen(day)
    hour = this.checkGreaterThanTen(hour)
    minute = this.checkGreaterThanTen(minute)
    seconds = this.checkGreaterThanTen(seconds)
    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour+ ':' + minute + ':' + seconds
  },
  checkGreaterThanTen(num) {
    return num = num < 10 ? '0' + num : num
  },
  pagination(data, cb) {
    return {
      onChange: (current) => {
        cb(current)
      },
      pageSize: data.page_size,
      current: data.page,
      total: data.total,
      showTotal: (total) => {
        return `共${total}页`
      },
      showQuickJumper: false
    }
  },
  getOptionList(data) {
    if(!data) return []
    let options = []
    data.map((item) => {
      return options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
    })
    return options
  }
}

export default Util