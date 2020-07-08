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
        this.drawRoundGraph();
    }

    drawRoundGraph() {        
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');        

        function test2(x, y, z) {
            ctx.beginPath();
            ctx.translate(300 + 20 * x, 300);
            ctx.rotate(y * 45 * Math.PI / 180);
            ctx.translate(-(300 + 20 * x), -300);
            ctx.moveTo(300 + 20 * x, 300);        
            ctx.lineTo(300 + 20 * z + 20 * x, 300);            
            ctx.stroke();   
        }

        
        let a = 1;

        for (let i = 1; i <= 8; i++) {
            test2(a, 2, i);
            test2(a + i, 2, i);
            a = a + i + i            
        }        

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