import "../styles/hero-section.css"
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="hero-section">
      <div className="overlay">
        <div className="hero-content">
          <h1>Để ngày hạnh phúc rực rỡ từng góc nhỏ<br />Tất tần tật phụ kiện & dịch vụ cưới, sẵn sàng bên bạn!</h1>
          <p>
            Một điểm đến, vạn điều tinh tế!
          </p>
          <div className="hero-buttons">
            <button className="btn banner-btn primary" onClick={() => navigate('/wedding')}>Tìm dịch vụ</button>
            <button className="btn banner-btn secondary" onClick={() => navigate('/accessory')}>Sản phẩm cửa hàng</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;