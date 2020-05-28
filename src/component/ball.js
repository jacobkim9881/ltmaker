import React, { Component } from 'react';
import styled from 'styled-components'

import * as d3 from 'd3'
import text from '../text.json'
const history = require('../history.csv')

class ball extends Component {
constructor(props) {
    super(props);
    this.showHistory = this.showHistory.bind(this);
}
state = {
    history: [],
    clicked: false
}
showHistory(e) {    
        let targ = parseInt(e.currentTarget.id);    
        let tarArr = text.filter(data => 
            data.fst == targ || data.snd == targ || data.trd == targ ||
            data.foth == targ || data.fvth == targ || data.sth == targ ||
            data.bonus == targ
            )
        let count = tarArr.length    
        let arr = [];
        for (let i = 0; i < tarArr.length; i++) {
            let data = tarArr[i];
            arr.push(`round :${data.round}, date: ${data.date}`)
        }
        this.setState({
            history: arr
        })
        console.log(arr)
        console.log(count)
}

render() {
    return (        
        this.props.num >= 40 ?        
        <Ball id={this.props.num} onClick={this.showHistory} green >
            <Num >
             {this.props.num}
            </Num>                       
            <History >{this.state.history.map(data =><li>{data}</li>)} </History>
        </Ball> :
        this.props.num >= 30 ?
        <Ball id={this.props.num} onClick={this.showHistory} grey>
            <Num>
             {this.props.num}
            </Num>            
            <History >{this.state.history.map(data =><li>{data}</li>)} </History>
        </Ball> :
        this.props.num >= 20 ?
        <Ball id={this.props.num} onClick={this.showHistory} red>
        <Num>
         {this.props.num}
        </Num>            
        <History >{this.state.history.map(data =><li>{data}</li>)} </History>
        </Ball> :
        this.props.num >= 10 ?
        <Ball id={this.props.num} onClick={this.showHistory} blue>
        <Num>
         {this.props.num}
        </Num>            
        <History >{this.state.history.map(data =><li>{data}</li>)} </History>
        </Ball> :
        <Ball id={this.props.num} onClick={this.showHistory} >  
        <Num>
         {this.props.num}
        </Num>            
        <History >{this.state.history.map(data =><li>{data}</li>)} </History>
        </Ball>
    )
}
}
export default ball;
        

// Random color: hsl(${() => Math.trunc(Math.random()* 361)}, 100%, 50%);

const Ball = styled.div`
@media screen and (min-width: 480px) {
    width: 100px;
    height: 100px;
    background-color: ${props => props.green ?
    "hsl(75, 66%, 55%);" : 
        props.grey ?
        "hsl(0, 0%, 67%)" : props.red ?
        "hsl(1, 92%, 71%);" : props.blue? 
        "hsl(198, 84%, 67%);" : "hsl(47, 100%, 49%)"
};
    border-radius: 50%;
    display: inline-block;
    margin: 10px;
}
    width: 30px;
    height: 30px;
    background-color: ${props => props.green ?
    "hsl(75, 66%, 55%);" : 
        props.grey ?
        "hsl(0, 0%, 67%)" : props.red ?
        "hsl(1, 92%, 71%);" : props.blue? 
        "hsl(198, 84%, 67%);" : "hsl(47, 100%, 49%)"
};
    border-radius: 50%;
    display: inline-block;
    margin: 3px;
`

const History = styled.p`
    width: 300px;
    height: 20px;
    font-size: 15px;
    color: black;
    z-index: 1;
    position: fixed;
`
const Num = styled.p`
@media screen and (min-width: 480px) {
    font-size: 32px;
    font-weight: bold;
    color: white;
    padding-top: 25px;
    text-align: center;
}
    font-size: 14px;
    font-weight: bold;
    margin-top: 5px;
    color: white;
    text-align: center;

    &:hover ${History} {
        display: block
    }
`
