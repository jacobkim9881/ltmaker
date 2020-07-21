import React, { Component } from 'react';
import styled from 'styled-components';

import db from '../text.json'

class Graph2 extends Component {

    constructor(props) {
        super(props);
        this.setRound = this.setRound.bind(this);
        this.test = this.test.bind(this);
        this.checkingSudoku = this.checkingSudoku.bind(this);
    }

    state = {
        numArr : [],
        roundTo : 100,
        sudoku: [],
        test : 'this is test'
    }


    componentDidMount() {
        let sudoku = this.state.sudoku;        

        function sqVal (x, y, tarX, tarY) {
            let sqArr = [];                    
            for (let i = x[0]; i < x[2]; i++) {
                for (let j = y[0]; j < y[2]; j++) {
                    if (i === tarX && j === tarY) {}
                    else if (typeof sudoku[i] !== 'undefined') sqArr.push(sudoku[i][j]);
            }   }
            return sqArr;
        }

        function getSq(i) {
            let num = [];
            if (i % 3 === 0) num = [i, i + 1, i + 2];
            else if (i % 3 === 1) num = [i - 1, i, i + 1];
            else num = [i - 2, i - 1, i];
            return num;                    
        }

        function getPosiVal(i, j) {
                let arrY = [];
                
                let y = getSq(i);
                let x = getSq(j);                
                
                for (let k = 0; k < i; k++) {
                    if (i !== 0 && typeof arr[k] !== 'undefined') {
                        arrY.push(arr[k][j]);
                    }                    
                }
                let arrX = [];
                arrX = (i !== 0 || j !== 0) ? sudoku[i] : [];                
                let posVal = [];
                if (typeof arrX !== 'undefined' && arrX.length > 0) {
                    return posVal = [...arrY, ...arrX, ...sqVal(x, y, j, i) ];
                }                        
        }


        function changeVal (x, y) {
        for (let l = 1; l <= 9; l++) {
            if (getPosiVal(x, y).indexOf(l) === - 1) getNum.push(l);
            else if (l === 9 && getNum.length === 0) {
                
            }
        }
        }


        let getNum = [];
        let arr = [];

        for (let m = 0; m <= 0; m++) {
            let ran = Math.trunc(Math.random() * 9 + 1);                
            let samOnRan = arr.indexOf(ran);   
            if (sudoku.length === 1 && samOnRan === - 1) {
                arr.push(ran);
            } else if (sudoku.length === 1 && samOnRan !== - 1) {
                m --                    
            }
        }

        this.setState({ sudoku : sudoku})
        console.log(sudoku)
    }

    checkingSudoku(tarArrNum, target) {
        let sudoku = this.state.sudoku;

        let arr = [];
        for (let i = 0; i < 9; i++) {
            arr.push(sudoku[0][i]);
        }

        let same = arr.findIndex(data => data === target);

        if (same !== - 1) {

        }
    }


    test(e) {

        let x = e.clientX;
        let y = e.clientY;

        //this.setState({test : `you clicked in the arc : ${ctx.isPointInPath(x, y)}`});

        console.log(x, y)

    }

    setRound(e) {
        this.setState({roundTo: this.round.current.value})        
        console.log(this.state.numArr)
        console.log(this.state.roundTo)
    }

    render() {
        return (
            <Round>                
                <table>
                    {this.state.sudoku.map(arr => <tr>
                        {arr.map(data => <td>
                            {data}
                        </td>)}
                    </tr>)}
                </table>
            </Round>
        );
    }
}

export default Graph2;

const Round = styled.div`
    margin-top: 5%;
`

const StyledCanvas = styled.canvas`
    display: block;
`