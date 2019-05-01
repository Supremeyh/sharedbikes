import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'
import Utils from '../util/util'

const Axios = axios

class request {
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(options.url, {
        param: 'callback'
      }, (err, response) => {
        if(err) reject(err)
        resolve(response)
      }) 
    })
  }

  static requestList(that, url, params, cb) {
    this.axios({
      url,
      params
    }).then(res => {
      if(res && res.result) {
        const list = res.result.item_list
        list.map((item) => {
          item.key =item.id
          return item
        })
        that.setState({
          list,
          pagination: Utils.pagination(res.result, (current) => {
            that.params.page = current
            cb()
          })
        })
      }
    })
  }

  static axios(options, isMock=true) {
    let baseUrl = ''
    if(isMock===true) {
      baseUrl = 'https://easy-mock.com/mock/5cc4000e429a6a46aa5d5112/sharedbikes/'
    } else {
      baseUrl = 'http://remote/host/'
    }
    return new Promise((resolve, reject) => {
      Axios({
        baseURL: baseUrl,
        url: options.url,
        method: options.method || 'get',
        params: options.params || '',
        data: options.data || '',
        timeout: 5000
      })
      .then((response) => {
        if(response.status===200) {
          let data = response.data
          if(data.code === 2000) {
            resolve(data)
          } else {
            Modal.info({
              title: '提示',
              content: data.msg || '出错了'
            })
          }
        } else {
          reject(response.data)
        }
      })
    })
  }
}

export default request
