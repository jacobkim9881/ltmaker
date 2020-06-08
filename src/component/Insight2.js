import React, { Component } from 'react';
import styled from 'styled-components'

import db from '../text.json'

class Insight extends Component {
    constructor() {
        super();
        this.showNum = this.showNum.bind(this);
        this.givingNumber = this.givingNumber.bind(this);
    }

    state = {
        clicked: true,
        clickedNum: []
    }

    showNum(e) {        
        let arr = this.state.clickedNum
        let inx = this.state.clickedNum.indexOf(parseInt(e.target.id, 10));        
        console.log(arr)
        console.log(inx)
        if (inx !== -1) {
            arr.splice(inx, 1);
            console.log(arr)
            this.setState({ clickedNum: arr})
            console.log(this.state.clickedNum)
        } else {
            this.setState({
                clicked: !this.state.clicked,
                clickedNum: this.state.clickedNum.concat(parseInt(e.target.id, 10))
            })
        }        
    }

    givingNumber(data) {
        return this.state.clickedNum.indexOf(parseInt(data, 10)) !== -1 ?
        <Num onClick={this.showNum} id={data}>{data}</Num> :
        <HideNum onClick={this.showNum} id={data}>{data}</HideNum>
    }


    render() {
        return (
            <div>
                <ul>
                    {db.map(data => <Nums>d
                    </Nums>)}
                </ul>
            </div>
        );
    }
}

export default Insight;

const Nums = styled.li`
    list-style-type: none;
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