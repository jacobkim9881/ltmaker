import { createStore } from 'redux'

let number = {
    numbers: 0
}

function numState(state = number, action) {
    switch (action.type) {
        case 'GETNUM':
            return Object.assign({}, state, {
                numbers: Math.trunc((Math.random() * 45)+ 1)
            })
        default:
            return state;
    }
}

export const GETNUM = 'GETNUM';

let store = createStore(numState)

//store.subscribe(() => console.log(store.getState()))

export default store;