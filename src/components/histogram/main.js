import React, {Component} from 'react';
import createG2 from 'g2-react';
import G2 from 'g2';
import Title from '../title/title';
import dataSet from '../../../static/mock/histogram.json';
import dataSet2 from '../../../static/mock/histogram2.json';
import dataSet3 from '../../../static/mock/histogram3.json';

var HistogramChart = null;
var HistogramChart2 = null;
var HistogramChart3 = null;

export default class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
          data: dataSet,
          data2: dataSet2,
          data3: dataSet3,
          forceFit: true,
          width: 500,
          height: 450,
          plotCfg: {
            margin: [20, 60, 80, 120]
          },
          title:'g2 - 柱形图'
        }
    }

    componentWillMount(){
      //普通柱形图
      this.getHistogramChart();
      
      //分类柱形图
      this.getHistogramChart2();

      //自定义柱形图
      this.getHistogramChart3();
    }

    componentDidMount(){
      let self = this;
      this.timer = setInterval(self.changeData.bind(this), 2000); 
    }

    componentWillUnmount(){
      this.timer && clearInterval(this.timer);
      HistogramChart && HistogramChart.destroy();
      HistogramChart2 && HistogramChart2.destroy();
      HistogramChart3 && HistogramChart3.destroy();
    }

    getHistogramChart(){
      HistogramChart = createG2(chart => {
        chart.col('time', {
        alias: '2017年各月份',
        formatter: function(dimValue) {
          return dimValue + '月';
        }
      });
      chart.col('value', {
        min: 0,
        alias:'销售量'
      });
      chart.interval().position('time*value').color('#54becc');
      chart.render();
      });
    }

    getHistogramChart2(){
      const Shape = G2.Shape;
      Shape.registShape('interval', 'textInterval', {
        drawShape(cfg, group) {
          const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
          const value = cfg.origin._origin.users;  //获取value值
          group.addShape('text', {
            attrs: {
              text: value,
              textAlign: 'center',
              x: points[1].x + cfg.size / 2, //这里的size需要去interval()后定义
              y: points[1].y,
              fontSize: 12,
              fontFamily: 'PingFang SC',
              fill: '＃999'
            },
          });
          const polygon = group.addShape('polygon', {
            attrs: {
              points: points.map(point => [point.x, point.y]),
              fill: cfg.color,
            },
          });
          return polygon;
        },
      });
      HistogramChart2 = createG2(chart => {
        let colorSet = {
          苹果: '#4FAAEB',
          三星: '#9AD681',
          华为: '#FED46B',
        };  //设置柱子颜色
        chart.cols({
          'category':{
            type: 'cat',
            alias: '手机品牌'
          },
          'users':{
            min: 0,
            alias: '当日新增用户量',
          }
        })
        chart.interval().shape('textInterval').position('category*users').color('category',value => colorSet[value]).size(120);
        chart.render();
      });
    }

    getHistogramChart3(){
      HistogramChart3 = createG2(chart => {
        // 自定义 shape, 支持图片形式的气泡
        var Shape = G2.Shape;
        Shape.registShape('interval', 'textInterval', {
          drawShape(cfg, group) {
            const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
            const value = cfg.origin._origin.vote;  //获取value值
            group.addShape('text', {
              attrs: {
                text: value,
                textAlign: 'center',
                x: points[1].x + cfg.size / 2, //这里的size需要去interval()后定义
                y: points[1].y,
                fontSize: 12,
                fontFamily: 'PingFang SC',
                fill: '＃999'
              },
            });
            const polygon = group.addShape('polygon', {
              attrs: {
                points: points.map(point => [point.x, point.y]),
                fill: cfg.color,
              },
            });
            return polygon;
          },
        });
        Shape.registShape('interval', 'image-top', {
          drawShape: function(cfg, container) {
            var points = cfg.points; // 点从左下角开始，顺时针方向
            const value = cfg.origin._origin.vote;  //获取value值
            var path = [];
            path.push(['M', points[0].x, points[0].y]);
            path.push(['L', points[1].x, points[1].y]);
            path = this.parsePath(path);
            return container.addShape('rect', {
              attrs: {
                x: cfg.x - 50,
                y: path[1][2], // 矩形起始点为左上角
                width: 100,
                height: path[0][2] - cfg.y,
                fill: cfg.color,
                stroke: cfg.color,
                fillOpacity: 0.5,  //设置透明度
                radius: 5
              }
            });
          }
        });
        chart.col('vote', {
          min: 0
        });
        chart.legend(false);
        chart.axis('vote', {
          title: null,
        });
        chart.axis('name', {
          title: null
        });
        chart.interval().shape('textInterval').position('name*vote').size(100);
        chart.interval().position('name*vote').color('name', ['#db4c3c','#B0E2FF','#20B2AA','#fec514',]).shape('image-top');
          
        chart.render(); 
      });
    }

    changeData(){
      let dataTemp = [];
      let {data} = this.state;
      for( var i=0; i<data.length; i++){
        let item = {
          time: i+1+'',
          value: Math.floor(Math.random()*50)
        }
        dataTemp.push(item);
      }
      this.setState({data:dataTemp});
    }

    render(){
      let {data, data2, data3, width, height, forceFit, title} = this.state;
      return(
          <div className='histogram-wrapper'>
            <Title title = {title}/>
            <span>普通柱形图</span>
            <HistogramChart data={data} width={width} height={height} forceFit={forceFit}/>
            <br/>
            <br/>
            <br/>
            <span>分类柱形图</span>
            <HistogramChart2 data={data2} width={width} height={height} forceFit={forceFit}/>
            <br/>
            <br/>
            <br/>
            <span>自定义柱形图</span>
            <HistogramChart3 data={data3} width={width} height={height} forceFit={forceFit}/>
          </div>
      )
    }
}