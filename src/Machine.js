import React, { Component } from 'react';
import styled from 'styled-components'

import Ball from './component/ball'
import Tag from './component/nameTag'
import MixButton from './component/mixBtn'
import CheckBox from './component/checkBx'

import Insight from './component/Insight'

//import Refresh from './component/Refresh'
//import Num from './component/paper'

class Machine extends Component {
  constructor() {
    super();
    this.num45 = this.num45.bind(this);
    this.getNum = this.getNum.bind(this);
    this.getOneOfNums = this.getOneOfNums.bind(this);
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
    this.changeCheckType = this.changeCheckType.bind(this);
    this.findCheckType = this.findCheckType.bind(this);
    this.addOfNums = this.addOfNums.bind(this);    
    this.setOfNumsType = this.setOfNumsType.bind(this);
    this.addChancesOfNums = this.addChancesOfNums.bind(this);
    this.ofNumsSelector = this.ofNumsSelector.bind(this);
    this.totalClicked = this.totalClicked.bind(this);
  }

  state = {
    nums: [],
    paper: [],
    checkerType: 'deflt',
    curOfNumsType: '',
    ofNumsType: ['sOne', 1, 'sTwo', 0, 'sThree', 0, 'sFour', 0, 'sFive', 0, 'sSix', 0],
    rememberCheck: true,
    histories: this.getCsv(),
    menuOn: false,
    itemBox: [],
    tierBox: [],
    tiersInItemBox: []
}

  getCsv() {
  }
  num45() {
    if (!this.state.rememberCheck) {
      let arr = []
      for (let i = 1; i < 46; i++) {
        arr.push(i )
      }
      this.setState({paper: arr});
    }
  }

  componentDidMount() {    
  let arr = []
  for (let i = 1; i < 46; i++) {
    arr.push(i )
  }
  this.setState({paper: arr});    
  }

  getNum() {    
    let paper = this.state.paper;
    let yourNum = [];
    let nums = paper.filter(num => num.toString(10).indexOf("x") === -1);
    for (let j = 0; j < 7; j++) {
      let cut = nums[Math.trunc(Math.random() * nums.length)].toString().match(/\d+/)[0];                  
      let findS = yourNum.find(num => num === cut);                  
      if (typeof findS === 'undefined') {        
        yourNum.push(cut);               
     } else {
        j--;
      }      
    }    
    return yourNum;
  }

  getOneOfNums(char, nums) {
    let paper = this.state.paper;
    let ofNums = paper.filter(num => num.toString(10).match(char) !== null);
    let numsArr = [];    
    if (ofNums.length > 0) {
      for (let i = 0; i < nums; i++) {        
        let ran = Math.trunc(Math.random() * ofNums.length);
        if (typeof ofNums[ran] !== 'undefined' && numsArr.indexOf(ofNums[ran]) !== -1) {
          i --;
        } else {
          numsArr.push(ofNums[ran]);
          ofNums.splice(ran, 1)          
        }        
      }
      return [numsArr, ofNums];
    } else {
      return
    }
  }

