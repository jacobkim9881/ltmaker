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
        waters: [],
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

        //let waters = [];

       // let obj = {id: 1, x: 100 * 2, y: 80}
       //waters.push(obj);
       //let obj1 = {id: 2, x: 100 * 2 + 2, y: 80}
       //waters.push(obj1);
       //let obj2 = {id: 3, x: 100 * 2 + 4, y: 80}
       //waters.push(obj2);
       //let obj3 = {id: 4, x: 100 * 2 + 2, y: 78}
       //waters.push(obj3);
       //let obj4 = {id: 5, x: 100 * 2 , y: 78}
       //waters.push(obj4);


        //for (let i = 0; i < 100; i++) {
        //    for (let j = 0; j < 30; j++) {
        //        let obj = {id: j + i * 30, x: 100 + i * 2, y: 30 + j * 2}
        //        waters.push(obj);
        //    }            
        //}
        
        let waters = this.state.waters;

        function aWater(obj) {

            let stateObj = null;

            stateObj = waters[obj.id - 1];

            let len = 5

            let under = null;
            under = waters.find(water =>                 
                water.id !== stateObj.id && stateObj.x === water.x && water.y - stateObj.y === len
            );            
            let underLeft = null;
            underLeft = waters.find(water =>
                water.id !== stateObj.id && stateObj.x - water.x === len && water.y - stateObj.y === len
                );
            let underRight = null;
            underRight = waters.find(water =>
                water.id !== stateObj.id && stateObj.x - water.x === - len && water.y - stateObj.y === len
                );
            let right = null;
            right = waters.find(water =>
                water.id !== stateObj.id && stateObj.y === water.y && stateObj.x - water.x === - len
                );
            let left = null;
            left = waters.find(water =>
                water.id !== stateObj.id && stateObj.y === water.y && stateObj.x - water.x === len
                );

        
            let highY = null;            
            if (typeof waters.find(water => water.y < 10) !== 'undefined') {highY = waters.find(water => water.y < 10)}
            else if (typeof waters.find(water => water.y > 9 && water.y < 100) !== 'undefined') {highY = waters.find(water => water.y > 9 && water.y < 100)}
            else {highY = waters.find(water => water.y > 99 && water.y < 200);            }

            let error = null;
            error = waters.find(water =>
                water.id !== stateObj.id && stateObj.y === water.y && stateObj.x === water.x);
        
            //console.log(highY)
                            
            //console.log(right)
            //console.log(left)
            //console.log(under)
            //console.log('x loc ' + obj.x)
            //console.log('y loc ' + obj.y)            

            let wall = 500;            
            
            if (stateObj.y < 200) {                
                if (typeof highY !== 'undefined' && typeof error !== 'undefined' ) {                
                    stateObj.y =  Math.trunc(highY.y/5) - len;
                    ctx.strokeStyle = "hsl(200, 100%, 50%)";                                
                    ctx.fillStyle = "hsl(200, 100%, 50%)";                                
                    //console.log(error)
                    //highY.sort();
                    //stateObj.y = highY[0].y - len;
                } else if (typeof under === 'undefined') {                    
                        stateObj.y = Math.trunc(stateObj.y/5) * 5 + len;               
                        ctx.strokeStyle = "hsl(200, 100%, 50%)";                                
                        ctx.fillStyle = "hsl(200, 100%, 50%)";                                
                } else {                              
                        if (typeof underLeft === 'undefined' && typeof underRight !== 'undefined ' && stateObj.x + len > wall ) {
                            stateObj.x = Math.trunc(stateObj.x/5) * 5 - len;                                
                            stateObj.y = Math.trunc(stateObj.y/5) * 5 + len;
                            ctx.strokeStyle = "hsl(200, 100%, 50%)";
                            ctx.fillStyle = "hsl(200, 100%, 50%)";                                
                        } else if (typeof underRight === 'undefined' && typeof underLeft !== 'undefined ' && stateObj.x - len < wall - 100) {
                            stateObj.x = Math.trunc(stateObj.x/5) * 5 + len;                                
                            stateObj.y = Math.trunc(stateObj.y/5) * 5 + len;
                            ctx.strokeStyle = "hsl(200, 100%, 50%)";
                            ctx.fillStyle = "hsl(200, 100%, 50%)";                                
                        } else if (stateObj.x + len > wall || stateObj.x - len < wall - 100) { 
                            ctx.strokeStyle = "hsl(200, 100%, 50%)";
                            ctx.fillStyle = "hsl(200, 100%, 50%)";                                
                        } else if (typeof right === 'undefined' && typeof left !== 'undefined') {                                                                                    
                                stateObj.x = Math.trunc(stateObj.x/5) * 5 + len;                                                            
                                ctx.strokeStyle = "hsl(200, 100%, 50%)";      
                                ctx.fillStyle = "hsl(200, 100%, 50%)";                                
                        } else if (typeof left === 'undefined' && typeof right !== 'undefined' ) {                            
                                stateObj.x = Math.trunc(stateObj.x/5) * 5 - len;                                
                                ctx.strokeStyle = "hsl(200, 100%, 50%)";      
                                ctx.fillStyle = "hsl(200, 100%, 50%)";                                
                        } else if (typeof right === 'undefined' && typeof left === 'undefined') {                            
                            let ran2 = Math.trunc(Math.random() * 2);             
                            ctx.strokeStyle = "hsl(200, 100%, 50%)";                         
                            ctx.fillStyle = "hsl(200, 100%, 50%)";                                
                            if (ran2 === 0) {
                                stateObj.x = Math.trunc(stateObj.x/5) * 5 - len;                                
                            } else if (ran2 === 1) {
                                stateObj.x = Math.trunc(stateObj.x/5) * 5 + len;                                
                            }                            
                    } else {
                        ctx.strokeStyle = "hsl(200, 100%, 50%)";                         
                        ctx.fillStyle = "hsl(200, 100%, 50%)";               
                    }                   
                }                
            } 
            //console.log('x loc ' + obj.x)
            //console.log('y loc ' + obj.y)

            ctx.beginPath();
            ctx.rect(stateObj.x, stateObj.y, 5, 5);
            ctx.strokeStyle = "hsl(200, 100%, 50%)";    
            ctx.stroke();            
            ctx.fill();


            ctx.beginPath();
            ctx.moveTo(400, 100);
            ctx.lineTo(400, 205);
            ctx.lineTo(505, 205);
            ctx.lineTo(505, 100);
            ctx.strokeStyle = "hsl(0, 100%, 0%)";                   
            ctx.stroke();

            return waters;
        }        
        
        setInterval(() => {
            ctx.clearRect(0, 0, 1000, 1000);

            if (waters.length === 0) {
            ctx.beginPath();
            ctx.moveTo(400, 100);
            ctx.lineTo(400, 205);
            ctx.lineTo(505, 205);
            ctx.lineTo(505, 100);
            ctx.strokeStyle = "hsl(0, 100%, 0%)";                   
            ctx.stroke();
            }

            //aWater(waters[0])            
                this.state.waters.forEach(water => {
                    this.setState({waters: aWater(water)});
                });
        }, 1);

    }

    test(e) {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');        

        let x = e.clientX;
        let y = e.clientY;

        //this.setState({test : `you clicked in the arc : ${ctx.isPointInPath(x, y)}`});

        let obj = null;
        let waters = this.state.waters;


        for (let i = 0 ; i < 10; i++) {
            if (this.state.waters.length === 0) {
                obj = {id: 1, x: x, y: y};
            } else {
                obj = {id: this.state.waters.length, x: x, y: y};
            }
    
            waters.push(obj);
        }
        

        this.setState({waters: waters});

        //console.log(x, y)

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
                <StyledCanvas onMouseDown={this.test} ref="canvas" width={1000} height={1000} />
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