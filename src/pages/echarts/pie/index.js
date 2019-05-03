import React, { Component } from 'react'
import { Card, } from 'antd'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts/lib/echarts'
import echartsTheme from '../echartTheme'
// 按需导入
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'



class Pie extends Component {

  componentWillMount() {
    echarts.registerTheme('sharedbikes', echartsTheme)
  }

  getOption = () => {
    const option = {
        title: {
          text: '用户骑行订单'
        },
        legend: {
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          orient: 'vertical',
          right: '5%'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/> {b} {c} ({d}%)'
        },
        series: [
          {
            name: '订单量',
            type: 'pie',
            data: [
              {
                value: 100,
                name: '周一'
              },
              {
                value: 200,
                name: '周二'
              },
              {
                value: 300,
                name: '周三'
              },
              {
                value: 50,
                name: '周四'
              },
              {
                value: 600,
                name: '周五'
              },
              {
                value: 300,
                name: '周六'
              },
              {
                value: 400,
                name: '周日'
              },
            ].sort((a,b) => a.value-b.value)
          }
        ]
    };

    return option
  }

  getOption2 = () => {
      const option = {
        title: {
          text: '用户骑行订单'
        },
        legend: {
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          orient: 'vertical',
          right: '5%'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/> {b} {c} ({d}%)'
        },
        series: [
          {
            name: '订单量',
            type: 'pie',
            radius: ['50%', '80%'],
            data: [
              {
                value: 100,
                name: '周一'
              },
              {
                value: 200,
                name: '周二'
              },
              {
                value: 300,
                name: '周三'
              },
              {
                value: 50,
                name: '周四'
              },
              {
                value: 600,
                name: '周五'
              },
              {
                value: 300,
                name: '周六'
              },
              {
                value: 400,
                name: '周日'
              },
            ]
          }
        ]
    };

    return option
  }

  render() {
    return (
      <div>
        <Card title='柱形图一'>
          <ReactEcharts
            option={this.getOption()}
            notMerge={true}
            lazyUpdate={true}
            theme={"sharedbikes"}
            style={{height: 500}}
            // onChartReady={this.onChartReadyCallback}
            // onEvents={EventsDict}
            // opts={null}
             />
        </Card>
        <Card title='柱形图二'>
        <ReactEcharts
          option={this.getOption2()}
          notMerge={true}
          lazyUpdate={true}
          theme={"sharedbikes"}
          style={{height: 500}}/>
        </Card>
      </div>
    )
  }
}


export default Pie