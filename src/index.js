import React, { useState, useEffect }  from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import {Provider, useDispatch} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import store from './app/store';
import {paneAdded, paneUpdate} from "./features/pane/paneSlice";


import './index.css';

import Console from "./features/console/Console";

const socket = io('localhost:3001');

store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});

function Socket() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastMessage, setLastMessage] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });
        socket.on('disconnect', () => {
            setIsConnected(false);
        });
        socket.on('message', data => {
            setLastMessage(data);
        });
        socket.on('command_response', data => {
            console.log('got command from server', data);
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

    const sendMessage = () => {
        socket.emit('hello!');
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>Connected: { '' + isConnected }</p>
                <p>Last message: { lastMessage || '-' }</p>
                <button onClick={ sendMessage }>Say hello!</button>
            </header>
        </div>
    );
};

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
                <Socket />
                <Console socket={socket} />
            </Provider>

        );
    }
}

ReactDOM.render(
    <Terminal />,
    document.getElementById('root')
);