import React, { Component } from 'react';
import styled from 'styled-components'

import Ball from './component/ball'
import Tag from './component/nameTag'
import MixButton from './component/mixBtn'
import CheckBox from './component/checkBx'
import * as d3 from 'd3'
const history = require('./history.csv')
//import Refresh from './component/Refresh'
//import Num from './component/paper'

class App extends Component {
  constructor() {
    super();
    this.num45 = this.num45.bind(this);
    this.getNum = this.getNum.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.getNumsByHand = this.getNumsByHand.bind(this);
    this.markNum = this.markNum.bind(this);
    this.checkNum = this.checkNum.bind(this);
    this.getCsv = this.getCsv.bind(this);
    this.menuTurn = this.menuTurn.bind(this);
    this.checkOn = this.checkOn.bind(this);
    this.checkInBox = this.checkInBox.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.ran7 = this.ran7.bind(this);
  }

  state = {
    nums: [],
    paper: [],
    checker: [],
    histories: this.getCsv(),
    menuOn: false,
    itemBox: [],
    tierBox: [],
    tiersInItemBox: []
}

  getCsv() {
    let arr = [];
    d3.csv(history, (data) => {
      arr.push(Object.values(data))      
    });
    return arr;
  }
  num45() {
    let arr = []
    for (let i = 1; i < 46; i++) {
      arr.push(i )
    }
    this.setState({paper: arr});
  }
  componentDidMount() {    
    this.num45();
  }

  getNum() {    
    let yourNum = [];
    for (let j = 0; j < 7; j++) {
      let cut = Math.trunc((Math.random() * 45)+ 1);                  
      let findS = yourNum.find(num => num === cut);      
      if (typeof findS === 'undefined') {
        yourNum.push(cut);                  
      } else {
        j--
      }      
    }    
    return yourNum;
  }

  handleRefresh() {    
    let clicked = this.state.paper.filter(num => typeof num === "string")    
    if (this.state.nums.length < 5) {
      if (clicked.length !== 0) {
        let arr = [];            
        let tier = [];
        for (let i = 0; i < 7; i++) {
          let cut = Math.trunc((Math.random() * 45)+ 1);                  
          let findS = arr.find(num => num === cut);    
          if (typeof clicked[i] !== "undefined") {
            arr.push(clicked[i]);
          } else if(typeof findS === 'undefined') {
            arr.push(cut);
          } else {
            i--
          }
        }
        tier.push(1);
        let pushingCustom = this.state.nums.concat([arr]);
        let pushingTier = this.state.tierBox.concat([tier]);
        this.setState({
          nums: pushingCustom,
          tierBox: pushingTier
        });
        this.num45();
      } else  {
        let pushingRan = this.state.nums.concat([this.getNum()]);
        let tier = [1]
        let pushingTier = this.state.tierBox.concat([tier]);
        this.setState({
          nums: pushingRan,
          tierBox: pushingTier          
        })        
    }
    }
    //store.dispatch({type: GETNUM})
    //window.location.reload();
}

  getNumsByHand(e) {
    e.preventDefault();
    if (this.state.nums.length <=5) {
      let str = this.nums.value;
      let ary = str.match(/[^,]/g);
      let pushing = this.state.nums.concat([ary]);
      this.setState({nums: pushing});
    } else {}
  }

  ran7(e) {
    let arr = [];
    let ran = (num) => Math.trunc((Math.random() * num)+ 1);    
    let nums = this.state.nums;
    for (let i = 0; i < 7; i++) {
      let ranFive = ran(4);            
      if (typeof nums[ranFive] === "undefined") {
        i--
      } else {
        let tarArr = nums[ranFive];        
        let arrLen = ran(nums[ranFive].length - 1);
        let findS = arr.find(num => num === tarArr[arrLen])
        if (typeof tarArr[arrLen] === "undefined") {
          i--
        } else if (typeof findS === "undefined"){
          arr.push(tarArr[arrLen]);
          tarArr.splice(arrLen, 1);          
        } else {
          i--
        }        
      }      
    }
    let pushingRan = this.state.itemBox.concat([arr]);
    let avg = 0;
    for (let i = 0; i < this.state.tierBox.length; i++) {
      avg = avg + parseInt(this.state.tierBox[i], 10) + 1;
    }
    avg = avg/(this.state.tierBox.length);    
    let pushingTier = this.state.tiersInItemBox.concat(avg);
    this.setState({
      nums: [],
      tierBox: [],
      itemBox: pushingRan,
      tiersInItemBox: pushingTier
    })
  }

