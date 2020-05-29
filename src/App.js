import React, { Component } from 'react';
import styled from 'styled-components'

import Ball from './component/ball'
import Tag from './component/nameTag'
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
  }

  state = {
    nums: [],
    paper: [],
    checker: [],
    histories: this.getCsv(),
    menuOn: false,
    itemBox: []
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
    let arr = []
    let yourNum = []
    for (let i = 1; i < 46; i++) {
      //arr.push(i)
    }
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
    //let ran2 = Math.trunc((Math.random() * 45)+ 1);
    //let ran3 = Math.trunc((Math.random() * 45)+ 1);
    //let ran4 = Math.trunc((Math.random() * 45)+ 1);
    //let ran5 = Math.trunc((Math.random() * 45)+ 1);
    //let ran6 = Math.trunc((Math.random() * 45)+ 1);
    //let ran7 = Math.trunc((Math.random() * 45)+ 1);
    //let pushing = this.state.nums.concat(ran + " " + ran2 + " " + ran3 + " " + ran4 + " " + ran5 + " " + ran6 + " " + ran7 + " ");
    //this.setState({nums: pushing})
  }

  handleRefresh() {    
    let clicked = this.state.paper.filter(num => typeof num === "string")    
    console.log(clicked)
    console.log(this.state.paper)
    if (clicked.length !== 0) {
      let arr = [];            
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
      let pushingCustom = this.state.nums.concat([arr])
      this.setState({nums: pushingCustom})
      this.num45();
    } else {
      let pushingRan = this.state.nums.concat([this.getNum()]);
      this.setState({nums: pushingRan})        
    }
    console.log(this.state.nums)
    //store.dispatch({type: GETNUM})
    //window.location.reload();
}

  getNumsByHand(e) {
    e.preventDefault();
    let str = this.nums.value;
    let ary = str.match(/[^,]/g);
    let pushing = this.state.nums.concat([ary]);
    this.setState({nums: pushing});
    console.log(this.state.nums);    
  }

  markNum(e) {
    console.log(this.state.nums[e.target.id])    
    let tarArr = this.state.nums[e.target.id];    
    let arr = [];
    for (let i = 1; i <= 45; i++) {
      arr.push(i);
    }
    if (typeof tarArr !== "undefined") {      
      let getNums = this.state.paper;
      for (let i = 0; i < tarArr.length; i++) {
        getNums.splice([tarArr[i] - 1], 1, tarArr[i] + " " )
      }
      this.setState({paper: getNums});
      console.log(this.state.paper)
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
    let itemBox = this.state.itemBox.concat([cut]);
    console.log(cut)
    this.setState({
      nums: nums,
      itemBox: itemBox
    })
  }

  checkInBox(e) {
    let id = e.target.id;
    let itemBox = this.state.itemBox;    
    let cut = itemBox.splice(id, 1);    
    let nums = this.state.nums.concat([cut]);
    console.log(cut)
    this.setState({
      nums: nums,
      itemBox: itemBox
    })
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
       </div>
         )}
      </Contain>            
    </Main>      
      {this.state.menuOn ?
      <Nav> 
      <MyBox onClick={this.menuTurn} On> 
      Numbers
      </MyBox> 
      <Items>
        <ul>
          {this.state.itemBox.map((arr, index) => 
          <itemInBox>
            {arr.map(num => 
            <span>
              {num + " "}
            <input id={index} onChange={this.checkInBox} type="checkbox" value="itemInBox" />
            </span>
            )}
          </itemInBox>)}
        </ul>
      </Items>
      </Nav>: 
      <MyBox onClick={this.menuTurn} Off> 
      Numbers
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
  width: 420px;
  height: 500px;    
  margin-top: 50px;  
  margin-left: 50px;
  display: inline-block;
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
const Items = styled.div`
  height: 100%;
  display: inline-block;
  position: fixed;
  right: 0;
  width: 300px;
  top: 0px;
  border-width: 0 0 0 1px;
  border-style: solid;
  border-color: hsl(0, 0%, 93%);
  z-index: -1;
`

const MyBox = styled.div`
  writing-mode: vertical-rl;
  text-orientation: upright;
  div {
  writing-mode: none;
  text-orientation: none;
  }
  display: inline-block;
  position: absolute;    
  padding-top: 10px;
  padding-right: 10px;
  width: 30px;
  height: 120px;
  border-width: 1px 1px 1px 1px;
  border-style: solid;
  border-color: hsl(0, 0%, 93%) hsl(0, 0%, 100%) hsl(0, 0%, 93%) hsl(0, 0%, 93%);
  top: 50%;
  ${props => props.Off ? 
  "right: 0px;" : 
  props.On ?
  "right: 300px;" :
  "right: 0px;"
  }  
`
const Nav = styled.div`
`

const itemInBox = styled.li`
  list-style-type: none;
`