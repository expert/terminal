import React from 'react';
import ReactDOM from 'react-dom';
import './console.sass'
import Tab from "../tab/Tab";
import { useSelector, useDispatch } from 'react-redux'
import { selectTabs } from '../tab/tabsSlice'

export const TabsList = (props) => {
    const tabs = useSelector(selectTabs);
    const socket = props.socket;
    const renderedTabs = tabs.map((tab, index) => (
        <Tab tab={tab} key={index} socket={socket}/>
    ));
    return (renderedTabs);
}

export default class Console extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            pane: 0
        };
    }

    render() {
        const pane = this.state.pane;
        return <div className="console">
            <div className="console__bar">
                <button className="console__btn console__btn--close"></button>
                <button className="console__btn console__btn--min"></button>
                <button className="console__btn console__btn--max"></button>
            </div>
            <div className="console__tabs">
                <TabsList socket={this.props.socket} />
            </div>
        </div>;
    }
}