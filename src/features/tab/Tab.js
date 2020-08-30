import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import './tab.sass'

import { ReactComponent as CancelIcon} from '../../asstes/svg/cancel.svg';
import { ReactComponent as SettingsIcon} from '../../asstes/svg/gear.svg';
import { ReactComponent as AddIcon} from '../../asstes/svg/add.svg';

import { tabAdded, tabRemoved, selectTabs } from './tabsSlice'

export const TabsAdd = () => {
    const tabs = useSelector(selectTabs);
    const dispatch = useDispatch()

    const onAddTabClicked = () => {
        const id = tabs.length + 1;
        dispatch(
            tabAdded({
                id,
                title: 'Terminal ' + id,
                content: 'Hello'
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
    const dispatch = useDispatch()

    const onRemoveTabClicked = () => {
        dispatch(
            tabRemoved(props.id)
        )
    };

    return (
        <button type="button" className="tab__btn tab__btn--close" onClick={onRemoveTabClicked}>
            <CancelIcon className='tab__icon tab__icon--close'/>
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
        const tab = this.props.tab
        return <div className="tab">
            <div className="tab__bar">
                {/*<button className='tab__btn'>*/}
                {/*    <CancelIcon className='tab__icon tab__icon--close'/>*/}
                {/*</button>*/}
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
            </div>
        </div>;
    }
}