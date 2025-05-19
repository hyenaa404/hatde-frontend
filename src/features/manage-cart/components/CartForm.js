import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, updateQuantity, removeFromCart } from '../cartSlice';

import {cartData} from './example-data'
import '../cart-styles/cart.css'

const CartForm = () => {

  const dispatch = useDispatch();
  const cartFromStore = useSelector((state) => state.cart.items); 
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(cartFromStore); 
  }, [cartFromStore]);

  
  // const [cartItems, setCartItems] = useState(cartData);

 const handleUpdateQuantity = (id, delta) => {
  const item = cartItems.find(i => i.serviceId === id); // hoặc dùng từ state nếu cần
  if (!item) return;

  const newQuantity = Math.max(1, item.quantity + delta);

  dispatch(updateQuantity({ id, quantity: newQuantity }));
};


const removeItem = (e, id) => {
  e.preventDefault();
  const confirmDelete = window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?");
  if (confirmDelete) {
    console.log(cartFromStore)
console.log("ID to remove:", id);
    dispatch(removeFromCart(id));
  }
};
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleClearCart=()=> {
    dispatch(clearCart())
  }
  return (
  <div className='cart-wrapper'>
    <div className="cart-page">
      <h2>Giỏ hàng của bạn</h2>
      {cartItems.length > 0 && (
        <button className="clear-cart-btn" onClick={()=>{
          if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng không?")) {
    handleClearCart();
  }}}>
          Xóa tất cả
        </button>
      )}
      <div className="cart-list">
        {cartItems.map(item => (
          <div key={item.serviceId} className="cart-item">
            <img src={item.imageDemo} alt={item.title} />
            <div className="cart-info">
              <p className="item-name">{item.title}</p>
              <p className="item-price">{item.price.toLocaleString()} VND</p>
              <div className="quantity-control">
                <button onClick={() => handleUpdateQuantity(item.serviceId, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleUpdateQuantity(item.serviceId, 1)}>+</button>
              </div>
            </div>
            <button className="delete-btn" onClick={(e) => removeItem(e, item.serviceId)}>🗑️</button>
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
}
export default CartForm;
