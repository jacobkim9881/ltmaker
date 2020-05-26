import React, { Component } from 'react';
import styled from 'styled-components'
import store, {GETNUM} from '../redux/redux'

class Refresh extends Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <Button type="submit" value="당첨번호 얻기" />
        );
    }
}

export default Refresh;

const Button = styled.input`
width: 150px;
display: block;
margin: 0 auto;
`