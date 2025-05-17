import "../../styles/store-card.css"

function StoreCard({ store }) {
  return (
    <div className="store-card">
      <div className="store-image">
        <img src={store.image} alt={store.name} />
        <div className="icons">
          <i className="bi bi-heart"></i>
          <i className="bi bi-cart"></i>
        </div>
      </div>
      <div className="store-info">
        <p className="category">{store.category}</p>
        <h4>{store.name}</h4>
        <div className="bottom-row">
          <span className="price">${store.price}</span>
          <a href="#">View Details</a>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;


