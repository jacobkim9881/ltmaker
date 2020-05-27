import React from 'react';

export default function checkNum(props) {
    return props > 9 ?                
    props :
    <span style={{padding: "0px 5.5px"}}>{props}
    </span> 
};