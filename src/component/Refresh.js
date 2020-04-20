import React, { Component } from 'react';
import styled from 'styled-components'

class Refresh extends Component {
    constructor() {
        super();
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    handleRefresh() {
        window.location.reload();
    }

    render() {
        return (
            <Button onClick={this.handleRefresh} type="submit" value="당첨번호 얻기" />
        );
    }
}

export default Refresh;

const Button = styled.input`
width: 150px;
display: block;
margin: 0 auto;
`