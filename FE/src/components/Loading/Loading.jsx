import React, { Component } from 'react';
import './Loading.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons'

class LoadingIcon extends Component {
  render() {
    return (
      <div className="loading-icon">
        <FontAwesomeIcon icon={faSpinner} />
      </div>
    );
  }
}

export default LoadingIcon;
