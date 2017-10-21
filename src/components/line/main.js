import React, {Component} from 'react';
import createG2 from 'g2-react';
import G2 from 'g2';
import Title from '../title/title';
import dataSet from '../../../static/mock/line.json';

var LineChart = null;

export default class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
          data: dataSet,
          forceFit: true,
          width: 500,
          height: 450,
          title:'g2 - 线图'
        }
    }

    componentWillMount(){
      this.lineChart();
    }

    componentWillUnmount(){
      LineChart && LineChart.destroy();
    }

    lineChart(){
      LineChart = createG2(chart => {
        chart.col('date', {
        alias: '2017年9月-10月',
        formatter: function(dimValue) {
          return dimValue ;
        }
      });
      chart.col('temperature', {
        min: 35,
        ticks: [35,35.5,36,36.5,37,37.5,38,38.5, 39,39.5,40,],
        alias:'基础温度(℃)'
      });
      chart.line().position('date*temperature').color('#4e7ccc');
      chart.render();
      });
    }

    render(){
      let {data, width, height, forceFit, title} = this.state;
      return(
          <div className='line-wrapper'>
            <Title title = {title}/>
            <span>普通线图</span>
            <LineChart data={data} width={width} height={height} forceFit={forceFit}/>
          </div>
      )
    }
}