import React, {useEffect, useRef} from "react";

import './pane.sass'
import {selectPaneByTab} from "./paneSlice";
import {useSelector} from "react-redux";


export const PaneLabel = (props) => {
    return (
        <label className="pane__label">alexei@iMacALexeiCern<span
            className="pane__label-suffix">:<i>~</i>$</span> {props.command}</label>
    )
};

export const PaneBody = (props) => {
    const pane = useSelector(state => selectPaneByTab(state, props.tabId));
    const paneEl = useRef(null);
    const renderedBody = pane.map((item, i) => {
        return <div key={i}><PaneLabel command={item.command}/>
            <pre>{item.body}</pre>
        </div>;
    });
    useEffect(() => {
        paneEl.current.scrollTop = paneEl.current.scrollHeight
    });
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
        return (<PaneBody tabId={tabId}/>);
    }
}