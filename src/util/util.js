const Util = {
  formatDate(time) {
    if(!time) return
    let date = new Date(time)
    let month = date.getMonth() + 1
    let day = date.getDay()
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
    return num = num > 10 ? num : '0' + num
  }
}

export default Util