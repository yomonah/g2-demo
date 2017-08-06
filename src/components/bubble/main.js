import React, {Component} from 'react';
import createG2 from 'g2-react';
import Title from '../title/title';
import dataSet from '../../../static/mock/bubble.json';

var BubbleChar = null;

export default class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
          data:dataSet,
          forceFit: true,
          width: 500,
          height: 450,
          title:'g2 - 气泡图'
        }
    }

    componentWillMount(){
      BubbleChar = createG2(chart => {
        chart.cols({
          'city': {
            alias: '城市'
          },
          'total': {
            type: 'pow',
            alias: '人口总数'
          },
          'girl': {
            alias: '女性人口数'
          },
          'boy': {
            alias: '男性人口数'
          }
        });
        chart.axis('boy', {
          // 格式化坐标轴的显示
          formatter: function (value) {
            return (value / 1000000).toFixed(0) + 'm';
          }
        });
        chart.axis('girl', {
          // 格式化坐标轴的显示
          formatter: function (value) {
            return (value / 1000000).toFixed(0) + 'm';
          }
        });
        chart.tooltip({
          title: null // 不显示默认标题
        });
        // 该图表默认会生成多个图例，设置不展示 Population 和 Country 两个维度的图例
        chart.legend('total', false);
        chart.point().position('boy*girl')
          .size('total', 35, 5)
          .color('province')
          .opacity(0.65)
          .shape('circle')
          .tooltip('city*total*girl*boy');
        chart.render();
      });
    }

    render(){
      let {data, width, height, forceFit, title} = this.state;
      return(
          <div className='bubble-wrapper'>
            <Title title = {title}/>
            <BubbleChar data={data} width={width} height={height} forceFit={forceFit}/>
          </div>
      )
    }
}