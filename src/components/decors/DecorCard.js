import "../../styles/decor-card.css"
function DecorCard({ item }) {
  return (
    <div className="decor-card">
      <div className="card-image">
        <img src={item.image} alt={item.name} />
        <div className="card-icons">
          <i className="bi bi-heart"></i>
          <i className="bi bi-cart"></i>
        </div>
      </div>
      <div className="card-content">
        <p className="category">{item.category}</p>
        <h4>{item.name}</h4>
        <div className="card-footer">
          <span className="price">{item.price.toLocaleString()}₫</span>
          <a href="#" className="detail-btn">Chi tiết</a>
        </div>
      </div>
    </div>
  );
}
export default DecorCard;