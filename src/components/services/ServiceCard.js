import React from "react";
import "../../styles/service-card.css";

function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <div className="service-image">
        <img src={service.image} alt={service.name} />
        <div className="category-label">{service.category}</div>
      </div>
      <div className="service-info">
        <div class="title-price-row">
          <h4>{service.name}</h4>
        
          <div class="price-group">
            <span class="price">From <b> ${service.price.toLocaleString()}</b></span>
            <span class="per-event">per event</span>
          </div>
        </div>

        <p className="location">{service.location}</p>
        <div className="rating">
          ⭐  {service.rating} ({service.reviews} reviews)
        </div>
        <p className="availability">Available from {service.availableFrom}</p>
        <div className="bottom-row">

          <button className="btn-book">Đặt ngay</button>
          <a href="#" className="learn-more">Learn More</a>
        </div>
      </div>
    </div>

  );
}

export default ServiceCard;
