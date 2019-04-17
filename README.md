> created by sea, 2019.4.16

### 起步，初始化项目
npx create-react-app sharedbikes

### 基础依赖安装
npm i react-router-dom
npm i axios
npm i less-loader

### 暴露webpack配置文件
npm run eject
暴露出config 和 scripts 两个文件夹。此操作是不可逆，因eject功能会被删除

### 配置webpack支持less
在/config/webpack.config.js 中，依照sass，增加less变量，和 module 中的oneOf数组添加 less相应 配置


