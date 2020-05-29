import React from 'react';
import styled from 'styled-components'

export default function checkBx() {
    return <CheckBox />
};

const Box = () => <input type="checkbox" value="item" />

const CheckBox = styled(Box)`
    display: inline-block;
`