import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'

import Machine from './Machine'
import Insight from './component/Insight'
import Insight2 from './component/Insight2'

class App extends Component {
    render() {
        return (            
            <Router>
                <HeadOne>
                <Top>
                <Logo>L</Logo>
                <Banner>
                    로또 번호 기록을 분석하여 원하는 번호를 설정합니다
                </Banner>
                </Top>
                <Nav>
                <StyledLink to='/'>로또 번호 제조기</StyledLink> {'\t'}
                <StyledLink to='insight'>로또 번호 분석</StyledLink>
                </Nav>
                </HeadOne>
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

const HeadOne = styled.div`
    display: inline-block;
    width: 100%;
`

const Top = styled.div`
    display: block;
    width: 100%;
`

const Logo = styled.span`
    display: inline-block;
    width: 10%;
    height: 100px;
    font-size: 100px;
`

const Banner = styled.h2`
    display: inline-block;
    width: 90%;
    text-align: center;
`

const Nav = styled.div`
    display:block;
    width: 100%;
    position: absolute;
    left: 10%;
`

const StyledLink = styled(Link)`
    left: 0;
`