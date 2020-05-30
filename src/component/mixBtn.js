import React from 'react';
import styled from 'styled-components'

export default function mixBtn () {
    return <Mix type="submit" name="mix" value="이 중에서 랜덤 7개 뽑기" />
};

const Mix = styled.input`
    margin: auto;
    display: block
`