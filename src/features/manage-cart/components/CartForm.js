import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, updateQuantity, removeFromCart } from '../cartSlice';
import { useNavigate } from 'react-router-dom';
import { cartData } from './example-data'
import '../cart-styles/cart.css'

const CartForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartFromStore = useSelector((state) => state.cart.items);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(cartFromStore);
  }, [cartFromStore]);


  //  const handleUpdateQuantity = (id, delta) => {
  //   const item = cartItems.find(i => i.serviceId === id); // hoặc dùng từ state nếu cần
  //   if (!item) return;

  //   const newQuantity = Math.max(1, item.quantity + delta);

  //   dispatch(updateQuantity({ id, quantity: newQuantity }));
  // };

  const handleSubmit = () => {
    navigate("/booking");
  }

  const removeItem = (e, id) => {
    e.preventDefault();
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?");
    if (confirmDelete) {
      console.log(cartFromStore)
      console.log("ID to remove:", id);
      dispatch(removeFromCart(id));
    }
  };
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleClearCart = () => {
    dispatch(clearCart())
  }
  return (
    <>
      <div className='cart-wrapper'>
        <div className="cart-page">
          {cartItems.length > 0 && (
            <div >
              <div >
                <h2>Giỏ hàng của bạn</h2>

                <button className="clear-cart-btn" onClick={() => {
                  if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng không?")) {
                    handleClearCart();
                  }
                }}>
                  Xóa tất cả
                </button>

                <div className="cart-list">
                  {cartItems.map(item => (
                    <div key={item.serviceId} className="cart-item">
                      <img src={item.imageDemo} alt={item.title} />
                      <div className="cart-info">
                        <p className="item-name">{item.title}</p>
                        <p className="item-price">{item.price && item.price.toLocaleString()} VND</p>

                      </div>
                      <button className="delete-btn" onClick={(e) => removeItem(e, item.serviceId)}>🗑️</button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Tổng cộng</span>
                    <span>{total && total.toLocaleString()} VND</span>
                  </div>
                  <div className="summary-row">
                    <span>Phí vận chuyển</span>
                    <span>Miễn phí</span>
                  </div>
                  <div className="summary-row total">
                    <strong>Tổng chi phí</strong>
                    <strong>{total && total.toLocaleString()} VND</strong>
                  </div>
                  <button onClick={() => { handleSubmit() }} className="checkout-btn">Tiến hành thanh toán</button>
                </div>
              </div>
            </div>
          )}
          {cartItems.length == 0 && (
            <div className='notifying'>
              <h2 >Chưa có gì trong giỏ hàng của bạn!</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default CartForm;
