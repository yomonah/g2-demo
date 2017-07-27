import './title.less';
import React, {Component} from 'react';

export default class Title extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
      let {title} = this.props;
      return(
          <div className='title'>
            <h5>{title}</h5>
            <span>* 数据均为开发所造，并非真实数据</span>
          </div>
      )
    }
}