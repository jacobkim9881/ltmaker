import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'

import Machine from './Machine'
import Insight from './component/Insight'
import Insight2 from './component/Insight2'
import Graph from './component/Graph1'
import LottoQr from './component/LottoQr'

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
                <StyledLink to='insight'>로또 번호 분석</StyledLink> {'\t'}
                <StyledLink to='history'>로또 통계</StyledLink> {'\t'}             
                {
                 //  <StyledLink to='graph'>로또 그래프</StyledLink> {'\t'}                
                }             
                <StyledLink to='qrcode'>로또 당첨 확인</StyledLink> {'\t'}        
                </Nav>
                </HeadOne>
                <div>
                <Switch>                          
                    <Route path='/qrcode' children={<LottoQr />} />
                    <Route path='/graph' children={<Graph />} />
                    <Route path='/history' children={<Insight2 />} />
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
    height: 100%;
    width: 90%;
    text-align: center;
`

const Nav = styled.div`
    display:block;
    width: 100%;
    position: absolute;
    padding: 10px;    
    left: 10%;
`

const StyledLink = styled(Link)`
    left: 0;    
    text-decoration: none;
    border: 1px solid hsl(0, 0%, 53%);    
    box-shadow: 1px 3px hsl(0, 0%, 53%);
    border-radius: 10px;
    padding: 10px;
    color: hsl(0, 0%, 0%);
    line-height: 3;
    text-align: justify;
    word-break: break-word;

    &: visited {        
        color: hsl(0, 0%, 0%);
    }
`