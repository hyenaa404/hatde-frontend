import React from "react";
import "../styles/wedding-card.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../features/manage-cart/cartSlice";

function WeddingCard({ service }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleAddToCart = (e, service) => {
    e.preventDefault();
    if (isAuthenticated) {
      alert("Đã thêm vào giỏ hàng của bạn. ")
      dispatch(addToCart(service));
    } else {
      alert("Vui lòng đăng nhập trước khi thêm vào giỏ hàng !")
    }
  };
  return (
    <Link to={`/service-detail/${service.serviceId}`} className="folder-link">
      <div className="service-card">
        <div className="service-image">
          <img src={service.imageDemo} alt={service.title} />
          <div className="category-label">{service.category || "Dịch vụ cưới"}</div>
        </div>
        <div className="service-info d-flex flex-column justify-content-between">
          <div>
            <div className="title-price-row">
              <h4 className="service-card-title">{service.title}</h4>

              <div className="price-group">
                <span className="price">
                  Từ <b>{service.price.toLocaleString()}₫</b>
                </span>
                <span className="per-event">per event</span>
              </div>
            </div>

            <p className="location">{service.address}</p>
            <div className="rating">
              ⭐  4.8 (102 reviews)
            </div>
            <p className="availability">Có sẵn từ 2025-05-20</p>
          </div>
          <div className="bottom-row">
            <button onClick={(e) => handleAddToCart(e, service)} className="btn-book">Đặt ngay</button>
          </div>
        </div>
      </div>
    </Link>
  );
}


export default WeddingCard;
