import React, { Component } from 'react';
import styled from 'styled-components';

import db from '../text.json'

class Graph extends Component {

    constructor(props) {
        super(props);
        this.state.drawRoundGraph = this.drawRoundGraph.bind(this);
        this.setRound = this.setRound.bind(this);
    }

    state = {
        numArr : [],
        roundTo : 100
    }


    componentDidMount() {
        let numArr = this.state.numArr
        for (let i = 0; i < 45; i++) {
            numArr.push(0);
        }

        let firstRound = parseInt(db[0].round, 10) - this.state.roundTo;        

        let firstDB = db.filter(data => parseInt(data.round, 10) > firstRound );

        firstDB.map(data => numArr.splice(parseInt(data.fst, 10) - 1, 1, numArr[parseInt(data.fst, 10) - 1] + 1));
        firstDB.map(data => numArr.splice(parseInt(data.snd, 10) - 1, 1, numArr[parseInt(data.snd, 10) - 1] + 1));
        firstDB.map(data => numArr.splice(parseInt(data.trd, 10) - 1, 1, numArr[parseInt(data.trd, 10) - 1] + 1));
        firstDB.map(data => numArr.splice(parseInt(data.foth, 10) - 1, 1, numArr[parseInt(data.foth, 10) - 1] + 1));
        firstDB.map(data => numArr.splice(parseInt(data.fvth, 10) - 1, 1, numArr[parseInt(data.fvth, 10) - 1] + 1));
        firstDB.map(data => numArr.splice(parseInt(data.sth, 10) - 1, 1, numArr[parseInt(data.sth, 10) - 1] + 1));
        firstDB.map(data => numArr.splice(parseInt(data.bonus, 10) - 1, 1, numArr[parseInt(data.bonus, 10) - 1] + 1));

        this.setState({numArr : numArr})

        console.log(numArr)
        

        this.drawRoundGraph();
    }

    drawRoundGraph() {        
        let numArr = this.state.numArr;

        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');        

        function drawGraph(startNum, finNum, radius) {            
            ctx.beginPath();

            let x = 300;
            let y = 300;             
            let TotalNum = 45;
            let pieOfNum = finNum / TotalNum;
            let targetArr = numArr.filter( (data, idx) => idx < finNum - 1 && idx >= startNum - 1 );
            let maxNum = 0 

            let num = 0;
            if(targetArr.length > 0) {
                num = targetArr.reduce((a, b) => a + b);                    
                maxNum = numArr.reduce((a, b) => a + b)/2;            
            }            
                    
            if (startNum === 1) {
                if (finNum - startNum === 1) {
                    ctx.arc(x, y, radius, (2 * ((startNum - 1)/TotalNum)) * Math.PI, (2 * ((startNum - 0.5)/TotalNum)) * Math.PI);                        
                } else {
                    ctx.arc(x, y, radius, (2 * ((startNum - 1)/TotalNum)) * Math.PI, (2 * (finNum - startNum + 0.5)/TotalNum) * Math.PI);                            
                }                
            } else if (finNum - startNum === 1) {
                ctx.arc(x, y, radius, (2 * (0/TotalNum)) * Math.PI, (2 * (0.5/TotalNum)) * Math.PI);                        
            } else {
                ctx.arc(x, y, radius, (2 * (0/TotalNum)) * Math.PI, (2 * ((finNum - startNum + 0.5)/TotalNum)) * Math.PI);                        
            }            

            if(num > 0) {
                ctx.lineWidth = (num/maxNum) * 200;            
                ctx.strokeStyle = `hsl(${(70 - (70 * num/maxNum))}, 100%, 50%)`;            
            } else {
                ctx.lineWidth = 1 * 10;            
                ctx.strokeStyle = `hsl(${8 * num}, 0%, 50%)`;            
            }
            ctx.stroke();
            ctx.font = "20px Arial";            

            if (finNum - startNum === 1) {
                ctx.fillText(`${startNum}`, x + radius + 20, y + 14);           
            } else {
                ctx.fillText(`${startNum} - ${finNum}`, x + radius - 20, y + 20);                
            }            

            if (startNum === 1) {
                if (finNum - startNum === 1) {
                ctx.translate(x, y)
                ctx.rotate( 1 * 8 * Math.PI / 180)
                ctx.translate(- x, - y)
                }
            } else if (finNum - startNum === 1) {
                ctx.translate(x, y)
                ctx.rotate( 1 * 8 * Math.PI / 180)
                ctx.translate(- x, - y)
            } else {

            }   

        }

        function draw5(firstNum, half) {
            drawGraph(firstNum, half, 150);
            for (let i = firstNum; i <= half; i++) {
                drawGraph(i, i + 1, 50 * 4);
            }
        }

        function draw10(firstNum, finNum) {
            let radius = 50;
            let radius3 = 50 * 3;
            let half = finNum / 2
            drawGraph(firstNum, finNum, radius);                
            draw5(firstNum, finNum - 5);
            draw5(firstNum + 5, finNum);
        }

        for (let i = 1; i <= 5; i++) {
            if (i < 5) {
                draw10((i * 10) - 9, i * 10);        
            } else {
                drawGraph(41, 45, 50);
                draw5(41, 45);
            }
        }

    }

    setRound(e) {
        this.setState({roundTo: this.round.current.value})        
        console.log(this.state.numArr)
        console.log(this.state.roundTo)
    }

    render() {
        return (
            <Round>
                <canvas ref="canvas" width={1000} height={1000} />
            </Round>
        );
    }
}

export default Graph;

const Round = styled.div`
    margin-top: 5%;
`