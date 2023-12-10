import React, { Component } from 'react';
import './Alert.css';
import './AlertError.css';

class AlertError extends Component {
    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.props.closeAlert();
        }, 1500);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        return (
            <div className="alert">{this.props.message}</div>
        );
    }
}

export default AlertError;
