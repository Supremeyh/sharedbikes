> created by sea, 2019.4.16

### 起步，初始化项目
npx create-react-app sharedbikes

### 基础依赖安装
npm i react-router-dom

npm i axios

### 暴露webpack配置文件
npm run eject
暴露出config 和 scripts 两个文件夹。此操作是不可逆，因eject功能会被删除

### 配置webpack支持less
npm i less less-loader

在/config/webpack.config.js 中，依照sass，增加less变量，和 module 中的oneOf数组添加 less相应 配置

### 安装antd、按需加载

```JavaScript
// 安装antd
npm i antd 

import { Button } from 'antd
import 'antd/dist/antd.css'


// 按需加载
npm i babel-plugin-import

// 修改 package.json 文件
"babel": {
  "presets": [
    "react-app"
  ],
  "plugins": [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": true  // style: true 会加载 less 文件
    }]
  ]
}

import { Button } from 'antd'
// import 'antd/dist/antd.css';  // 删除此项

```

### CSS3 箭头
```CSS
&::after{
  /* 下三角 向下箭头 */
  display: block;
  position: absolute;
  content: '';
  left: 50%;
  bottom: 1px;
  margin: 0 0 0 -12px;
  border-top: 9px solid @colorWhite;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
}
```

###  路由配置
npm i react-router-dom

```JavaScript
// 切分隔离路由配置文件, 在路由配置文件router引入App组件,并在其内部包含Route, App组件只有{this.props.children}
// src/index
import Router from './config/router'

ReactDOM.render(<Router />, document.getElementById('root'))


// src/config/router
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from '../App'
import Login from '../pages/login'
import Admin from '../admin'
import Button from '../pages/admin/ui/button'
import Modal from '../pages/admin/ui/modal'
import NotFound from '../pages/notFound'

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <App>
          <Route path='/login' component={Login}></Route>
          <Route path='/admin' render={ () => 
              <Admin>
                <Switch>
                  <Route path='/admin/ui/button' component={Button}></Route>
                  <Route path='/admin/ui/modal' component={Modal}></Route>
                  <Route component={NotFound}></Route>
                </Switch>
              </Admin>
            }>
          </Route>
        </App>
      </BrowserRouter>
    )
  }
}

export default Router


// src/App
import React, { Component } from 'react'
import 'antd/dist/antd.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    )
  }
}

export default App
```