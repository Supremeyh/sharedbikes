import React, { Component } from 'react'
import { Card, Icon, Tabs } from 'antd'

class Spins extends Component {

  constructor(props) {
    super(props)

    const panes = [
      { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' },
    ]

    this.newTabIndex = 0

    this.state = {
      activeKey: panes[0].key,
      panes
    }
  }


  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  }

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  }

  render() {
    return (
      <div className='spin'>
        <Card title='Tabs'>
          <Tabs
            tabPosition='top' 
            type='editable-card' 
            onEdit={this.onEdit} 
            onChange={this.onChange}
            activeKey={this.state.activeKey}>
            {
              this.state.panes.map((pane) => 
                <Tabs.TabPane tab={pane.title} key={pane.key}>{pane.content}</Tabs.TabPane>
              )
            }
          </Tabs>
        </Card>
      </div>
    )
  }
}

export default Spins