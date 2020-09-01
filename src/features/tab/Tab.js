import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {nanoid} from "@reduxjs/toolkit"

import './tab.sass'

import {ReactComponent as CancelIcon} from '../../asstes/svg/cancel.svg';
import {ReactComponent as SettingsIcon} from '../../asstes/svg/gear.svg';
import {ReactComponent as AddIcon} from '../../asstes/svg/add.svg';

import {
    getActiveTab,
    getTabByTab,
    selectTabs,
    setTabActive,
    setTabActiveCommand,
    tabAdded,
    tabRemoved,
    updateTabDimension,
    updateTabSetting
} from './tabsSlice'
import {paneAdded, selectPreviousCommandByTab} from '../pane/paneSlice'

import Pane, {PaneLabel} from '../pane/Pane';

export const TabsAdd = (props) => {
    const tabs = useSelector(selectTabs);
    const dispatch = useDispatch();
    let [isDropdownShow, setDropdownShow] = useState(false);
    const currentTab = useSelector(state => getTabByTab(state, props.tabId));

    const onAddTab = (vertical = true) => {
        const idTitle = tabs.length + 1;
        const id = nanoid();
        isDropdownShow = setDropdownShow(false);
        const newWidth = vertical ? currentTab.width / 2 : currentTab.width;
        const newHeight = vertical ? currentTab.height : currentTab.height / 2;
        const newX = vertical ? currentTab.x : currentTab.x + newHeight;
        const newY = vertical ? currentTab.y + newWidth : currentTab.y;
        dispatch(updateTabDimension({
            id: props.tabId,
            x: currentTab.x,
            y: currentTab.y,
            width: newWidth,
            height: newHeight
        }));
        dispatch(
            tabAdded({
                id,
                title: 'Terminal ' + idTitle,
                content: '',
                isActive: true,
                command: '',
                width: newWidth,
                height: newHeight,
                x: newX,
                y: newY,
                backgroundColor: '#000',
                color: '#9c9ea0',
                fontSize: 14,
                cursor: 'default'
            })
        );
    };
    const onAddClicked = () => {
        isDropdownShow = setDropdownShow(!isDropdownShow);
    };

    return (
        <div className="dropdown">
            <a className="tab__btn tab__btn--add" onClick={onAddClicked}>
                <AddIcon className='tab__icon tab__icon--add'/>
            </a>
            {isDropdownShow && <div className="dropdown__box">
                <a onClick={() => onAddTab(true)}>Split Vertical</a>
                <a onClick={() => onAddTab(false)}>Split Horizontal</a>
            </div>}

        </div>
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
        <button className="tab__btn tab__btn--close">
            <CancelIcon className="tab__icon tab__icon--close"/>
        </button>
    )
};
export const TabsSettings = (props) => {
    const dispatch = useDispatch();
    let [isDropdownShow, setDropdownShow] = useState(false);
    const currentTab = useSelector(state => getTabByTab(state, props.tabId));
    const {backgroundColor, color, fontSize, cursor} = currentTab;

    const onSettingsClicked = () => {
        isDropdownShow = setDropdownShow(!isDropdownShow);
    };
    return (
        <div className="dropdown" style={{marginLeft: 'auto'}}>
            <button className="tab__btn tab__btn--settings" onClick={onSettingsClicked}>
                <SettingsIcon className="tab__icon tab__icon--settings"/>
            </button>
            {isDropdownShow && <div className="dropdown__box">
                <label>
                    Background Color
                    <input type="color" value={backgroundColor} onChange={(e) => dispatch(updateTabSetting({
                        value: e.target.value,
                        key: 'backgroundColor',
                        id: props.tabId
                    }))}/>
                </label>
                <label>
                    Color <input type="color" value={color} onChange={(e) => dispatch(updateTabSetting({
                    value: e.target.value,
                    key: 'color',
                    id: props.tabId
                }))}/>
                </label>
                <label>
                    Font size <input type="range" min="0" max="25" value={fontSize}
                                     onChange={(e) => dispatch(updateTabSetting({
                                         value: e.target.value,
                                         key: 'fontSize',
                                         id: props.tabId
                                     }))}/>
                </label>
                <label>
                    Cursor
                    <select value={cursor} onChange={(e) => dispatch(updateTabSetting({
                        value: e.target.value,
                        key: 'cursor',
                        id: props.tabId
                    }))}>
                        <option value="default">Default</option>
                        <option value="pointer">Pointer</option>
                        <option value="not-allowed">not-allowed</option>
                        <option value="wait">wait</option>
                        <option value="text">text</option>
                        <option value="move">move</option>
                        <option value="crosshair">crosshair</option>
                    </select>
                </label>

            </div>}

        </div>
    )
};
let i = 0;
export const TabItem = (props) => {
    const dispatch = useDispatch();
    let {command, width, height, x, y, backgroundColor, color, fontSize, cursor} = useSelector(state => getTabByTab(state, props.tabId));
    let {command: commandActive, id: tabActiveId} = useSelector(getActiveTab);
    const socket = props.socket;
    let tabCommands = useSelector(state => selectPreviousCommandByTab(state, {tabId: tabActiveId}));
    const tabCommandsLength = tabCommands.length;

    const setActive = (e) => {
        const element = e.target;
        if (element.classList.contains('tab__btn') || element.closest('.tab__btn')) return;

        dispatch(
            setTabActive(props.tabId)
        )
    };
    const setKeyUp = (e) => {
        if (e.key === 'Backspace') {
            commandActive = command.slice(0, -1);
            dispatch(setTabActiveCommand(commandActive));
        } else if (e.key === 'ArrowUp') {
            ++i;
            const previousIndex = tabCommandsLength - i;
            if (previousIndex >= 0) {
                dispatch(setTabActiveCommand(tabCommands[previousIndex]));

            } else {
                i = tabCommandsLength
            }
        } else if (e.key === 'ArrowDown') {
            --i;
            const nextIndex = tabCommandsLength - i;
            if (nextIndex <= tabCommandsLength - 1) {
                dispatch(setTabActiveCommand(tabCommands[nextIndex]));
            } else {
                i = 1
            }
        } else if (e.key === 'Enter') {
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
        } else if (['Escape', 'Tab', 'CapsLock', 'Shift', 'Control', 'Alt', 'Meta'].indexOf(e.key) === -1) {
            commandActive += e.key;
            dispatch(setTabActiveCommand(commandActive));
        }

    };
    return (<div
        className={"tab" + (props.isActive ? " tab--active" : "")}
        onClick={setActive}
        onKeyUp={setKeyUp}
        tabIndex={props.isActive ? "0" : "2"}
        style={{
            gridArea: x + ' / ' + y + ' / span ' + height + ' / span ' + width,
            '--background-color': backgroundColor,
            '--color': color,
            '--font-size': fontSize + 'px',
            '--cursor': cursor
        }}
    >
        {props.children}
        <PaneLabel command={command}/>
        <span className="tab__cursor"/>
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
                <TabsSettings tabId={id}/>
                <TabsAdd tabId={id}/>
            </div>
            <div className="tab__pane">
                {content}
                <Pane tabId={id} socket={this.props.socket}/>
            </div>
        </TabItem>;
    }
}