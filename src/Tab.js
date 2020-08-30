import React from 'react';
import ReactDOM from 'react-dom';
import './assets/tab.sass'

export default class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };

    }
    render() {
        return <div className="tab">
            <div className="tab__bar">
                <button className="tab__btn tab__btn--close"></button>
                <button className="tab__btn tab__btn--min"></button>
                <button className="tab__btn tab__btn--max"></button>
            </div>
            <div className="tab__console">
                Last login: {this.state.date.toLocaleTimeString()}
            </div>
        </div>;
    }
}