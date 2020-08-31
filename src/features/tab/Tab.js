import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {nanoid} from "@reduxjs/toolkit"

import './tab.sass'

import {ReactComponent as CancelIcon} from '../../asstes/svg/cancel.svg';
import {ReactComponent as SettingsIcon} from '../../asstes/svg/gear.svg';
import {ReactComponent as AddIcon} from '../../asstes/svg/add.svg';

import {selectTabs, tabAdded, tabRemoved} from './tabsSlice'

import Pane from '../pane/Pane';

export const TabsAdd = () => {
    const tabs = useSelector(selectTabs);
    const dispatch = useDispatch();

    const onAddTabClicked = () => {
        const idTitle = tabs.length + 1;
        const id = nanoid();
        dispatch(
            tabAdded({
                id,
                title: 'Terminal ' + idTitle,
                content: 'alexei@iMacALexeiCern %'
            })
        )
    };

    return (
        <button type="button" className="tab__btn tab__btn--add" onClick={onAddTabClicked}>
            <AddIcon className='tab__icon tab__icon--add'/>
        </button>
    )

};
export const TabsRemove = (props) => {
    const dispatch = useDispatch();

    const onRemoveTabClicked = () => {
        dispatch(
            tabRemoved(props.id)
        )
    };

    return (
        <button type="button" className="tab__btn tab__btn--close" onClick={onRemoveTabClicked}>
            <CancelIcon className="tab__icon tab__icon--close"/>
        </button>
    )

};
export default class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };

    }

    render() {
        const tab = this.props.tab;
        return <div className="tab">
            <div className="tab__bar">
                <TabsRemove id={tab.id}/>
                <span className='tab__title'>{tab.title}</span>
                <button className='tab__btn tab__btn--settings'>
                    <SettingsIcon className='tab__icon tab__icon--settings'/>
                </button>
                <TabsAdd/>
            </div>
            <div className="tab__pane">
                Last login Alexei: {this.state.date.toLocaleTimeString()} <br/>
                {tab.content}
                <Pane tabId={tab.id} socket={this.props.socket}/>
            </div>
        </div>;
    }
}