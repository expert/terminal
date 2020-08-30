import React from 'react';
import ReactDOM from 'react-dom';
import './console.sass'

export default class Console extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };

    }
    render() {
        return <div className="console">
            <div className="console__bar">
                <button className="console__btn console__btn--close"></button>
                <button className="console__btn console__btn--min"></button>
                <button className="console__btn console__btn--max"></button>
            </div>
            <div className="console__tab">
                Last login: {this.state.date.toLocaleTimeString()}
            </div>
        </div>;
    }
}