  markNum(e) {
    let tarArr = this.state.nums[e.target.id];    
    if (typeof tarArr !== "undefined") {      
      let getNums = this.state.paper;
      for (let i = 0; i < tarArr.length; i++) {
        getNums.splice([tarArr[i] - 1], 1, tarArr[i] + " " )
      }
      this.setState({paper: getNums});
    } else {};
  }

  checkNum(e) {        
    e.preventDefault();
    let num = parseInt(e.currentTarget.id, 10);    
    let arr = this.state.paper;
    let targetNum = arr[num - 1];          
    if(typeof targetNum !== "string") {
      arr.splice(num - 1, 1, num + " ");      
      this.setState({paper: arr});      
    } else {
      arr.splice(num - 1, 1, num);      
      this.setState({paper: arr});    
    }
  }
  
  menuTurn() {
    this.setState({menuOn: !this.state.menuOn})
  }

  checkOn(e) {
    let id = e.target.id;
    let nums = this.state.nums;
    let cut = nums.splice(id, 1);
    let itemBox = this.state.itemBox.concat(cut);
    let tierBox = this.state.tierBox;
    let cutTier = tierBox.splice(id, 1);
    let tiersInItemBox = this.state.tiersInItemBox.concat(cutTier);
    this.setState({
      nums: nums,
      itemBox: itemBox,
      tierBox: tierBox,
      tiersInItemBox: tiersInItemBox
    })
  }

  checkInBox(e) {
    if (this.state.nums.length < 5) {
      let id = e.target.id;
      let itemBox = this.state.itemBox;    
      let cut = itemBox.splice(id, 1);    
      let nums = this.state.nums.concat(cut);
      let tiersInItemBox = this.state.tiersInItemBox;
      let cutTier = tiersInItemBox.splice(id, 1);
      let tierBox = this.state.tierBox.concat(cutTier);
      this.setState({
        nums: nums,
        itemBox: itemBox,
        tierBox: tierBox,
        tiersInItemBox: tiersInItemBox
      })
    }
  } 

  deleteItem(e) {
    let id = e.target.id;
    let itemBox = this.state.itemBox;    
    itemBox.splice(id, 1);    
    let tiersInItemBox = this.state.tiersInItemBox;
    tiersInItemBox.splice(id, 1);
    this.setState({
      itemBox: itemBox,
      tiersInItemBox: tiersInItemBox
    });
  }

  render() {    
  return (
    <div>
    <Main>            
      <Paper>
      <Tag />
      {this.state.paper.map((mark, index) =>
        mark[mark.length - 1] === " " ? 
        <NumCheck onClick={this.checkNum} id={mark}>
          {mark > 9 ?
          mark :
          <span style={{padding: "0px 5.5px"}}>{mark}</span>}
        </NumCheck> :
        <Num onClick={this.checkNum} id={mark}>
        {mark > 9 ?
          mark :
          <span style={{padding: "0px 5.5px"}}>{mark}</span>}        
        </Num>
      )}
      <Button onClick={this.handleRefresh} >당첨번호 얻기</Button>
      </Paper>
      {      
      //<form onSubmit={this.getNumsByHand}>
      //<input type="text" name="putNums" ref={ref => {this.nums = ref}} />
      //<input type="submit" value="수동 입력" />
      //</form>
  }
      
      <Contain>
         {this.state.nums.map((arr, index) =>
         <div>
           <span style={{userSelect: "none;"}}>
           {this.state.tierBox[index]}
           </span>
          <Balls id={index} onClick={this.markNum}>
          {arr.map((eye, index) => <span>
          {index !== 0 && (index + 1)%7 === 0 ?
            <span>
              + <Ball key={index} num={eye} /> 
            </span>:
          <Ball key={index} num={eye} />
        }        
        </span>)}
        </Balls> 
        <input type="checkbox" id={index} onChange={this.checkOn}/>
        {index === 4 ? 
        <Mix type="submit" onClick={this.ran7} name="mix" value="이 중에서 랜덤 7개 뽑기" />
         : ""}
       </div>
         )}
      </Contain>            
    </Main>      


      {this.state.menuOn ?
      <Nav> 
      <MyBox onClick={this.menuTurn} On> 
      번호함
      </MyBox> 
      <Items>
        <ul>
          {this.state.itemBox.map((arr, index) => 
          <itemInBox>
            <li style={{listStyleType: "none"}}>      
            <TierNum>
            {this.state.tiersInItemBox[index] + " "}
            </TierNum>        
            <td style={{width: "160px"}}>
            {arr+" "}
            </td>
            <td style={{width: "50px"}}>
            <ItemInBox id={index} onChange={this.checkInBox} type="checkbox" value="itemInBox" />
            <Del onClick={this.deleteItem}>X</Del>            
            </td>
            </li>
          </itemInBox>)}
        </ul>
      </Items>
      </Nav>: 
      <MyBox onClick={this.menuTurn} Off> 
      번호함
      </MyBox>}
    </div>
  );
}}

