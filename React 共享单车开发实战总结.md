> created by sea, 2019.4.16

### 起步，初始化项目
npx create-react-app sharedbikes

### 基础依赖安装
npm i react-router-dom   
npm i axios   
npm i jsonp
npm i moment 

### antd 按需加载、自定义主题
npm i antd

npm i less less-loader  // 自定义主题需要用到 less 变量覆盖功能

npm i babel-plugin-import // 按需加载所需的css

#### 全量加载、手动加载
```JavaScript
// 全量加载 会加载全部CSS样式
import {Button} from 'antd'
import 'antd/dist/antd.css'

// 手动按需加载
import Button from 'antd/lib/button'
import 'antd/lib/button/style'  // 或者 antd/lib/button/style/css
```

#### 使用react-app-rewired 插件
```JavaScript
// 安装 react-app-rewired 插件
npm i react-app-rewired customize-cra

// 修改 package.json 文件
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}

// 根目录下新建 config-overrides.js
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,  // 'css'为加载编译好的css样式文件, true 为less文件
  }),
  // 自定义主题
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': 'red' },
  }),
);


// 此后，无需引入样式文件，会自动引入相对应样式文件
import { Button } from 'antd'  
```

#### 暴露webpack配置文件
```JavaScript
// 暴露出config 和 scripts 两个文件夹。此操作是不可逆，因eject功能会被删除；运行此命令前需保存git,才可继续执行
npm run eject

// 配置webpack支持less, 在/config/webpack.config.js 中，依照sass，增加less变量，和 module 中的oneOf数组添加 less相应 配置
const lessRegex = /\.less$/
const lessModuleRegex = /\.module\.less$/
// ...

// less 降级到3.0以下,比如npm i less@2.7.3
// 在babel-loader的plugins配置中增加 ["import", { "libraryName": "antd", "libraryDirectory": 'es', "style": true }]
{
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  include: paths.appSrc,
  loader: require.resolve('babel-loader'),
  options: {
    customize: require.resolve(
      'babel-preset-react-app/webpack-overrides'
    ),
    
    plugins: [
      [
        require.resolve('babel-plugin-named-asset-import'),
        {
          loaderMap: {
            svg: {
              ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
            },
          },
        },
      ],

      // 新增的配置 按需加载
      ["import", { 
        "libraryName": "antd", 
        "libraryDirectory": 'es', 
        "style": true  // 'css'为加载编译好的css样式文件, true 为less文件
        }
      ]
    ],
    cacheDirectory: true,
    cacheCompression: isEnvProduction,
    compact: isEnvProduction,
  },
},

// 然后，修改 preProcessor 中loader 配置项
if (preProcessor) {
  // loaders.push({
  //   loader: require.resolve(preProcessor),
  //   options: {
  //     sourceMap: isEnvProduction && shouldUseSourceMap,
  //   },
  // });

  // 修改为
  let loader = {
    loader: require.resolve(preProcessor),
    options: {
      sourceMap: shouldUseSourceMap,
    },
  }
  if(preProcessor === "less-loader") {
    loader.options.modifyVars = {
      'primary-color': '#f9c700'
    }
    loader.options.javascriptEnabled = true
  }

  loaders.push(loader)
}
```

### 项目架构 和 技术栈
核心框架库：React16、Router4.0、Redux
中间件和插件：Axios、Map、ECharts、AntD
公共机制：菜单、权限、Header、Footer、ETable、EForm、Loading、API、Axios

### 基础知识
* 编程式实现VS声明式实现
编程式实现：需要以具体代码表达在哪里（where）做什么（what）,如何实现（how）
声明式实现：只需要声明在哪里（where）做什么（what）,不需要关心如何实现（how）

