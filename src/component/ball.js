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
    recent5: [],
    clicked: false
}
showHistory(e) {    
        let targ = parseInt(e.currentTarget.id);    
        let recent5 = () => {
            let arr = []
            for (let i = 0; i < 5; i++) {
                arr.push(text[i])
            }
            return arr;
        }
        let getSameNum = (arr) => arr.filter(data => 
            data.fst === targ || data.snd === targ || data.trd === targ ||
            data.foth === targ || data.fvth === targ || data.sth === targ ||
            data.bonus === targ
            )
        let textArr = text.filter(data => 
            data.fst === targ
            )
        let count = getSameNum(text).length    
        let arr = [];
        console.log(textArr)
        console.log(text[0])
        console.log(getSameNum(text))        
        for (let i = 0; i < 4; i++) {
            //let data = getSameNum(text)[i];
            //arr.push(`round :${data.round}, date: ${data.date} numbers: ${data.fst}, ${data.snd}, ${data.trd}, ${data.foth}, ${data.fvth}, ${data.sth}, ${data.bonus}`)
        }
        this.setState({
            recent5: arr
        })
        console.log(arr)
        console.log(count)
}

returnBall(color) {
    return <Ball id={this.props.num} onClick={this.showHistory} color >
    <Num >
     {this.props.num}
    </Num>                       
    <History >{this.state.recent5.map(data =><li>{data}</li>)} </History>
</Ball>
}

render() {    
    return (        
        this.props.num >= 40 ?        
        <Ball id={this.props.num} onClick={this.showHistory} green >
            <Num >
             {this.props.num}
            </Num>                       
            <History >{this.state.recent5.map(data =><li>{data}</li>)} </History>
        </Ball> :
        this.props.num >= 30 ?
        <Ball id={this.props.num} onClick={this.showHistory} grey>
            <Num>
             {this.props.num}
            </Num>            
            <History >{this.state.recent5.map(data =><li>{data}</li>)} </History>
        </Ball> :
        this.props.num >= 20 ?
        <Ball id={this.props.num} onClick={this.showHistory} red>
        <Num>
         {this.props.num}
        </Num>            
        <History >{this.state.recent5.map(data =><li>{data}</li>)} </History>
        </Ball> :
        this.props.num >= 10 ?
        <Ball id={this.props.num} onClick={this.showHistory} blue>
        <Num>
         {this.props.num}
        </Num>            
        <History >{this.state.recent5.map(data =><li>{data}</li>)} </History>
        </Ball> :
        <Ball id={this.props.num} onClick={this.showHistory} >  
        <Num>
         {this.props.num}
        </Num>            
        <History >{this.state.recent5.map(data =><li>{data}</li>)} </History>
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
    display:none;
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
