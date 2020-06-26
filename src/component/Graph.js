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

        ctx.beginPath();
        ctx.arc(100, 75, 50, 1.5 * Math.PI, 0 * Math.PI);
        ctx.lineWidth = this.state.numArr.filter( (data, idx) => idx < 5 ).reduce((a, b) => a + b) * 10;
        ctx.strokeStyle = "hsl(54, 100%, 50%)";
        ctx.stroke();
        ctx.font = "20px Arial";
        ctx.fillText("1 - 5", 100, 75);
        
    }

    render() {
        return (
            <div>
                <canvas ref="canvas" width={640} height={425} />
                {this.state.numArr.map(data => " "+ data + " ")}<br/>
                1 - 5 : {this.state.numArr.filter( (data, idx) => idx < 5 )}
            </div>
        );
    }
}

export default Graph;