export default App;

const Main = styled.div`
@media screen and (min-width: 480px) {
  position: relative;
  top: 100px;
  width: 1600px;
  margin: 0 auto;
}
  position: relative;
  width: 400px;
  margin: 0 auto;
`

const Button = styled.button`
color: red;
width: 150px;
display: inline-block;
bottom: 5px;
cursor: pointer;
`

const Paper = styled.div`
@media screen and (min-width: 480px) {
    height: 33rem;
    width: 17.5rem;
    display: inline-block;
    border: 2px solid red;
}
  margin: 0 auto;
  margin-left: 50px;
  margin-top: 50px;
  height: 33rem;
  width: 17.5rem;
  display: inline-block;
  border: 2px solid red;
`

const Contain = styled.div`
@media screen and (min-width: 480px) {
    width: 900px;
    height: 500px;    
    margin-left: 200px;
    position: absolute;
    display: inline-block;
}
  width: 100%;
  height: 300px;    
  margin-top: 50px;  
  margin-left: 50px;
  display: block;
`
const Balls = styled.div`
display: inline-block;
@media screen and (min-width: 480px) {
width: 855px;
height: 120px;
}
width: 270px;
height: 35px;
border: 2px solid background-color: hsl(204, 96%, 91%);
border-radius: 20px;
cursor: pointer;
background-color: hsl(204, 96%, 91%);

div {
  cursor: auto;
}
`

const Mix = styled.input`
    margin: auto;
    display: block
`

const Num = styled.span`
    display: inline-block;    
    font-size: 1.2rem;
    text-decoration: none;
    padding: 0.5rem 0.25rem 0.5rem 0.25rem;
    color: red;
    border-top-style: solid;
    border-bottom-style: solid;
    border-width: 2px 0px 2px 0px;
    margin: 10px 5px 10px 5px;
    cursor: pointer;    

    &:hover {
        background-color: hsl(60, 100%, 50%);
    }
`

const NumCheck = styled.span`
    display: inline-block;    
    font-size: 1.2rem;
    text-decoration: none;
    padding: 0.5rem 0.25rem 0.5rem 0.25rem;
    color: hsl(0, 100%, 100%);
    background-color: hsl(0, 100%, 0%);
    border-style: solid;
    border-width: 2px 0px 2px 0px;
    margin: 10px 5px 10px 5px;
    cursor: pointer;

    &:hover {
        background-color: hsl(0, 100%, 100%);
        color: red;
    }
`

const TierNum = styled.td`
  width: 20px;
  user-select: none;
`

const Items = styled.div`    
  border-style: solid;
  border-color: hsl(0, 0%, 93%);
  z-index: 1;
  @media screen and (min-width: 480px) {
    display: inline-block;    
    height: 100%;
    position: fixed;
    right: 0;
    width: 300px;
    top: 0px;
    border-width: 0 0 0 1px;
  }
`

const MyBox = styled.div`
  border-width: 1px 1px 1px 1px;
  z-index: 2;
  display: inline-block;  
  border-style: solid;
  border-color: hsl(0, 0%, 93%) hsl(0, 0%, 100%) hsl(0, 0%, 93%) hsl(0, 0%, 93%);
  background-color: white;
  cursor: pointer;

@media screen and (min-width: 480px) {
  writing-mode: vertical-rl;
  text-orientation: upright;
  padding-top: 10px;
  padding-right: 10px;
  position: absolute;    
  width: 30px;
  height: 120px;  
  top: 50%;
  ${props => props.Off ? 
    "right: 0px;" : 
    props.On ?
    "right: 300px;" :
    "right: 0px;"
    }  
}
  position: sticky;
  text-align: center;  
  width: 100%;
  height: 30px;  
    ${props => props.Off ? 
    "bottom: 0px;" : 
    props.On ?
    "bottom: 300px;" :
    "bottom: 0px;"
    }  
`
const Nav = styled.div`
`

const Del = styled.span`
width: 13px;
height: 13px;
margin-left: 10px;
font-size: 13px;
text-align: center;
display: inline-block;
border: 1px solid red;
color: red;
cursor: pointer;
user-select: none;
`

const ItemInBox = styled.input`

`