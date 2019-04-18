import JsonP from 'jsonp'

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
}

export default aixos