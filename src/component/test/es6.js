import React, { Component } from 'react';
import styled from 'styled-components';

import db from '../text.json'

class Graph1 extends Component {

    constructor(props) {
        super(props);
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

        //// Difference between backtick(`) and apostrophe (')
        //let name = 'John';
        //let race = 'dove';
//
        ////This is backtick
        //let msg1 = `${name} is ${race}.`;
        ////This is apostrophe
        //let msg2 = name + ' is ' + race + '.';

        //let obj = [];
//
        //function uploadObj (arr, budget, people, ...objs) {
        //    arr.push({
        //        budget : budget,
        //        peopleNum : people,
        //        objects : [...objs]
        //    })
        //}
//
        //uploadObj(obj, 1000000, 5000, 'buildings', 'markets', 'dogs');
        //console.log(obj);
//
        ////Describe my town        ​
        //obj = {
        //budget: 1000000,​​
        //objects: Array(3) [ "buildings", "markets", "dogs" ],
        //peopleNum: 5000}

        ////Rest parameters handling
        //function pizza (cheese, tomato, ...topping) {
        //    let ingredients = ''
        //    for (let i = 0; i < topping.length; i++) {
        //        i == 0 ? ingredients = ingredients + topping[i] :
        //        ingredients = ingredients + ', ' + topping[i];
        //    }
        //    return `To make pizza I put cheese ${cheese} grams` +
        //    `tomato sauce ${tomato} grams and put ${ingredients}.`
        //}
//
        //console.log(pizza(200, 500, 'ham', 'sausage', 'pimang'));
//
        ////To make pizza I put cheese 200 gramstomato sauce 500 grams 
        ////and put ham, sausage, pimang.

        ////Default parameter Values
        //function mamal (fingers, armsAndLegs = 4 ) {
        //    return `${fingers} fingers + ${armsAndLegs} arms and legs`;
        //}
//
        //console.log(`A human's fingers and arms and legs are ${mamal(5 * 2)}.`);
        //console.log(`A dog's fingers and arms and legs are ${mamal(0)}.`);
        //console.log(`A human's fingers and arms and legs who lost his right leg are ${mamal(5 * 2, 3)}.`);
//
        ////A human's fingers and arms and legs are 10 fingers + 4 arms and legs. 
        ////A dog's fingers and arms and legs are 0 fingers + 4 arms and legs. 
        ////A human's fingers and arms and legs who lost his right leg are 10 fingers + 3 arms and legs.

        //// Block-Scoped Variables + arrow function
        //let money = [ 100, 200, 300, 400 ];               
//
        //let changes = money.map(change => 
        //    ({ tenDlr: change / 10, 
        //        oneDlr: change, 
        //        quarter: change * 4}))
//
        //for (let i = 0; i < money.length; i++) {
        //    let myMoney = money[i];
        //    let pieces = changes[i].tenDlr;
//
        //    console.log(
        //        `I have ${myMoney}$ and 
        //    I want to change to 10$ ${pieces} bills.`)
        //}
//
        ////I have 100$ and I want to change to 10$ 10 bills. 
        ////I have 200$ and I want to change to 10$ 20 bills. 
        ////I have 300$ and I want to change to 10$ 30 bills. 
        ////I have 400$ and I want to change to 10$ 40 bills.

        //console.log(changes)
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