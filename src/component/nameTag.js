import React, { Component } from 'react';
import styled from 'styled-components'

export default function nameTag() {
    return <Tag>
        <Tit><center>A</center></Tit><Pri><center>1,000 원</center></Pri>
    </Tag>
};

const Tag = styled.div`
    position: relative;
`
const Tit = styled.div`
    display: inline-block;
    color: red;
    font-size: 3rem;
    width: 20%;;
    heigth: 3rem;
    border-bottom: 2px solid red;
`
const Pri = styled.div`
    position: absolute;
    display: inline-block;
    color: white;
    font-size: 3rem;
    width: 80%;
    heigth: 100%;    
    right: 0;
    background-color: red;
`