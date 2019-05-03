import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import { Editor, convertToRaw, ContentState } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'


class RichText extends Component {

  state = {
    editorState: '',
    editorContent: '',
    showHtml: false
  }

  
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  onContentStateChange = (editorContent) => {
    this.setState({
      editorContent
    })
  }

  handleClear = () => {
    this.setState({
      editorState: ''
    })
  }

  handleGetHtml = () => {
    this.setState({
      showHtml: true
    })
  }

  render() {
    const { editorState, editorContent, showHtml } = this.state
    return (
      <div>
        <Card>
          <Button type='primary' onClick={this.handleClear}>清空内容</Button>
          <Button type='primary' onClick={this.handleGetHtml}>获取HTML</Button>
        </Card>
        <Card title='富文本编辑器'>
          <Editor
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            onContentStateChange={this.onContentStateChange}
          >
          </Editor>
        </Card>
        <Modal 
          title='显示html内容'
          visible={showHtml}
          onCancel={() => this.setState({showHtml: false})}
          footer={null}
          >
            {
              draftToHtml(editorContent)
            }
        </Modal>
      </div>
    )
  }
}


export default RichText