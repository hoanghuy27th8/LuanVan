import React, { Component } from 'react';
import './QuantitySelector.css'

class QuantitySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1, // Số lượng ban đầu
    };
  }

  handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    this.setState({ quantity: newQuantity });
  };

  incrementQuantity = () => {
    this.setState((prevState) => ({
      quantity: prevState.quantity + 1,
    }));
  };

  decrementQuantity = () => {
    if (this.state.quantity > 1) {
      this.setState((prevState) => ({
        quantity: prevState.quantity - 1,
      }));
    }
  };

  render() {
    return (
      <div>
        <label className='quantity-lable'>Số Lượng:</label>
        <button className='quantity-decrease' onClick={this.decrementQuantity}>-</button>
        <input
          className='quantity-input'
          type="number"
          min="1"
          value={this.state.quantity}
          onChange={this.handleQuantityChange}
        />
        <button className='quantity-increase' onClick={this.incrementQuantity}>+</button>
        <button className='btn-addTocard' onClick={() => this.props.onAddToCart(this.state.quantity)}>
          Thêm vào giỏ hàng
        </button>
      </div>
    );
  }
}

export default QuantitySelector;
