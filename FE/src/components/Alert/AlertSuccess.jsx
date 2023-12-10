import React, { Component } from 'react';
import './Alert.css';

class AlertSuccess extends Component {
    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.props.closeAlert();
        }, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        return (
            <div style={{backgroundColor: '#4caf50'}} className="alert">{this.props.message}</div>
        );
    }
}

export default AlertSuccess;
