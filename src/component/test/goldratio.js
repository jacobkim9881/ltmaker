import React, { Component } from 'react';
import styled from 'styled-components';

import db from '../text.json'

class Graph1 extends Component {

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
    //    let numArr = this.state.numArr
    //    for (let i = 0; i < 45; i++) {
    //        numArr.push(0);
    //    }
//
    //    let firstRound = parseInt(db[0].round, 10) - this.state.roundTo;        
//
    //    let firstDB = db.filter(data => parseInt(data.round, 10) > firstRound );
//
    //    firstDB.map(data => numArr.splice(parseInt(data.fst, 10) - 1, 1, numArr[parseInt(data.fst, 10) - 1] + 1));
    //    firstDB.map(data => numArr.splice(parseInt(data.snd, 10) - 1, 1, numArr[parseInt(data.snd, 10) - 1] + 1));
    //    firstDB.map(data => numArr.splice(parseInt(data.trd, 10) - 1, 1, numArr[parseInt(data.trd, 10) - 1] + 1));
    //    firstDB.map(data => numArr.splice(parseInt(data.foth, 10) - 1, 1, numArr[parseInt(data.foth, 10) - 1] + 1));
    //    firstDB.map(data => numArr.splice(parseInt(data.fvth, 10) - 1, 1, numArr[parseInt(data.fvth, 10) - 1] + 1));
    //    firstDB.map(data => numArr.splice(parseInt(data.sth, 10) - 1, 1, numArr[parseInt(data.sth, 10) - 1] + 1));
    //    firstDB.map(data => numArr.splice(parseInt(data.bonus, 10) - 1, 1, numArr[parseInt(data.bonus, 10) - 1] + 1));
//
    //    this.setState({numArr : numArr})
//
    //    console.log(numArr)
    //    
//
        this.drawRoundGraph();
    }

    drawRoundGraph() {        
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');        

        function drawTree(position, x, y) {
            let radius = 3;
            let xArcBegin = 0;
            let yArcBegin = 0;
            let xBegin = 0;
            let yBegin = 0;
            let xLineLeft = 0;
            let yLineLeft = 0;
            let xLineM = 0;
            let yLineM = 0;
            let xLineR = 0;
            let yLineR = 0;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);

        ctx.stroke();
        ctx.save();

        xArcBegin = x + radius;
        yArcBegin = y;
        xBegin = x + radius + 20;
        yBegin = y;
        xLineM = x + 35;
        yLineM = y;
        xLineLeft = xLineM;
        yLineLeft = y - 6;
        xLineR = xLineM;
        yLineR = y + 6
        
        ctx.moveTo(xArcBegin, yArcBegin);        
        ctx.lineTo(xBegin, yBegin);        
        ctx.stroke();

        ctx.restore();
        ctx.moveTo(xBegin, yBegin);
        ctx.lineTo(xLineLeft, yLineLeft);
        ctx.stroke();

        ctx.restore();
        ctx.moveTo(xBegin, yBegin);
        ctx.lineTo(xLineM, yLineM);
        ctx.stroke();

        ctx.restore();
        ctx.moveTo(xBegin, yBegin);
        ctx.lineTo(xLineR, yLineR);
        ctx.stroke();

            //if (position === 1) {            
            //    } else if (position === 2) {
            //    ctx.translate(xBegin, yBegin);
            //    ctx.rotate(30 * Math.PI / 180);
            //    ctx.translate(-xBegin, -yBegin);
            //    } else {
            //}        
        } 

        function threeFromOne(x, y, position) {
            let xTotal = x + 35 * 1 
        drawTree(1, x, y);        
        drawTree(1, xTotal, y);        
        }

        threeFromOne(200, 200, 1);            

        let a = 2;
        let x = 300;
        let y = 300;
        let radius = 5;
        
            for (let i = 11; i > 0; i--) {
                ctx.beginPath();
                if (i % 4 === 3) {                
                ctx.arc(x - radius * 1.68 + radius, y, radius * 1.68, 0 * Math.PI, 0.5 * Math.PI);                
                x = x - radius * 1.68 + radius;                
                } else if (i % 4 === 2) {
                    ctx.arc(x, y - radius * 1.68 + radius, radius * 1.68, 0.5 * Math.PI, 1 * Math.PI);                
                    y = y - radius * 1.68 + radius;
                } else if (i % 4 === 1) {
                    ctx.arc(x + radius * 1.68 - radius, y, radius * 1.68, 1 * Math.PI, 1.5 * Math.PI);                
                    x = x + radius * 1.68 - radius;
                } else {
                    ctx.arc(x, y + radius * 1.68 - radius, radius * 1.68, 1.5 * Math.PI, 0 * Math.PI);                
                    y = y + radius * 1.68 - radius;
                }               
                ctx.stroke();
                radius = radius * 1.68
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

export default Graph1;

const Round = styled.div`
    margin-top: 5%;
`