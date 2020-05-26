import React, { Component } from 'react';
import styled from 'styled-components'


class ball extends Component {
constructor(props) {
    super(props);
}

render() {
    return (        
        this.props.num >= 40 ?        
        <BallG>
            <Num>
             {this.props.num}
            </Num>            
        </BallG> :
        this.props.num >= 30 ?
        <BallGy>
            <Num>
             {this.props.num}
            </Num>            
        </BallGy> :
        this.props.num >= 20 ?
        <BallR>
        <Num>
         {this.props.num}
        </Num>            
        </BallR> :
        this.props.num >= 10 ?
        <BallB>
        <Num>
         {this.props.num}
        </Num>            
        </BallB> :
        <BallO>
        <Num>
         {this.props.num}
        </Num>            
        </BallO>
    )
}
}
export default ball;
        

// Random color: hsl(${() => Math.trunc(Math.random()* 361)}, 100%, 50%);

const BallO = styled.div`
    width: 100px;
    height: 100px;
    background-color: hsl(47, 100%, 49%);
    border-radius: 50%;
    display: inline-block;
    margin: 10px;
`
const BallB = styled.div`
    width: 100px;
    height: 100px;
    background-color: hsl(198, 84%, 67%);
    border-radius: 50%;
    display: inline-block;
    margin: 10px;
`
const BallR = styled.div`
    width: 100px;
    height: 100px;
    background-color: hsl(1, 92%, 71%);
    border-radius: 50%;
    display: inline-block;
    margin: 10px;
`
const BallG = styled.div`
    width: 100px;
    height: 100px;
    background-color: hsl(75, 66%, 55%);
    border-radius: 50%;
    display: inline-block;
    margin: 10px;
`
const BallGy = styled.div`
    width: 100px;
    height: 100px;
    background-color: hsl(0, 0%, 67%);
    border-radius: 50%;
    display: inline-block;
    margin: 10px;
`
const Num = styled.p`
font-size: 32px;
font-weight: bold;
color: white;
padding: 0px;
text-align: center;
`