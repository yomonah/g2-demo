import React, {Component} from 'react';
import { Router, Route, hashHistory, IndexRoute,IndexRedirect } from 'react-router';

import Nav from './components/nav/nav';
import Bubble from './components/bubble/main';
import Histogram from './components/histogram/main';
import Line from './components/line/main';

export default class Container extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className='app-content'>
        <Router history={hashHistory}>
          <Route path="/" component={Nav}>
            <IndexRedirect to="/bubble" />
             <Route path="/bubble" component={Bubble}/> 
             <Route path='/histogram' component={Histogram}/>
             <Route path='/line' component={Line}/>
          </Route>
        </Router>
      </div>
    )
  }
}