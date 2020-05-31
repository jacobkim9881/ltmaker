import React from 'react';

export default function pureNum(num) {
    num = "1, 2, 3 , 4, 5"
    let pure = num.match(/[\d,]/g)
    return pure
};