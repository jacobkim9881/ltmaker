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
        this.filterCount = this.filterCount.bind(this);
        this.diffArray = this.diffArray.bind(this);
        this.tempRounds = this.tempRounds.bind(this);
        this.showEven = this.showEven.bind(this);
    }

    state = {
        clicked: true,
        clickedNum: [],
        arg: 'ten',
        filtering: 'default',
        round: 0
    }

    mappingNums() {
        return <div>ddd</div>
    }

    chooseArg(e) {
        if (e.target.id === 'ten') {
            this.setState({arg: e.target.id,
            filtering: 'ten'
            })    
        } else if (e.target.id === 'total') {
            this.setState({filtering: 'total'})
        }  else if (e.target.id === 'even') {
            this.setState({filtering: 'even'})
        } else {
            this.setState({arg: e.target.id,
            filtering: 'default'})
        }
        
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
        if (inx !== -1) {
            arr.splice(inx, 1);
            this.setState({ clickedNum: arr});
        } else {
            arr.push(parseInt(e.target.id));            
            this.setState({ clickedNum: arr });
        }           
    }

    findNumMtd(arg, data) {
        let arr = this.state.clickedNum;
        switch(arg) {
            case 'same' :
            return arg.indexOf(parseInt(data, 10));
            case 'right' :
            return arg.indexOf(this.getRightOne(data));
        }
    }

    showEven(data) {
        let even = 0;
        let odd = 0;
        if (parseInt(data.fst, 10) % 2 === 0) {
            even++
        } else {
            odd ++
        }
        if (parseInt(data.snd, 10) % 2 === 0) {
            even++
        } else {
            odd ++
        }
        if (parseInt(data.trd, 10) % 2 === 0) {
            even++
        } else {
            odd ++
        }
        if (parseInt(data.foth, 10) % 2 === 0) {
            even++
        } else {
            odd ++
        }
        if (parseInt(data.fvth, 10) % 2 === 0) {
            even++
        } else {
            odd ++
        }
        if (parseInt(data.sth, 10) % 2 === 0) {
            even++
        } else {
            odd ++
        }
        if (parseInt(data.bonus, 10) % 2 === 0) {
            even++
        } else {
            odd ++
        }
        return even;
    }

    switchFunc(data, round) {
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
            case 'write' :
            return  this.tempRounds(data, round) ? 
            <Num onClick={this.showChained} id={data}>{data}</Num> :
            <HideNum onClick={this.showChained} id={data}>{data}</HideNum> 
            ;            
            case 'ten':
            return parseInt(data, 10) < 10 ?
            <Sector4Num tens id={data}>{data}</Sector4Num> : 
            parseInt(data, 10) < 20 ?
            <Sector4Num twenties id={data}>{data}</Sector4Num> : 
            parseInt(data, 10) < 30 ?
            <Sector4Num thirties id={data}>{data}</Sector4Num> : 
            parseInt(data, 10) < 40 ?
            <Sector4Num forties id={data}>{data}</Sector4Num> :
            <Sector4Num rest id={data}>{data}</Sector4Num>
            case 'doubleNum':
            return data[0] === data[1] ?
            <Num onClick={this.showChained} id={data}>{data}</Num> :             
            <HideNum onClick={this.showChained} id={data}>{data}</HideNum> 
        }
    }

    deleteBlanks() {
    }

    tempRounds(data, round) {
        let arr = [];
        let nRound = db.length
        let formerRound = round - 1;
        let laterRound = round + 1;
        if (typeof db[nRound % formerRound] !== 'undefined') {
            arr.push(parseInt(db[nRound % formerRound].fst, 10));    
            arr.push(parseInt(db[nRound % formerRound].snd, 10));    
            arr.push(parseInt(db[nRound % formerRound].trd, 10));    
            arr.push(parseInt(db[nRound % formerRound].foth, 10));    
            arr.push(parseInt(db[nRound % formerRound].fvth, 10));    
            arr.push(parseInt(db[nRound % formerRound].sth, 10));    
            arr.push(parseInt(db[nRound % formerRound].bonus, 10));    
        }
        if (typeof db[nRound % laterRound] !== 'undefined') {
            arr.push(parseInt(db[nRound % laterRound].fst, 10));    
            arr.push(parseInt(db[nRound % laterRound].snd, 10));    
            arr.push(parseInt(db[nRound % laterRound].trd, 10));    
            arr.push(parseInt(db[nRound % laterRound].foth, 10));    
            arr.push(parseInt(db[nRound % laterRound].fvth, 10));    
            arr.push(parseInt(db[nRound % laterRound].sth, 10));    
            arr.push(parseInt(db[nRound % laterRound].bonus, 10));    
        }
        if (round == '915') {
            console.log(db.length + " " + db[nRound % formerRound].fst + " " + round + " " + data + " " + arr)
        }
        

        if (arr.indexOf(parseInt(data, 10)) !== - 1) {
            return true;
        } else {
            return false;
        }
    }

    filterCount(arg) {        
        switch(arg) {
            case 'default':
            return db.map(data => <Nums >
                <Round 
                 fClr={data.round} max={db.length}>{data.round}</Round> : 
                {this.switchFunc(data.fst, parseInt(data.round, 10))
            },                     
                {this.switchFunc(data.snd, parseInt(data.round, 10))}, 
                {this.switchFunc(data.trd, parseInt(data.round, 10))}, 
                {this.switchFunc(data.foth, parseInt(data.round, 10))}, 
                {this.switchFunc(data.fvth, parseInt(data.round, 10))}, 
                {this.switchFunc(data.sth, parseInt(data.round, 10))} + 
                {this.switchFunc(data.bonus, parseInt(data.round, 10))} 
                </Nums>);          
            case 'even':
            return db.map(data => <Nums >
                <Round 
                 fClr={data.round} max={db.length}>{data.round}</Round> : 
                {this.switchFunc(data.fst, parseInt(data.round, 10))
            },                     
                {this.switchFunc(data.snd, parseInt(data.round, 10))}, 
                {this.switchFunc(data.trd, parseInt(data.round, 10))}, 
                {this.switchFunc(data.foth, parseInt(data.round, 10))}, 
                {this.switchFunc(data.fvth, parseInt(data.round, 10))}, 
                {this.switchFunc(data.sth, parseInt(data.round, 10))} + 
                {this.switchFunc(data.bonus, parseInt(data.round, 10))}
                {this.showEven(data) >= 4 ? "짝" : "홀"}, 
                {7 - this.showEven(data)} : {this.showEven(data)}
                </Nums>);           
            case 'write':
            return db.map(data => <Nums >
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
            case 'total':
            return db.map(data => <Nums >
                <Round 
                 fClr={data.round} max={db.length}>{data.round}</Round> : 
                <Total color={parseInt(data.fst, 10) + 
                parseInt(data.snd, 10) +
                parseInt(data.trd, 10) +
                parseInt(data.foth, 10) + 
                parseInt(data.fvth, 10) +
                parseInt(data.sth, 10) +
                parseInt(data.bonus, 10)}>
                    {parseInt(data.fst, 10) + 
                parseInt(data.snd, 10) +
                parseInt(data.trd, 10) +
                parseInt(data.foth, 10) + 
                parseInt(data.fvth, 10) +
                parseInt(data.sth, 10) +
                parseInt(data.bonus, 10)}
                </Total>
                </Nums>);
          }
        
    }

    diffArray(arr1, arr2) {
        var newArr = [];
        newArr = arr1.slice(0, arr1.length);  
        let otherArr = [];
        otherArr = arr2.slice(0, arr2.length);
        
        for (let i = newArr.length - 1; i >= 0; i--) {
          let index = otherArr.indexOf(newArr[i]);
          if (index != -1) {
            newArr.splice(i, 1);
            otherArr.splice(index, 1);
          }
          
        }

        let newLength = otherArr.concat(newArr).length;
        let length = arr1.concat(arr2).length;

        if(newLength === length) {
            return 1;
        } else {
            return -1;
        }
      }

    render() {                           
        return (
            <div>                
                {this.state.test}                
                {//<input type='checkbox' onChange={() => this.setState({filtering : !this.state.filtering})} /> 번호 중복 <br />
                }
                <Consoles>
                    <input type='radio' defaultChecked={true} name="typeArg" id='ten' onClick={this.chooseArg} /> 10번대로 끊기 : 숫자들을 10번대로 색을 칠해 구분합니다.<br />                    
                    <input type='radio' name="typeArg" id='same' onClick={this.chooseArg} /> 같은 수 : 숫자를 클릭하면 같은 숫자들을 강조합니다. <br />
                    <input type='radio' name="typeArg" id='right' onClick={this.chooseArg} /> 끝수 : 숫자를 클릭하면 끝자리가 같은 숫자들을 강조합니다.<br />
                    <input type='radio' name="typeArg" id='doubleNum' onClick={this.chooseArg} /> 쌍수 : 각 자리의 수가 같은 숫자들을 강조합니다.<br />                                        
                    <input type='radio' name="typeArg" id='chain' onClick={this.chooseArg} /> 연번 : 숫자를 클릭하면 해당 숫자의 +-1 에 해당하는 숫자들을 강조합니다.<br />                                        
                    <input type='radio' name="typeArg" id='write' onClick={this.chooseArg} /> 이월수 : 각 회차의 +-1 에 해당하는 회차에서 겹치는 숫자들을 강조합니다.<br />                                        
                    <input type='radio' name="typeArg" id='total' onClick={this.chooseArg} /> 합계 : 각 회차의 합계<br />                                        
                    <input type='radio' name="typeArg" id='even' onClick={this.chooseArg} /> 홀짝 : 각 회차의 홀짝비율<br />                                        
                    
                </Consoles>                    
                <Rounds>
            {this.filterCount(this.state.filtering)}
                </Rounds>
            </div>
        );
    }
}

export default Insight;

const Consoles = styled.form`
@media screen and (min-width: 480px) {
    display: block;
    width: 100%;
    position: absolute;
    left: 10%;
    top: 30%;
    margin-top: 0px;
}
    margin-top: 100px;
`

const Rounds = styled.ul`
@media screen and (min-width: 480px) {
    left: 10%;
    margin-top: 0px;
}
    display: block;
    width: 100%;
    position: absolute;    
    top: 55%;    
    margin-top: 150px;
`

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

const Total = styled.span`
    background-color: hsl(
    ${props => props.color},
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

const Sector4Num = styled.span`
    display: inline-block;
    width: 30px;
    height: 28px;
    text-align: center;
    background-color: ${props => props.tens ? "hsl(0, 100%, 80%);" :
        props.twenties ? "hsl(20, 100%, 80%);" :
        props.thirties ? "hsl(60, 100%, 80%);" :
        props.forties ? "hsl(120, 100%, 80%);" :
        props.rest ?"hsl(280, 100%, 80%);" : ""
}
    font-size: 25px;
    cursor: pointer;
    margin: 5px;
`