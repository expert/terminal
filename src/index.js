import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import {Provider, useDispatch} from 'react-redux';
import store from './app/store';
import {paneUpdate} from "./features/pane/paneSlice";


import './index.css';

import Console from "./features/console/Console";

const socket = io('localhost:3001');

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});

function Socket() {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('command_response', data => {
            const {id, body} = data;
            dispatch(
                paneUpdate({
                    body,
                    id
                })
            );
        });
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('message');
        };
    });


    return null;
}

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
                <Socket/>
                <Console socket={socket}/>
            </Provider>
        );
    }
}

ReactDOM.render(
    <Terminal/>,
    document.getElementById('root')
);