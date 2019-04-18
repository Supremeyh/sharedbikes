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

