import React, { Component } from 'react';

import db from '../text.json'

class Graph extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        numArr : []
    }


    componentDidMount() {
        let numArr = this.state.numArr
        for (let i = 0; i < 45; i++) {
            numArr.push(0);
        }

        let round5 = parseInt(db[0].round, 10) - 5;        

        let firstDB = db.filter(data => parseInt(data.round, 10) > round5 );

        firstDB.map(data => numArr.splice(parseInt(data.fst, 10) - 1, 1, numArr[parseInt(data.fst, 10) - 1] + 1));
        firstDB.map(data => numArr.splice(parseInt(data.snd, 10) - 1, 1, numArr[parseInt(data.snd, 10) - 1] + 1));
        firstDB.map(data => numArr.splice(parseInt(data.trd, 10) - 1, 1, numArr[parseInt(data.trd, 10) - 1] + 1));
        firstDB.map(data => numArr.splice(parseInt(data.foth, 10) - 1, 1, numArr[parseInt(data.foth, 10) - 1] + 1));
        firstDB.map(data => numArr.splice(parseInt(data.fvth, 10) - 1, 1, numArr[parseInt(data.fvth, 10) - 1] + 1));
        firstDB.map(data => numArr.splice(parseInt(data.sth, 10) - 1, 1, numArr[parseInt(data.sth, 10) - 1] + 1));
        firstDB.map(data => numArr.splice(parseInt(data.bonus, 10) - 1, 1, numArr[parseInt(data.bonus, 10) - 1] + 1));

        this.setState({numArr : numArr})
        console.log(this.state.numArr)

        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');        

        function drawGraph(startNum, finNum, radius) {            
            ctx.beginPath();

            let x = 500;
            let y = 500;             
            let TotalNum = 45;
            let pieOfNum = finNum / TotalNum;
            let targetArr = numArr.filter( (data, idx) => idx < finNum && idx >= startNum );
            let num = targetArr.reduce((a, b) => a + b);        
                    
            ctx.arc(x, y, radius, (2 * ((startNum - 1)/TotalNum)) * Math.PI, (2 * pieOfNum) * Math.PI);                        
            ctx.lineWidth = num * 10;            
            ctx.strokeStyle = `hsl(${8 * startNum}, 100%, 50%)`;
            ctx.stroke();
            ctx.font = "20px Arial";
            ctx.rotate( ((startNum - 1)/TotalNum) * 8 * Math.PI / 180)
            ctx.fillText(`${startNum} - ${finNum}`, x + radius, y);                
        }
        drawGraph(1, 10, 50);        
        drawGraph(1, 5, 150);
        drawGraph(1, 2, 200);
        drawGraph(4, 5, 200);
    }

    render() {
        return (
            <div>
                <canvas ref="canvas" width={1000} height={1000} />
                {this.state.numArr.map(data => " "+ data + " ")}<br/>
                1 - 5 : {this.state.numArr.filter( (data, idx) => idx < 5 )}
            </div>
        );
    }
}

export default Graph;