import React from 'react';
import ReactDOM from 'react-dom';
import './console.sass'
import Tab from "../tab/Tab";
import { useSelector, useDispatch } from 'react-redux'
import { selectTabs, getTabsDimenssions } from '../tab/tabsSlice'
import store from "../../app/store";

export const TabsList = (props) => {
    const tabs = useSelector(selectTabs);
    const tabsDimenssions = useSelector(getTabsDimenssions);
    const socket = props.socket;
    const renderedTabs = tabs.map((tab, index) => (
        <Tab className={'test'} tab={tab} key={index} socket={socket}/>
    ));
    return (<div className="console__tabs" style={{gridTemplateRows: 'repeat(4, 1fr)', gridTemplateColumns: 'repeat(12, 1fr)'}}>{renderedTabs}</div>);
}

export default class Console extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            pane: 0
        };
        this.resetConsole = this.resetConsole.bind(this);
    }

    resetConsole() {
        localStorage.setItem('reduxState', '');
        document.location.reload();
    }

    render() {
        const pane = this.state.pane;
        return <div className="console">
            <div className="console__bar">
                <button className="console__btn console__btn--close" onClick={this.resetConsole}></button>
                <button className="console__btn console__btn--min"></button>
                <button className="console__btn console__btn--max"></button>
            </div>
            <TabsList socket={this.props.socket} />
        </div>;
    }
}