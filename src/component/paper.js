import React, { Component } from 'react';
import styled from 'styled-components'

class paper extends Component {
constructor(props) {
    super(props);
    this.checkNum = this.checkNum.bind(this);
    this.checkIfMarked = this.checkIfMarked.bind(this);
}

state = {
    chkArr: this.props.num
}

checkIfMarked(num) {
    if (num[num.length - 1] === " ") {
        return num.match(/\d+/g)[0];
    } else {
        return num + " "
    }
}

checkNum(e) {        
    e.preventDefault();
    let arr = []            
    this.setState({
        chkArr: this.checkIfMarked(this.state.chkArr)
    })
    console.log(this.checkIfMarked(this.props.num))    
  }

    render() {
        return (                
            this.state.chkArr[this.state.chkArr.length - 1] === " " ?
            <NumCheck onClick={this.checkNum} id={this.props.num}>
            {this.props.num > 9 ?                
            this.state.chkArr :
            <span style={{padding: "0px 5.5px"}}>{this.state.chkArr}
            </span> 
        }
            </NumCheck> : 
            <Num onClick={this.checkNum} id={this.props.num}>
                {this.props.num > 9 ?                
                this.state.chkArr :
                <span style={{padding: "0px 5.5px"}}>{this.state.chkArr}                
                </span> 
            }
                </Num>
        );
    }
}

export default paper;

const Paper = styled.div`
    height: 14rem;
    width: 5rem;
`
const Num = styled.span`
    display: inline-block;    
    font-size: 1.2rem;
    text-decoration: none;
    padding: 0.5rem 0.25rem 0.5rem 0.25rem;
    color: red;
    border-style: solid;
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