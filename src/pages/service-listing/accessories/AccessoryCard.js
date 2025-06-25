import "../styles/accessory-card.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../features/manage-cart/cartSlice";
function AccessoryCard({ item }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handleAddToCart = (e, item) => {
    e.preventDefault();
    if (isAuthenticated) {
      alert("Đã thêm vào giỏ hàng của bạn. ")
      dispatch(addToCart(item));
    } else {
      alert("Vui lòng đăng nhập trước khi thêm vào giỏ hàng !")
    }
  };
  return (
    <Link to={`/service-detail/${item.serviceId}`} className="folder-link">
      <div className="service-card">
        <div className="service-image">
          <img src={item.imageDemo} alt={item.title} />
          <div className="category-label">{item.category || "Phụ kiện"}</div>
        </div>
        <div className="service-info d-flex flex-column justify-content-between">
          <div>
            <div className="title-price-row">
              <h4 className="accessory-card-title">{item.title}</h4>
              <div className="card-footer">
                <span className="price">{item.price.toLocaleString()}₫</span>
              </div>
            </div>

            <p className="location">Hà Nội</p>
            <div className="rating">
              ⭐  4.8 (102 reviews)
            </div>
            <p className="availability">Có sẵn từ 2025-05-20</p>
          </div>
          <div className="bottom-row">
            <button onClick={(e) => handleAddToCart(e, item)} className="btn-book">Đặt ngay</button>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default AccessoryCard;