  handleRefresh() {    
    let paper = this.state.paper
    let clicked = paper.filter(num => num.toString(10).indexOf(" ") !== -1);    
    let nums = paper.filter(num => num.toString(10).indexOf("x") === -1);
    let ofNums = this.state.ofNumsType.filter((data, idx) => typeof data === 'string' && 
    this.state.ofNumsType[idx + 1] > 0).map(data => 
      this.getOneOfNums(data, 
        this.state.ofNumsType[this.state.ofNumsType.indexOf(data) + 1]));    
    
    let poped = [];
    
    for (let i = 0; i < ofNums.length; i++) {      
      if (typeof ofNums[i] !== 'undefined') {
        clicked = clicked.concat(ofNums[i][0]);
        poped.push.apply(poped, ofNums[i][0]);
        poped.push.apply(poped, ofNums[i][1]);  
      }
    }

    for (let i = 0; i < poped.length; i++) {
      nums.splice(nums.indexOf(poped[i]), 1);
    }

    if (this.state.nums.length < 5) {
      if (clicked.length !== 0) {
        let arr = [];            
        let tier = [];
        for (let i = 0; i < 7; i++) {
          let cut = nums[Math.trunc(Math.random() * nums.length)].toString().match(/\d+/)[0];                  
          let findS = arr.find(num => parseInt(num, 10) === parseInt(cut, 10));                                            
          if (typeof clicked[i] !== "undefined") {
            arr.push(parseInt(clicked[i], 10));
          } else if(typeof findS === 'undefined') {                        
            arr.push(parseInt(cut, 10));            
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
        });
        this.num45();                
    }
    }
    //store.dispatch({type: GETNUM})
    //window.location.reload();
}

totalClicked() {
  let ofNumsType = this.state.ofNumsType;
  let paper = this.state.paper
  let clicked = paper.filter(num => num.toString(10).indexOf(" ") !== -1);
  let chances = ofNumsType.filter(data => typeof data === 'number');    
  let totalNums = chances.reduce((a, b) => a + b) + clicked.length;
  return totalNums;
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

  findCheckType(arr, num, type) {
    let idx = arr[num - 1].toString(10).indexOf(type)      
      if (idx === -1) {
        arr.splice(num - 1, 1, num + type);      
        this.setState({paper: arr});      
      } else {
        arr.splice(num - 1, 1, arr[num - 1].toString(10).replace(type, ''))
        this.setState({paper: arr});      
      }      
  }

  checkNum(e) {        
    let num = parseInt(e.currentTarget.id, 10);    
    let arr = this.state.paper;
    if (this.state.checkerType === 'deflt') {
      this.findCheckType(arr, num, ' ')
    } else if (this.state.checkerType === 'pencil') {      
      this.findCheckType(arr, num, 'c')
    } else if (this.state.checkerType === 'without') {
      this.findCheckType(arr, num, 'x')
    } else if (this.state.checkerType === 'ofNums') {            
      this.findCheckType(arr, num, this.state.curOfNumsType)
    }
    //if(typeof targetNum.match(/\s/) !== "null") {
    //  arr.splice(num - 1, 1, num + " ");      
    //  this.setState({paper: arr});      
    //} else {
    //  arr.splice(num - 1, 1, num);      
    //  this.setState({paper: arr});    
    //}
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

  changeCheckType(e) {
    this.setState({checkerType: e.target.id})     
    if (e.target.id === 'ofNums') {
      this.setState({curOfNumsType: 'sOne'});
    }
  }

  setOfNumsType(e) {
    console.log(e.target.id)
    this.setState({curOfNumsType: e.target.id});
  }

  addChancesOfNums(e) {
    let ofNumsType = this.state.ofNumsType;
    let index = ofNumsType.indexOf(e.target.id);

    let selected = this.state.paper.filter(data => data.toString().indexOf(e.target.id) !== - 1);

    if (e.target.value === '-') {
      if (ofNumsType[index + 1] === 0) {
        
      } else {
        ofNumsType.splice(index + 1, 1, ofNumsType[index + 1] - 1)
        this.setState({ofNumsType: ofNumsType});
      }      
    } else if (e.target.value === '+' && this.totalClicked() < 7
    && ofNumsType[index + 1] < selected.length) {      
      ofNumsType.splice(index + 1, 1, ofNumsType[index + 1] + 1)
      this.setState({ofNumsType: ofNumsType});
    }
    
  }

  addOfNums(e) {    
    let idx = this.state.ofNumsType.indexOf(0);    
    let ofNumsType = this.state.ofNumsType;
    let typeName = ofNumsType[idx - 1];
    if (idx !== -1) {
      ofNumsType.splice(idx, 1, ofNumsType[idx] + 1);
    }
    if (this.totalClicked() < 6) {
      this.setState({ofNumsType: ofNumsType });        
    } else {
      window.alert('나올 숫자가 6개가 되었습니다.' + '\n' + '더 추가하려면 고정수나 선택수를 줄이세요' );
      return;
    }       
  }

  ofNumsSelector(name) {
    let selected = this.state.paper.filter(data => data.toString().indexOf(name) !== - 1);
    return <div>
    <input type="radio" id={name} defaultChecked={false} name="ofNumsType" onClick={this.setOfNumsType}/>
    구간 선택하기: 번호 ({selected.map(data => data.match(/\d+/)[0]) + " "}) 중 
<input type='button' id={name} value="-" onClick={this.addChancesOfNums} /> {this.state.ofNumsType[this.state.ofNumsType.indexOf(name) + 1]}개 선택하기
    <input type='button' id={name} value="+" onClick={this.addChancesOfNums} /><br/>
    </div>
  }

  putNums(mark, type) {      
    switch(type) {
      case " ":
      return <Num checked onClick={this.checkNum} id={mark}>
      {mark.toString().match(/\d+/)[0]}
      </Num>;
      case "c":
      return <Num pencil onClick={this.checkNum} id={mark}>
      {mark.toString().match(/\d+/)[0]}
      </Num>;
      case "x":
      return <Num onClick={this.checkNum} id={mark}>
      <span style={{
        textDecoration: "line-through",
        textDecorationColor: "black"
    }}>{mark.toString().match(/\d+/)[0]}</span>
      </Num>;   
      case "sOne":
        return <Num sone onClick={this.checkNum} id={mark}>
        {mark.toString().match(/\d+/)[0]}
        </Num>;
      case "sTwo":
        return <Num stwo onClick={this.checkNum} id={mark}>
        {mark.toString().match(/\d+/)[0]}
        </Num>;
      case "sThree":
        return <Num sthree onClick={this.checkNum} id={mark}>
        {mark.toString().match(/\d+/)[0]}
        </Num>;
      case "sFour":
        return <Num sfour onClick={this.checkNum} id={mark}>
        {mark.toString().match(/\d+/)[0]}
        </Num>;
      case "sFive":
        return <Num sfive onClick={this.checkNum} id={mark}>
        {mark.toString().match(/\d+/)[0]}
        </Num>;
      case "sSix":
        return <Num ssix onClick={this.checkNum} id={mark}>
        {mark.toString().match(/\d+/)[0]}
        </Num>;          
      default :
      return <Num onClick={this.checkNum} id={mark}>
      {mark.toString().match(/\d+/)[0]}
      </Num>   
    }
  }

  render() {        
  return (
    <div>
    <Main>            
      <Explain>이 페이지는 추첨 번호를 랜덤하게 받거나 원하는 번호와 랜덤한 번호를 섞어 반자동 번호 출력을 시뮬레이션할 수 있는 공간입니다.</Explain>
      <Pencils>        
        <input type="radio" id="deflt" name="checker" onChange={this.changeCheckType} /> 고정수 추가 <br />
        <input type="radio" id="pencil" name="checker" onChange={this.changeCheckType} /> 연필 <br />
        <input type="radio" id="without" name="checker" onChange={this.changeCheckType} /> 제외 수 추가<br />        
        <input type="radio" id="ofNums" name="checker" onChange={this.changeCheckType} /> 구간 추첨 하기<br />        
        {this.state.checkerType === 'ofNums' ? <div>

      {this.state.ofNumsType.filter((type, idx) => typeof type === 'string').map(data => 
        this.state.ofNumsType[this.state.ofNumsType.indexOf(data) + 1] !== 0 ?
        this.ofNumsSelector(data): "")}
        
          <input type="button"value="추가하기" onClick={this.addOfNums}/>
          </div> : ""}
        
        <input type="checkbox" 
        name="rememberCheck" 
        defaultChecked={true}
        onChange={() => this.setState({rememberCheck: !this.state.rememberCheck})} />
         체크한 번호 고정하기
      </Pencils>
      <Paper>        
      <Tag />
      {this.state.paper.map((mark, index) =>
        mark.toString().indexOf(" ") !== -1 ? 
        this.putNums(mark, " ") : mark.toString().indexOf("c") !== -1 ? 
        this.putNums(mark, "c") : mark.toString().indexOf("x") !== -1 ? 
        this.putNums(mark, "x") : mark.toString().indexOf("sOne") !== -1 ? 
        this.putNums(mark, "sOne") : mark.toString().indexOf("sTwo") !== -1 ? 
        this.putNums(mark, "sTwo") : mark.toString().indexOf("sThree") !== -1 ? 
        this.putNums(mark, "sThree") : mark.toString().indexOf("sFour") !== -1 ? 
        this.putNums(mark, "sFour") : mark.toString().indexOf("sFive") !== -1 ? 
        this.putNums(mark, "sFive") : mark.toString().indexOf("sSix") !== -1 ? 
        this.putNums(mark, "sSix") :
        this.putNums(mark)        
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
        <input type="checkbox" name={index} id={index} onChange={this.checkOn}/>
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
          <div>
            <li style={{listStyleType: "none"}}>      
            <TierNum>
            {this.state.tiersInItemBox[index] + " "}
            </TierNum>        
            <td style={{width: "160px"}}>
            {arr+" "}
            </td>
            <td style={{width: "50px"}}>
            <ItemInBox id={index} onChange={this.checkInBox} type="checkbox" value="itemInBox" />
            <Del id={index} onClick={this.deleteItem}>X</Del>            
            </td>
            </li>
          </div>)}
        </ul>
      </Items>
      </Nav>: 
      <MyBox onClick={this.menuTurn} Off> 
      번호함
      </MyBox>}
    </div>
  );
}}

export default Machine;

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

const Explain = styled.p`
@media screen and (min-width: 480px) {  
  padding-left: 50px;
  margin-top: 0px;
}
  padding-left: 50px;
  margin-top: 120px;
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
    width: 21px;
    display: inline-block;    
    font-size: 1.2rem;
    text-align: center;
    text-decoration: none;
    padding: 0.5rem 0.25rem 0.5rem 0.25rem;
    color: ${props => props.checked ? "hsl(0, 100%, 100%);" : props.pencil ? "black;" : "red;"}
    background-color: ${props => props.checked ? "hsl(0, 100%, 0%);" :
    props.pencil ? "grey;" : 
    props.sone ? "hsl(30, 100%, 50%);" :
    props.stwo ? "hsl(50, 100%, 50%);" :
    props.sthree ? "hsl(90, 100%, 50%);" :
    props.sfour ? "hsl(170, 100%, 50%);" :
    props.sfive ? "hsl(210, 100%, 50%);" :
    props.ssix ? "hsl(300, 100%, 50%);" :";"}
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
    width: 21px;
    display: inline-block;    
    font-size: 1.2rem;
    text-align: center;
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
  text-orientation: upright;
  padding-top: 20px;
  padding-right: 10px;
  position: absolute;    
  width: 30px;
  height: 80px;  
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

const Pencils = styled.form`
    padding-left: 50px;
`

const Pencil = styled.input`

`