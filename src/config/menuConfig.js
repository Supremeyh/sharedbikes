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
      }
    ]
  },
  {
    title: '权限设置',
    key: '/admin/permission'
  }
]


export default menuConfig