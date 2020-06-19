import React, { Component } from 'react';
import styled from 'styled-components'

import Insight from './Insight'
import db from '../text.json'

class Insight2 extends Component {
    constructor() {
        super();
        this.addClicked = this.addClicked.bind(this);
        this.findNum = this.findNum.bind(this);
    }

    state = {
        nums: [],
        colored: []
    }

    componentDidMount() {
        let nums = this.state.nums;
        for (let i = 0; i < 46; i++) {
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


    render() {        
        return (
            <div>
                <History>
                    {db.map(data =>                                         
                    <Nums>{data.round}: {this.state.nums.map(num => 
                        parseInt(data.fst, 10) === num ||
                        parseInt(data.snd, 10) === num ||
                        parseInt(data.trd, 10) === num ||
                        parseInt(data.foth, 10) === num ||
                        parseInt(data.fvth, 10) === num ||
                        parseInt(data.sth, 10) === num ||
                        parseInt(data.bonus, 10) === num ?
                        <Num id={num}>{num}</Num> :
                        <HideNum id={num}>{num}</HideNum>
                        )}
                    </Nums>)}
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
    width: 100%;
`

const Num = styled.span`
    display: inline-block;
    width: 30px;
    height: 28px;
    text-align: center;
    background-color: hsl(0, 100%, 80%);
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