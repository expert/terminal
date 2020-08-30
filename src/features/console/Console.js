import React from 'react';
import ReactDOM from 'react-dom';
import './console.sass'
import Tab from "../tab/Tab";
import { useSelector, useDispatch } from 'react-redux'
import { selectTabs } from '../tab/tabsSlice'

export const TabsList = () => {
    const tabs = useSelector(selectTabs);
    const renderedTabs = tabs.map((tab, index) => (
        <Tab tab={tab} key={index}/>
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
        this.addPane = this.addPane.bind(this);
    }

    addPane() {
        this.setState(state => ({
            pane: state.pane + 1
        }))
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
                <TabsList />
            </div>
        </div>;
    }
}