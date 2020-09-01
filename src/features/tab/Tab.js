import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {nanoid} from "@reduxjs/toolkit"

import './tab.sass'

import {ReactComponent as CancelIcon} from '../../asstes/svg/cancel.svg';
import {ReactComponent as SettingsIcon} from '../../asstes/svg/gear.svg';
import {ReactComponent as AddIcon} from '../../asstes/svg/add.svg';

import {selectTabs, tabAdded, tabRemoved, setTabActive, getTabByTab, getActiveTab, setTabActiveCommand, setTabByIdCommand} from './tabsSlice'
import {selectPreviousCommandByTab} from '../pane/paneSlice'

import Pane from '../pane/Pane';
import {paneAdded} from "../pane/paneSlice";
import { PaneLabel } from "../pane/Pane";

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
                content: 'alexei@iMacALexeiCern %',
                isActive: true,
                command: ''
            })
        );
        // document.querySelector('.tab--active').click();
    };

    return (
        <a className="tab__btn tab__btn--add" onClick={onAddTabClicked}>
            <AddIcon className='tab__icon tab__icon--add'/>
        </a>
    )

};
export const TabsRemove = (props) => {
    const dispatch = useDispatch();

    const onRemoveTabClicked = (e) => {
        dispatch(
            tabRemoved(props.id)
        )
    };

    return (
        <button className="tab__btn tab__btn--close" onClick={onRemoveTabClicked}>
            <CancelIcon className="tab__icon tab__icon--close"/>
        </button>
    )
};
let i = 0;
export const TabItem = (props) => {
    const dispatch = useDispatch();
    let {command} = useSelector(state => getTabByTab(state, props.tabId));
    let {command: commandActive, id: tabActiveId} = useSelector(getActiveTab);
    // let previousCommand = useSelector(state => selectPreviousCommandByTab(state, {tabId: tabActiveId, commandId:  }));
    const socket = props.socket;
    let tabCommands = useSelector(state => selectPreviousCommandByTab(state, {tabId: tabActiveId }));
    const tabCommandsLength = tabCommands.length;

    const setActive = (e) => {
        const element = e.target;
        if (element.classList.contains('tab__btn') || element.closest('.tab__btn')) return;

        dispatch(
            setTabActive(props.tabId)
        )
    };
    const setKeyUp = (e) => {
        if(e.key === 'Backspace') {
            commandActive = command.slice(0, -1);
            // dispatch(setTabByIdCommand({command, id: props.tabId}));
            dispatch(setTabActiveCommand(commandActive));
        } else if (e.key === 'ArrowUp') {
            ++i;
            const previousIndex = tabCommandsLength - i;
            if (previousIndex >= 0) {
                // console.log('i', i, tabCommands[previousIndex]);
                dispatch(setTabActiveCommand(tabCommands[previousIndex]));

            } else {
                i = tabCommandsLength
            }
        } else if (e.key === 'ArrowDown') {
            --i;
            const nextIndex = tabCommandsLength - i;
            if (nextIndex <= tabCommandsLength - 1) {
                // console.log('i', i, tabCommands[nextIndex]);
                dispatch(setTabActiveCommand(tabCommands[nextIndex]));
            } else {
                i = 1
            }
        } else if(e.key === 'Enter') {
            const id = nanoid();
            socket.emit('command', {
                command: commandActive,
                id: id
            });
            dispatch(
                paneAdded({
                    command: commandActive,
                    body: 'running...',
                    tabId: tabActiveId,
                    id: id
                })
            );
            dispatch(setTabActiveCommand(''));
        } else if( ['Escape', 'Tab', 'CapsLock', 'Shift', 'Control', 'Alt', 'Meta'].indexOf(e.key) === -1) {
            commandActive += e.key;
            dispatch(setTabActiveCommand(commandActive));
        }

    };
    return (<div
        className={"tab" + (props.isActive ? " tab--active" : "")}
        onClick={setActive}
        onKeyUp={setKeyUp}
        tabIndex={props.isActive ? "0" : "2"}
    >
        {props.children}
        <PaneLabel command={command}/>
        <span className="tab__cursor" />
    </div>);
};

export default class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    render() {
        const {id, title, content, isActive} = this.props.tab;
        return <TabItem tabId={id} isActive={isActive} socket={this.props.socket}>
            <div className={"tab__bar"}>
                <TabsRemove id={id}/>
                <span className='tab__title'>{title}</span>
                <button className='tab__btn tab__btn--settings'>
                    <SettingsIcon className='tab__icon tab__icon--settings'/>
                </button>
                <TabsAdd/>
            </div>
            <div className="tab__pane">
                Last login Alexei: {this.state.date.toLocaleTimeString()} <br/>
                {content}
                <Pane tabId={id} socket={this.props.socket}/>
            </div>
        </TabItem>;
    }
}