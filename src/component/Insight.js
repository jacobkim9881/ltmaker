import React, { Component } from 'react';
import styled from 'styled-components'

import db from '../text.json'

class Insight extends Component {
    constructor() {
        super();
        this.showNum = this.showNum.bind(this);
        this.chooseArg = this.chooseArg.bind(this);
        this.switchFunc = this.switchFunc.bind(this);
        this.showRightOne = this.showRightOne.bind(this);
        this.getRightOne = this.getRightOne.bind(this);
        this.showChained = this.showChained.bind(this);
        this.deleteBlanks = this.deleteBlanks.bind(this);
        this.mappingNums = this.mappingNums.bind(this);
    }

    state = {
        clicked: true,
        clickedNum: [],
        arg: 'same',
        filtering: false
    }

    mappingNums() {
        db.map(data => <Nums >
            <Round 
             fClr={data.round} max={db.length}>{data.round}</Round> : 
            {this.switchFunc(data.fst)
        },                     
            {this.switchFunc(data.snd)}, 
            {this.switchFunc(data.trd)}, 
            {this.switchFunc(data.foth)}, 
            {this.switchFunc(data.fvth)}, 
            {this.switchFunc(data.sth)} + 
            {this.switchFunc(data.bonus)}                    
            </Nums>);                    
    }

    chooseArg(e) {
        this.setState({arg: e.target.id})
    }

    showNum(e) {        
        let arr = this.state.clickedNum
        let inx = this.state.clickedNum.indexOf(parseInt(e.target.id, 10));    
        if (inx !== -1) {
            arr.splice(inx, 1);
            this.setState({ clickedNum: arr})
        } else {
            this.setState({
                clickedNum: this.state.clickedNum.concat(parseInt(e.target.id, 10))
            })
        }        
    }

    getRightOne(num) {
        if (num.length === 1) {
            return parseInt(num[0], 10);
        } else if (num.length === 2) {
            return parseInt(num[1], 10);
        }         
    }

    showRightOne(e) {
        let arr = this.state.clickedNum;
        let num = e.target.id;
        let right = this.getRightOne(num);
        let inx = this.state.clickedNum.indexOf(parseInt(right, 10));    
        if (inx !== -1) {
            arr.splice(inx, 1);
            this.setState({ clickedNum: arr})
        } else {
            arr.push(this.getRightOne(num));
            this.setState({ clickedNum: arr })
        }        
    }

    showChained(e) {
        let arr = this.state.clickedNum
        let inx = this.state.clickedNum.indexOf(parseInt(e.target.id, 10));         
        console.log(inx)
        if (inx !== -1) {
            arr.splice(inx, 1);
            this.setState({ clickedNum: arr});
        } else {
            arr.push(parseInt(e.target.id));            
            this.setState({ clickedNum: arr });
        }           
    }

    switchFunc(data) {
        let arg = this.state.arg;
        switch(arg) {
            case 'same' :
            return this.state.clickedNum.indexOf(parseInt(data, 10)) !== -1 ?
            <Num onClick={this.showNum} id={data}>{data}</Num> :
            <HideNum onClick={this.showNum} id={data}>{data}</HideNum> ;
            case 'right' :
            return this.state.clickedNum.indexOf(this.getRightOne(data)) !== -1 ?
            <Num onClick={this.showRightOne} id={data}>{data}</Num> :
            <HideNum onClick={this.showRightOne} id={data}>{data}</HideNum> ;            
            case 'chain' :
            return this.state.clickedNum.indexOf(parseInt(data, 10)) !== -1 || 
            this.state.clickedNum.indexOf(parseInt(data, 10) - 1) !== -1 || 
            this.state.clickedNum.indexOf(parseInt(data, 10) + 1) !== -1 ?
            <Num onClick={this.showChained} id={data}>{data}</Num> :
            <HideNum onClick={this.showChained} id={data}>{data}</HideNum> ;
        }
    }

    deleteBlanks() {
        let arr = this.state.clickedNum;
        if (this.state.clickedNum.length > 0) {
            return db.map(data => 
            (arr.indexOf(parseInt(data.fst)) !== - 1 ||
            arr.indexOf(parseInt(data.snd)) !== - 1 ||
            arr.indexOf(parseInt(data.trd)) !== - 1 ||
            arr.indexOf(parseInt(data.fort)) !== - 1 ||
            arr.indexOf(parseInt(data.fvth)) !== - 1 ||
            arr.indexOf(parseInt(data.sth)) !== - 1 ||
            arr.indexOf(parseInt(data.bonus)) !== - 1
            ) ?
                 <Nums >
                    <Round 
                     fClr={data.round} max={db.length}>{data.round}</Round> : 
                    {this.switchFunc(data.fst)
                },                     
                    {this.switchFunc(data.snd)}, 
                    {this.switchFunc(data.trd)}, 
                    {this.switchFunc(data.foth)}, 
                    {this.switchFunc(data.fvth)}, 
                    {this.switchFunc(data.sth)} + 
                    {this.switchFunc(data.bonus)}                    
                    </Nums> : ''            
            )
        }
    }

    render() {
        return (
            <div>
                {//<input type='checkbox' onChange={() => this.setState({filtering : !this.state.filtering})} /> 번호 중복 <br />
                }
                <form>
                    <input type='radio' id='same' onClick={this.chooseArg} /> 같은 수 : 숫자를 클릭하면 같은 숫자들을 강조합니다. <br />
                    <input type='radio' id='right' onClick={this.chooseArg} /> 끝수 : 숫자를 클릭하면 끝자리가 같은 숫자들을 강조합니다.<br />
                    <input type='radio' id='chain' onClick={this.chooseArg} /> 연번 : 숫자를 클릭하면 해당 숫자의 +-1 에 해당하는 숫자들을 강조합니다.<br />
                </form>
                <ul>
                    {db.map(data => <Nums >
            <Round 
             fClr={data.round} max={db.length}>{data.round}</Round> : 
            {this.switchFunc(data.fst)
        },                     
            {this.switchFunc(data.snd)}, 
            {this.switchFunc(data.trd)}, 
            {this.switchFunc(data.foth)}, 
            {this.switchFunc(data.fvth)}, 
            {this.switchFunc(data.sth)} + 
            {this.switchFunc(data.bonus)}                    
            </Nums>)
                }
                </ul>
            </div>
        );
    }
}

export default Insight;

const Nums = styled.li`
    list-style-type: none;
`

const Round = styled.span`
    background-color: hsl(
    ${props => ((1 - props.fClr/props.max) * 240)},
    100%,
    70%
)
`

const Num = styled.span`
    display: inline-block;
    width: 30px;
    height: 28px;
    text-align: center;
    background-color: hsl(0, 100%, 80%);
    font-size: 25px;
    cursor: pointer;
    margin: 5px;
`

const HideNum = styled.span`
    color: hsl(0, 0%, 80%);
    display: inline-block;
    width: 30px;
    height: 28px;
    text-align: center;
    font-size: 25px;
    cursor: pointer;
    margin: 5px;
`