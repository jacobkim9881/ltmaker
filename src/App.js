import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Machine from './Machine'
import Insight from './component/Insight'
import Insight2 from './component/Insight2'

class App extends Component {
    render() {
        return (            
            <Router>
                <a><Link to='/'>Home</Link></a> {'\t'}
                <a><Link to='insight'>Insight</Link></a>                
                <div>
                <Switch>                          
                    <Route path='/insight2' children={<Insight />} />
                    <Route path='/insight' children={<Insight />} />
                    <Route path='/' children={<Machine />} />          
                </Switch>
                </div>
            </Router>      
        );
    }
}

export default App;