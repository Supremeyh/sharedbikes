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



class Bar extends Component {

  componentWillMount() {
    echarts.registerTheme('sharedbikes', echartsTheme)
  }

  getOption = () => {
    const option = {
        title: {
          text: '用户骑行订单'
        },
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };

    return option
  }

  getOption2 = () => {
      const option = {
        title: {
          text: '各种单车对比'
        },
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
          data: ['ofo', 'mobike', 'hellobike'],
          right: '10%'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'ofo',
                type:'bar',
                barWidth: '20%',
                data:[30, 52, 200, 404, 390, 330, 220]
            },
            {
              name:'mobike',
              type:'bar',
              barWidth: '20%',
              data:[10, 52, 200, 204, 390, 530, 20]
            },
            {
              name:'hellobike',
              type:'bar',
              barWidth: '20%',
              data:[100, 52, 200, 504, 30, 60, 100]
            },
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


export default Bar