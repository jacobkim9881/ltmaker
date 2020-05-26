import React, { Component } from 'react';
import styled from 'styled-components'

import Ball from './component/ball'
import Refresh from './component/Refresh'
import Num from './component/paper'

class App extends Component {
  constructor() {
    super();
    this.getNum = this.getNum.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.getNumsByHand = this.getNumsByHand.bind(this);
    this.markNum = this.markNum.bind(this);
  }

  state = {
    nums: [],
    test: [],
    checker: []
}
  componentDidMount() {
    let arr = []
    for (let i = 1; i < 46; i++) {
      arr.push(i)
    }
    this.setState({test: arr});
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
    let pushing = this.state.nums.concat([this.getNum()]);
    this.setState({nums: pushing})    
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
    if (typeof tarArr !== "undefined") {
      let getNums = this.state.test;
      for (let i = 0; i < tarArr.length; i++) {
        getNums.splice([tarArr[i] - 1], 1, tarArr[i] + " " )
      }
      this.setState({test: getNums});
    } else {};
  }

  render() {    
  return (
    <Main>      
      {this.state.checker}      
      <Paper>
      {this.state.test.map((mark, index) =>
      <Num num={mark} /> 
      )}
      </Paper>
      {      
      //<form onSubmit={this.getNumsByHand}>
      //<input type="text" name="putNums" ref={ref => {this.nums = ref}} />
      //<input type="submit" value="수동 입력" />
      //</form>
  }
      <Button type="submit" onClick={this.handleRefresh} value="당첨번호 얻기" />
      <Contain>
         {this.state.nums.map((arr, index) =>
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
         )}
      </Contain>
    </Main>
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

const Button = styled.input`
width: 150px;
display: inline-block;
position: absolute;
`

const Paper = styled.div`
    height: 20rem;
    width: 18rem;
    display: inline-block;
`

const Contain = styled.div`
    width: 900px;
    height: 500px;    
    margin-left: 300px;
    position: absolute;
    display: inline-block;
`
const Balls = styled.div`
width: 860px;
height: 120px;
border: 2px solid background-color: hsl(204, 96%, 91%);
border-radius: 20px;
cursor: pointer;
background-color: hsl(204, 96%, 91%);

div {
  cursor: auto;
}
`