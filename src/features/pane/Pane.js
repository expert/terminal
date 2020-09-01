import React, {useState, useRef, useEffect} from "react";
import {nanoid} from "@reduxjs/toolkit"

import './pane.sass'
import { paneAdded, selectPaneByTab } from "./paneSlice";
import {useDispatch, useSelector} from "react-redux";


export const PaneLabel = (props) => {
    return (
        <label className="pane__label">alexei@iMacALexeiCern<span className="pane__label-suffix">:<i>~</i>$</span> {props.command}</label>
    )
};
// export const PaneAdd = (props) => {
//     const dispatch = useDispatch();
//     const socket = props.socket;
//     const keyPress = (e) => {
//         const value = e.target.value;
//         if(e.key === 'Enter') {
//             const id = nanoid();
//             socket.emit('command', {
//                 command: value,
//                 id: id
//             });
//             dispatch(
//                 paneAdded({
//                     command: value,
//                     body: 'running...',
//                     tabId: props.tabId,
//                     id: id
//                 })
//             );
//             e.target.value = '';
//         }
//     };
//     return (
//         <input type="text" className="pane__input" onKeyPress={keyPress}/>
//     )
// };

// export const PaneLabel = () => {
//     return <div key={i}><PaneLabel command={item.command}/><pre>{item.body}</pre></div>
// };

export const PaneBody = (props) => {
    const pane = useSelector(state => selectPaneByTab(state, props.tabId));
    const paneEl = useRef(null);
    const renderedBody = pane.map((item, i) => {
       return <div key={i}><PaneLabel command={item.command}/><pre>{item.body}</pre></div>;
    });
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked 2 times`;
        console.log('PaneBody', paneEl.current, paneEl.current.offsetHeight);
        paneEl.current.scrollTop = paneEl.current.scrollHeight
    });
    // if(paneEl) paneEl.current.scrollTop(1000);
    return (<div className="pane" ref={paneEl}>{renderedBody}</div>)
};

export default class Pane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            command: ''
        };
    }
    render() {
        const tabId = this.props.tabId;
        const socket = this.props.socket;
        return (<PaneBody tabId={tabId} />);
    }
}