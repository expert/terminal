import React, {useState} from "react";

import './pane.sass'
import { paneAdded, selectPaneByTab } from "./paneSlice";
import {useDispatch, useSelector} from "react-redux";

export const PaneLabel = (props) => {
    return (
        <label className="pane__label">alexei@iMacALexeiCern<span className="pane__label-suffix">:<i>~</i>$</span>{props.command}</label>
    )
};
export const PaneAdd = (props) => {
    const dispatch = useDispatch();
    const keyPress = (e) => {
        const value = e.target.value;
        if(e.key === 'Enter') {
            dispatch(
                paneAdded({
                    command: value,
                    body: 'running...',
                    tabId: props.tabId
                })
            );
            e.target.value = '';
        }
    };
    return (
        <input type="text" className="pane__input" onKeyPress={keyPress}/>
    )
};

export const PaneBody = (props) => {
    const pane = useSelector(state => selectPaneByTab(state, props.tabId));
    console.log('pane', pane);
    const renderedBody = pane.map((item, i) => {
       return <div key={i}><PaneLabel command={item.command}/><br/>{item.body}<br/></div>;
    });
    return (renderedBody)
};

export default class Pane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            command: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }
    handleChange(event) {
        this.setState({command: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.command);
        event.preventDefault();
    }
    keyPress(e) {
        console.log(e)
        console.log(e.key)
        if(e.key === 'Enter') {
            this.handleSubmit(e)
            // alert('shoudl save', this.state.command)
        }
    }

    render() {
        const tabId = this.props.tabId;
        return (
            <div className="pane">
                <div className="pane__body">
                    <PaneBody tabId={tabId} />
                </div>
                {/*<div className="pane__toolbar">*/}
                {/*    <label className="pane__label">alexei@iMacALexeiCern<span className="pane__label-suffix">:<i>~</i>$</span></label>*/}
                {/*    <input type="text" className="pane__input" value={this.state.value} onChange={this.handleChange} onKeyPress={this.keyPress}/>*/}
                {/*</div>*/}
                <PaneAdd tabId={tabId}/>
            </div>
        );
    }
}