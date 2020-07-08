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


        function planet(day, dis, rad, deg, spd, name) {
            ctx.beginPath();        
        ctx.translate(500, 500);
        ctx.rotate( ((deg * 100 + day * spd) * Math.PI) / 18000);
        ctx.arc(0, -dis, rad, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.font = '10px serif';
        ctx.fillText(name, 0, -dis)
        ctx.translate(-500, -500);        


        ctx.translate(500, 500);
        ctx.rotate( -((deg * 100 + day * spd) * Math.PI) / 18000);
        ctx.translate(-500, -500);        
        }        

        function space(day) {
        window.setTimeout(() => {
            ctx.clearRect(0, 0, 1000, 1000)
            ctx.beginPath();
            ctx.arc(500, 500, 50, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.font = '30px serif';
            ctx.fillText('Sun', 500, 500)
    
            ctx.beginPath();
            ctx.arc(500, 500, 400, 0, 2 * Math.PI);
            ctx.stroke();    
        

        planet(day, 400, 10, 351, 0.63, 'Neptune')

        planet(day, 370, 10, 37, 1.17, 'Uranus')      
        planet(day, 330, 25, 301, 3.4, 'Saturn')      
        planet(day, 250, 30, 295, 8, 'Jupiter')      
        planet(day, 70, 2, 98.5, 409, 'Mercury')      
        planet(day, 100, 7, 160, 66, 'Venus')      
        planet(day, 140, 4, 0, 98, 'Earth')      
        planet(day, 200, 3, 4, 52, 'Mars') 

        }, 100 * day) 
        }

        for (let i = 0; i < 3600; i++) {
            space(i);
        }

        function test() {
            setTimeout(() => console.log('hello'))
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