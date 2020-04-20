import React from 'react';
import styled from 'styled-components'

export default function ball() {
    return (
        <Ball>
            <Num>
                {Math.trunc((Math.random() * 45)+ 1)}
            </Num>
        </Ball>
    )
};

const Ball = styled.div`
    width: 100px;
    height: 100px;
    background-color: hsl(${() => Math.trunc(Math.random()* 361)}, 100%, 50%);
    border-radius: 50%;
    display: inline-block;
    margin: 10px;
`
const Num = styled.p`
font-size: 32px;
padding: 0px;
text-align: center;
`