* calc() 计算方法动态计算长度值
calc(四则运算）：运算符前后都需要保留一个空格
width: calc(100% - 10px) //表示宽度属性是整个布局的100%减去50px的长度
calc(100vh)：vh的含义相当于1%，100vh即是100%

* less
js文件中导入less文件，用import 'xx'； less导入其他less，用 @import 'xx'  引入，中间留空，用分号分割
import './index.less';
@import './varable.less';

定义变量，与scss有区别
@font18: 18px;  less
$font18: 18px;   scss

* CSS实现箭头图标
实现下三角样式：设定border-top为指定颜色，左右border为透明色(transparent)
```CSS
.title{
  position: relative;
  &::after{
    display: block;
    position: absolute;
    content: '';
    left: 50%;
    border-top: 9px solid @colorWhite;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
  }
}
```

* React监听事件方法绑定this
```JavaScript
// 手动绑定this
this.handleClick = this.handleClick.bind(this)

// 箭头函数传参
() => this.handleClick('add')

// 定义为箭头函数
handleClick = () => {
  // ...
}
```

* Easy Mock中使用　　
Easy Mock中使用　　
```JavaScript
{
  "list|10": [{     //生成10组数据
    "id|+1": 1,    //自增长
    "userName": '@cname',   //随机生成中文名
    "sex|1-2": 1,    //在1-2中随机选择
  }],

  "cname": "@cname",  //中文人名
  "cfirst": "@cfirst",  //姓名，姓
  "id": "@id",  //生成20 位数字
  "title": "@ctitle",  //中文title
  "city": "@city",  //中文城市
  "ip": "@ip",  //ip 地址
  "email": "@email",  //email
  "url": "@url",  //url
  "cword": "@cword('123456')",  //123456 从中选取一个字符
  "csentence": "@csentence(1,5)",  //文字文段
  "csentence5": "@csentence(5)",  //文字文段
  "cparagraph": "@cparagraph(1,3)",  //文字文段
  "string": "@string(11)",  //输出11 个字符长度的字符串
  "float": "@float(0,10)",  //0 到 10 的浮点数
  "int": "@integer(10,50)",  //1 到 50 之间的整数
  "boolean": "@boolean",  //boolean 类型 true,false
  "boolean|1-2": true, //boolean 类型 true,false
  "array_sort_add|+1": ["1", "2", "3"], //数组1，2，3轮询输出
  "actionType|1": ['click_url', 'open_resource_detail', 'open_resource_search'],
  "payload": function() {
    var returnClickUrl = {
      "linkUrl": "http://abc.com/efg"
    }
    var returnResourceDetail = {
      "resourceId": "606"
    }
    var returnResourceSearch = {
      "keyWords": "",
      "tagCategory": "1",
      "tag": "1"
    }
    var s = this.actionType == 'click_url' ? returnClickUrl : returnResourceSearch;
    return s;
  }
}
```


### 具体实现
#### 基础架构
/index.js 项目入口
```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './config/router'
import { Provider } from 'react-redux'
import store from './store'

const App = (
  <Provider store={store}>
    <Router />
  </Provider>
)

ReactDOM.render(App, document.getElementById('root'));
```

/config/router.js  路由。 重点是Swicth的应用，使得少了一层admin嵌套
```JavaScript
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import App from '../App'
import Login from '../pages/login'
import Home from '../pages/home'
import Admin from '../admin'
import Button from '../pages/admin/ui/button'
import Modal from '../pages/admin/ui/modal'
import Spin from '../pages/admin/ui/spin'
import Gallery from '../pages/admin/ui/gallery'
import Carousel from '../pages/admin/ui/carousel'
import LoginForm from '../pages/admin/form/login'
import Register from '../pages/admin/form/register'
import Table from '../pages/admin/table'
import City from '../pages/city'
import Order from '../pages/order'
import Common from '../common'
import OrderDetail from '../pages/order/detail'
import BikeMap from '../pages/map/bikeMap'
import User from '../pages/user'
import Bar from '../pages/echarts/bar'
import Pie from '../pages/echarts/pie'
import RichText from '../pages/richText'
import Permission from '../pages/permission'
import NotFound from '../pages/notFound'

class IRouter extends Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path='/login' component={Login}></Route>
            <Route path='/common' render={() => 
              <Common>
                <Route path='/common/order/detail/:orderId' component={OrderDetail}></Route>
              </Common>
            }>
            </Route>
            <Route path='/' render={ () => 
                <Admin>
                  <Switch>
                    <Route path='/home' component={Home}></Route>
                    <Route path='/ui/button' component={Button}></Route>
                    <Route path='/ui/modal' component={Modal}></Route>
                    <Route path='/ui/spin' component={Spin}></Route>
                    <Route path='/ui/gallery' component={Gallery}></Route>
                    <Route path='/ui/carousel' component={Carousel}></Route>
                    <Route path='/form/login' component={LoginForm}></Route>
                    <Route path='/form/register' component={Register}></Route>
                    <Route path='/table' component={Table}></Route>
                    <Route path='/city' component={City}></Route>
                    <Route path='/order' component={Order}></Route>
                    <Route path='/user' component={User}></Route>
                    <Route path='/bikemap' component={BikeMap}></Route>
                    <Route path='/bar' component={Bar}></Route>
                    <Route path='/pie' component={Pie}></Route>
                    <Route path='/richtext' component={RichText}></Route>
                    <Route path='/permission' component={Permission}></Route>
                    <Redirect to='/home'></Redirect>
                    <Route component={NotFound}></Route>
                  </Switch>
                </Admin>
              }>
            </Route>
          </Switch>
        </App>
      </Router>
    )
  }
}

export default IRouter
```

/config/menuConfig.js 菜单导航配置
```JavaScript
const menuConfig = [
  {
    title: '首页',
    key: '/home'
  },
  {
    title: 'UI',
    key: '/ui',
    children: [
      {
        title: '按钮',
        key: '/ui/button'
      },
      {
        title: '弹框',
        key: '/ui/modal'
      },
      {
        title: '加载',
        key: '/ui/spin'
      },
      {
        title: '画廊',
        key: '/ui/gallery'
      },
      {
        title: '轮播图',
        key: '/ui/carousel'
      }
    ]
  },
  {
    title: 'Form',
    key: '/form',
    children: [
      {
        title: '登录',
        key: '/form/login'
      },
      {
        title: '注册',
        key: '/form/register'
      }
    ]
  },
  {
    title: 'Table',
    key: '/table'
  },
  {
    title: '城市管理',
    key: '/city'
  },
  {
    title: '订单管理',
    key: '/order'
  },
  {
    title: '用户管理',
    key: '/user'
  },
  {
    title: '车辆地图',
    key: '/bikemap'
  },
  {
    title: '柱形图',
    key: '/bar'
  },
  {
    title: '饼状图',
    key: '/pie'
  },
  {
    title: '富文本',
    key: '/richtext'
  },
  {
    title: '权限设置',
    key: '/permission'
  }
]


export default menuConfig
```

/App.js 。 重点是其中的 {this.props.children}
```JavaScript
import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

export default App
```

/admin.js 。 后台系统layout布局，与一般登录、注册等页面不同
```JavaScript
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft'

class Admin extends Component {
  render() {
    return (
      <Row className='container'>
        <Col className='nav-left' span={4}>
          <NavLeft></NavLeft>
        </Col>
        <Col className='main' span={20}>
          <Header className='header'>Header</Header>
            {this.props.children}
          <Footer className='footer'></Footer>
        </Col>
      </Row>
    )
  }
}

export default Admin
```

/components/NavLeft/index.js  左侧菜单栏menu, 重点是递归获取菜单列表menu
```JavaScript
import menuConfig from '../../config/menuConfig'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenuAction } from '../../store/actionCreators'


const SubMenu = Menu.SubMenu
const Item = Menu.Item


class NavLeft extends Component {
  
  componentWillMount() {
    const menuTree = this.getMenu(menuConfig)
    let currentPath = window.location.pathname
    this.setState({
      menuTree,
      defaultSelectedKeys: [currentPath],
      selectedKeys: [currentPath],
      defaultOpenKeys: [currentPath]
    })
  }

  // 递归获取菜单列表menu
  getMenu = (data) => {
    return data.map((item) => {
      if(item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            { this.getMenu(item.children) }
          </SubMenu>
        )
      } else {
        return (
          <Item key={item.key}>
            <NavLink to={item.key}>{item.title}</NavLink>
          </Item>
        )
      }
    })

  }

  handleClick = (item) => {   
    let name = item.item.props.children.props.children
    this.setState({
      selectedKeys: [item.key]
    })
    this.props.changeMenuName(name)
  }

  render() {
    const { defaultSelectedKeys, selectedKeys, defaultOpenKeys } = this.state
    return (
      <Fragment>
        <div className='logo'>
          <Icon className='logo-img' type="twitter" />
          <h1>Shared Bikes</h1>
        </div>
        <Menu 
          mode='inline' 
          theme='dark' 
          selectedKeys={selectedKeys} 
          defaultSelectedKeys={defaultSelectedKeys} 
          defaultOpenKeys={defaultOpenKeys} 
          onClick={this.handleClick}
          style={{textAlign: 'left'}}
          >
          {this.state.menuTree}
        </Menu>
      </Fragment>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    changeMenuName(menuName) {
      const action = switchMenuAction(menuName)
      dispatch(action)
    }
  }
}

export default connect(null, mapDispatchToProps)(NavLeft)
```

#### 公共组件封装
##### request 请求
对jsonp处理和对axios做了一层封装拦截
```JavaScript
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
      baseUrl = 'http://remote/host/'  // 线上生产部署地址
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
```

##### utils 公用方法
主要是时间处理、分页、下拉项
```JavaScript
import React from 'react'
import { Select } from 'antd'

const Option = Select.Option

const Utils = {
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

export default Utils
```


#### 使用jsonp 跨域调用百度天气接口 
npm i jsonp --save
```JavaScript
import request from '../../request'

getWeather() {
  let city = encodeURIComponent('北京')
  // let ak = 'gAInfsvkT2wrwhbWG7obgNvEP7bEW2kf'
  let ak = '3p49MVra6urFRGOT9s8UBWr2'
  request.jsonp({
    url: 'http://api.map.baidu.com/telematics/v3/weather?location='+city+'&output=json&ak=' + ak
  })
    .then(res => {
      if(res.status === 'success') {
        const data = res.results[0].weather_data[0]
        this.setState(() => ({
          weather: data.weather,
          dayPictureUrl: data.dayPictureUrl
        }))
      }
    })
}
```



