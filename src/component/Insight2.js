import React, { Component } from 'react';
import styled from 'styled-components'

import Insight from './Insight'
import db from '../text.json'

class Insight2 extends Component {
    constructor() {
        super();
        this.addClicked = this.addClicked.bind(this);
        this.findNum = this.findNum.bind(this);
        this.setSprayingType = this.setSprayingType.bind(this);
        this.numSpraying = this.numSpraying.bind(this);
        this.setRange = this.setRange.bind(this);
    }

    state = {
        nums: [],
        colored: [],
        numSprayed: 'default',
        bonus: false,
        width: 100
    }

    componentDidMount() {
        let nums = this.state.nums;
        for (let i = 1; i < 46; i++) {
            nums.push(i);
        }
        this.setState({nums: nums});
    }

    addClicked(e) {
        let colored = this.state.colored;
        let id = e.target.id;
        let num = parseInt(id.match(/[^n]+/g)[0], 10);
        let round = parseInt(id.match(/[^n]+/g)[1], 10);
        colored.push([num, round])
        this.setState({colored: colored});
        console.log(this.state.colored)
    }

    findNum(num, round) {
        let colored = this.state.colored;
        for (let i = 0; i < colored.length; i++) {
            if (colored[i][0] === num && colored[i][1] === round) {
                return true;
            }
        }
        return false;
    }

    setRange(e) {        
        this.setState({width: parseInt(e.target.id, 10)});        
    }

    setSprayingType(e) {
        this.setState({numSprayed: e.target.id})
    }

    numSpraying(data, type, widthNum) {        
        switch(type) {
            case 'default':
            return <div>
            <Round>{data.round}</Round>: <Nums width={widthNum}>{this.state.nums.map(num => 
                parseInt(data.bonus, 10) === num && this.state.bonus === true ? 
                <Num bonus id={num}>{num}</Num> :
                parseInt(data.bonus, 10) === num ||
                parseInt(data.fst, 10) === num ||
                parseInt(data.snd, 10) === num ||
                parseInt(data.trd, 10) === num ||
                parseInt(data.foth, 10) === num ||
                parseInt(data.fvth, 10) === num ||
                parseInt(data.sth, 10) === num ?
                <Num id={num}>{num}</Num> :                 
                <HideNum id={num}>{num}</HideNum>
                )}
            </Nums>
            </div>
        }
    }


    render() {        
        return (
            <div>
                <History>
                    <br/>
                    현재까지 나온 당첨 번호들입니다. 흐린 색의 숫자는 당첨되지 않은 숫자입니다. 
                    <br/><br/>
                    <input type='checkbox' onChange={() => this.setState({bonus: !this.state.bonus})} />보너스 번호 표시하기 <br/>
                    <input type='button' value={3} id='6' onClick={this.setRange} /> <br />
                    <input type='button' value={5} id='10' onClick={this.setRange} /> <br />
                    <input type='button' value={9} id='17' onClick={this.setRange} /> <br />
                    <input type='button' value={15} id='27' onClick={this.setRange} /> <br />
                    <input type='button' value={45} id='90' onClick={this.setRange} /> <br />
                    {
                    //<input type='radio' onChange={this.setSprayingType} name='width' defaultChecked={true} id='default'/>45자리로 숫자 배치 <br/>
                    //<input type='radio' onChange={this.setSprayingType} name='width' id='seven'/>7자리로 숫자 배치 <br/>
                    //<input type='radio' onChange={this.setSprayingType} name='width' id='ten'/>10자리로 숫자 배치 <br/>
                    //<input type='radio' onChange={this.setSprayingType} name='width' id='twelve'/>12자리로 숫자 배치 <br/>
                    //<input type='radio' onChange={this.setSprayingType} name='width' id='fifteen'/>15자리로 숫자 배치 <br/>
                    //<input type='radio' onChange={this.setSprayingType} name='width' id='twenty'/>20자리로 숫자 배치 <br/>
                    }
                    {db.filter(data => parseInt(data.round, 10) > 910).map(data => this.numSpraying(data, this.state.numSprayed, this.state.width))                                        
                    }
                </History>
            </div>
        );
    }
}

export default Insight2;

const History = styled.ul`

`

const Nums = styled.li`
    list-style-type: none;
    width: ${props => props.width + "%;"}
`

const Round = styled.span`
    display: inline-block;
    height: 100%;
`

const Num = styled.span`
    display: inline-block;
    width: 30px;
    height: 28px;
    text-align: center;
    background-color: ${props => props.bonus? "yellow;" : "hsl(0, 100%, 80%);"} 
    font-size: 25px;
    cursor: pointer;
    margin: 0px;
    border: 1px solid grey;

    
`

const HideNum = styled.span`
    color: hsl(0, 0%, 80%);
    display: inline-block;
    width: 30px;
    height: 28px;
    text-align: center;
    font-size: 25px;
    cursor: pointer;
    margin: 0px;
    border: 1px solid grey;
`