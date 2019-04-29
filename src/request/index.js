import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'

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

  static axios(options) {
    let baseUrl = 'https://easy-mock.com/mock/5cc4000e429a6a46aa5d5112/sharedbikes/'
    return new Promise((resolve, reject) => {
      Axios({
        baseURL: options.baseUrl || baseUrl,
        url: options.url,
        method: options.method,
        params: options.params || '',
        data: options.data || '',
        timeout: 5000
      })
      .then((response) => {
        if(response.status===200) {
          let data = response.data
          if(data.code === 2000 || data.code == 0) {
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
