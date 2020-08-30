import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Tab from "./Tab";

class Console extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            counter: 1,
            isLoggedIn: true
        };

    }
    componentDidMount() {
        // this.timerID = setInterval(
        //     () => this.tick(),
        //     1000
        // );
    }

    componentWillUnmount() {
        // clearInterval(this.timerID);
    }

    // tick() {
    //     this.setState({
    //         date: new Date()
    //     });
    // }
    render() {

        return (
            <div>
                <h1>Hello, world!</h1>

                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                <Tab />
            </div>

        );
    }
}

ReactDOM.render(
    <Console />,
    document.getElementById('root')
);