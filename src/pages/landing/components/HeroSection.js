import "../styles/hero-section.css"
const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="overlay">
        <div className="hero-content">
          <h1>Mọi thứ bạn cần cho<br />Đám cưới hoàn hảo của bạn</h1>
          <p>
            Để ngày hạnh phúc rực rỡ từng góc nhỏ — Tất tần tật phụ kiện & dịch vụ cưới, sẵn sàng bên bạn!
            Mô tả phụ: Một điểm đến, vạn điều tinh tế!
          </p>
          <div className="hero-buttons">
            <button className="btn banner-btn primary">Tìm dịch vụ</button>
            <button className="btn banner-btn secondary">Sản phẩm cửa hàng</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;