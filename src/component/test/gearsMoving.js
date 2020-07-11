import React, { Component } from 'react';
import styled from 'styled-components';

import db from '../text.json'

class Graph1 extends Component {

    constructor(props) {
        super(props);
        this.state.drawRoundGraph = this.drawRoundGraph.bind(this);
        this.setRound = this.setRound.bind(this);
        this.test = this.test.bind(this);
    }

    state = {
        numArr : [],
        roundTo : 100,
        test : 'this is test'
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

        let deg1 = [{id: 1, deg: 0, rad: 40, x: 200, y: 200},
         {id: 2, deg: 0, rad: 20, x: 0, y: 0},
         {id: 3, deg: 0, rad: 90, x: 0, y: 0},
         {id: 4, deg: 0, rad: 120, x: 0, y: 0},
         {id: 5, deg: 0, rad: 10, x: 0, y: 0}
        ];
        

        function gear(gearName, x, y) {        

            if (x !== 0 && y !== 0) {
            } else {
                let formerGear = deg1[gearName.id - 2]
                x = formerGear.x + formerGear.rad + gearName.rad;
                y = formerGear.y;
                gearName.x = x;
                gearName.y = y;
            }

        ctx.translate(x, y);
        ctx.rotate(gearName.deg * Math.PI / 180);
        ctx.translate(-x, -y);
        ctx.beginPath();
        ctx.setLineDash([5, 15]);
        ctx.arc(x, y, gearName.rad, 0, 2 * Math.PI);
        ctx.moveTo(x, y);
        ctx.lineTo(100, 100);
        ctx.stroke();
        ctx.translate(x, y);
        ctx.rotate(-gearName.deg * Math.PI / 180);
        ctx.translate(-x, -y);
        ctx.font = '10px serif';
        ctx.fillText(360/gearName.rad , x - 5 , y);
        
        gearName.deg = gearName.deg + 360/gearName.rad

        }
        
        for (let i = 0; i < 300; i++) {
            setTimeout(() => {
                ctx.clearRect(0, 0, 1000, 1000);           
                ctx.font = '10px serif';
                ctx.fillText('Teeth moving speed: ' , 50, 200);
                deg1.forEach(data => gear(data, data.x, data.y));
            }, i * 100);
            
        }

    }

    test(e) {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');        

        let x = e.clientX;
        let y = e.clientY;

        this.setState({test : `you clicked in the arc : ${ctx.isPointInPath(x, y)}`});

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
                {this.state.test}<br/>
                <StyledCanvas onClick={this.test} ref="canvas" width={1000} height={1000} />
            </Round>
        );
    }
}

export default Graph1;

const Round = styled.div`
    margin-top: 5%;
`

const StyledCanvas = styled.canvas`
    display: block;
`