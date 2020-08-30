import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import './tab.sass'

import { ReactComponent as CancelIcon} from '../../asstes/svg/cancel.svg';
import { ReactComponent as SettingsIcon} from '../../asstes/svg/gear.svg';
import { ReactComponent as AddIcon} from '../../asstes/svg/add.svg';

import { tabAdded } from './tabsSlice'

export const TabsAdd = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const dispatch = useDispatch()

    // const onTitleChanged = e => setTitle('asdfasf')
    // const onContentChanged = e => setContent('e.target.value')

    const onSavePostClicked = () => {
        dispatch(
            tabAdded({
                id: nanoid(),
                title: 'asdfasdf',
                content: 'test'
            })
        )

            // setTitle('')
            // setContent('')
    }

    return (
        <button type="button" className="tab__btn tab__btn--add" onClick={onSavePostClicked}>
            <AddIcon className='tab__icon tab__icon--add'/>
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
                <button className='tab__btn'>
                    <CancelIcon className='tab__icon tab__icon--close'/>
                </button>
                <span className='tab__title'></span>
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