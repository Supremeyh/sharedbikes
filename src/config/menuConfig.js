const menuConfig = [
  {
    title: '首页',
    key: '/admin/home'
  },
  {
    title: 'UI',
    key: '/admin/ui',
    children: [
      {
        title: '按钮',
        key: '/admin/ui/button'
      },
      {
        title: '弹框',
        key: '/admin/ui/modal'
      },
      {
        title: '加载',
        key: '/admin/ui/spin'
      },
      {
        title: '画廊',
        key: '/admin/ui/gallery'
      },
      {
        title: '轮播图',
        key: '/admin/ui/carousel'
      }
    ]
  },
  {
    title: 'Form',
    key: '/admin/form',
    children: [
      {
        title: '登录',
        key: '/admin/form/login'
      },
      {
        title: '注册',
        key: '/admin/form/register'
      }
    ]
  },
  {
    title: 'Table',
    key: '/admin/table'
  },
  {
    title: '城市管理',
    key: '/admin/city'
  },
  {
    title: '订单管理',
    key: '/admin/order'
  },
  {
    title: '用户管理',
    key: '/admin/user'
  },
  {
    title: '权限设置',
    key: '/admin/permission'
  }
]


export default menuConfig