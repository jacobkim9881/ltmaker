import React, { Component } from 'react';
import styled from 'styled-components';

import db from '../text.json'

class Graph1 extends Component {

    constructor(props) {
        super(props);
        this.setRound = this.setRound.bind(this);
        this.test = this.test.bind(this);
    }

    //Destructuring Assignment
    state = {
        numArr : [2],
        roundTo : 100,
        feet: []
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');        

        //let obj = [
        //    {id: 1, act: 0, x: 100, y: 100, bodyx: 100, bodyy: 100}              
        //];

        let feet = this.state.feet;

        for (let i = 1; i < 10; i++) {
            let obj = {id: i, act: 0, x: i * 100, y: 100, bodyx: 100, bodyy: 100};
            feet.push(obj);            
        }
        this.setState({feet: feet});

        let x = 100;
        let y = 100;
        let bodyx = 100;
        let bodyy = 100;
        let act = 0;

        function centBody(obj) {            
            ctx.beginPath();
            ctx.rect(obj.x, obj.y, obj.bodyx, obj.bodyy);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(obj.x + obj.bodyx/2, obj.y);
            switch(obj.act) {
                case 0: 
                // |
                ctx.lineTo(obj.x + obj.bodyx/2, obj.y - obj.bodyy/2);
                ctx.stroke();
                obj.act = obj.act + 1;
                obj.bodyx = obj.bodyx + 20;                                            
                return obj;
                case 1:
                // (
                ctx.lineTo(obj.x + obj.bodyx * 3/4, obj.y - obj.bodyy/2);
                ctx.stroke();
                obj.act = obj.act + 1;
                obj.x = obj.x + 20;                
                obj.bodyx = obj.bodyx - 20;                
                return obj;
                case 2:
                // )
                ctx.lineTo(obj.x + obj.bodyx/4, obj.y - obj.bodyy/2);
                ctx.stroke();
                obj.act = 0;
                return obj;
                default:
                ctx.lineTo(obj.x + obj.bodyx/2, obj.y - obj.bodyy/2);
                ctx.stroke();
                return obj;
            }                                  
        }
        
        setInterval(() => {
            ctx.clearRect(0, 0, 1000, 1000);
            this.state.feet.forEach(obj => this.setState({feet: centBody(obj)})) 
        }, 500);
        
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
                <canvas ref="canvas" width={1000} height={1000} />
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