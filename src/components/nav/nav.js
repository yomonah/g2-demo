import './nav.less';
import React, {Component} from 'react';
import {Link} from 'react-router';
import Header from '../header/header';

export default class Nav extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
        this.pathProps = [
            {name:'气泡图', path:'/bubble'},
            {name:'柱形图', path:'/histogram'},
            {name:'线图', path:'/line'},
            // {name:'柱图', path:'/c'},
            // {name:'柱图', path:'/d'},
        ]
    }

    getLinks(){
        let link = this.pathProps && this.pathProps.map((item,i) => {
            return (<li key={'link'+i} className='menu-item'>
                        <Link to={item.path} activeClassName="active">{item.name}</Link>
                    </li>);
        })
        return link;
    }

    render(){
        let links = this.getLinks();
        return(
            <div className='app-wrapper'>
              <Header/>
              <div className='content'>
                <div className='menu-wrapper'>
                    <ul className='link-wrapper'>
                    {links}
                    </ul>
                </div>
                <div className='component-wrapper'>
                    {this.props.children}
                </div>
               </div>
               <div className='footer'>
                   <a href='https://github.com/yomonah/g2-demo' target='_blank'>g2-react完整项目源码</a>
                   <i className='split'>|</i>
                   <a href='https://antv.alipay.com/g2/doc/' target='_blank'>g2官方文档</a>
               </div>
            </div>
        )
    }
}