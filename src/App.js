import React, { Component } from 'react';
import './App.css';
import './style.less'
import { Input, Button } from 'antd'
import 'antd/dist/antd.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header test">
          <span>react </span>
          <Input />
          <Button> button </Button>
        </header>
      </div>
    );
  }
}

export default App;
