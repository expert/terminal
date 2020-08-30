import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit'

import store from './app/store';
import { Provider } from 'react-redux';

import './index.css';

import Console from "./features/console/Console";

// const initialState = { value: 0 }
//
// function counterReducer(state = initialState, action) {
//     // Check to see if the reducer cares about this action
//     if (action.type === 'counter/increment') {
//         // If so, make a copy of `state`
//         return {
//             ...state,
//             // and update the copy with the new value
//             value: state.value + 1
//         }
//     }
//     // otherwise return the existing state unchanged
//     return state
// }

// const store = configureStore({ reducer: counterReducer })
//
// console.log(store.getState())
// store.dispatch({ type: 'counter/increment' })
// console.log(store.getState())
// const selectCounterValue = state => state.valued
//
// const currentValue = selectCounterValue(store.getState())
// console.log(currentValue)

class Terminal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            counter: 1,
            isLoggedIn: true
        };

    }
    render() {
        return (
            <Provider store={store}>
                <Console />
            </Provider>

        );
    }
}

ReactDOM.render(
    <Terminal />,
    document.getElementById('root')
);