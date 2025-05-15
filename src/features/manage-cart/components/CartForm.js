import { useState } from 'react';
import {cartData} from './example-data'
import '../../../styles/cart/cart.css'

const CartForm = () => {
  const [cartItems, setCartItems] = useState(cartData);

  const updateQuantity = (id, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className='cart-wrapper'>
    <div className="cart-page">
      <h2>Giỏ hàng của bạn</h2>
      <div className="cart-list">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-info">
              <p className="item-name">{item.name}</p>
              <p className="item-price">{item.price.toLocaleString()} VND</p>
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
            </div>
            <button className="delete-btn" onClick={() => removeItem(item.id)}>🗑️</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="summary-row">
          <span>Tổng cộng</span>
          <span>{total.toLocaleString()} VND</span>
        </div>
        <div className="summary-row">
          <span>Phí vận chuyển</span>
          <span>Miễn phí</span>
        </div>
        <div className="summary-row total">
          <strong>Tổng chi phí</strong>
          <strong>{total.toLocaleString()} VND</strong>
        </div>
        <button className="checkout-btn">Tiến hành thanh toán</button>
      </div>
    </div>
    </div>
  );
};

export default CartForm;
