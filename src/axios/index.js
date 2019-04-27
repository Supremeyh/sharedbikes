import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'

class aixos {
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

  static request(options) {
    let baseUrl = 'https://easy-mock.com/mock/5cc4000e429a6a46aa5d5112/sharedbikes/'
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: options.method,
        baseURL: baseUrl,
        timeout: 5000,
        params: (options.data && options.data.params) || ''
      })
      .then((response) => {
        if(response.status===200) {
          let data = response.data
          if(data.code === 2000) {
            resolve(data)
          } else {
            Modal.info({
              title: '提示',
              content: data.msg
            })
          }
        } else {
          reject(response.data)
        }
      })
    })
  }
}

export default aixos
