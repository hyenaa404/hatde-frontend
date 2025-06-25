import React from 'react';
import '../../styles/common/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo + Mô tả */}
        <div className="footer-column logo-column">
          <h2 className="logo-text">Hat <span>De</span></h2>
          <p className="desc">
            Nơi cung cấp đầy đủ dịch vụ và sản phẩm cưới hỏi. Giúp việc chuẩn bị đám cưới trở nên dễ dàng, thú vị và không áp lực.
          </p>
          <div className="social-icons">
            <i className="fab fa-instagram"></i>
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>

        {/* Dịch vụ */}
        <div className="footer-column">
          <h3>Dịch vụ</h3>
          <ul>
            <li>Địa điểm tổ chức</li>
            <li>Chụp ảnh cưới</li>
            <li>Ẩm thực & Tiệc cưới</li>
            <li>Trang điểm & Làm đẹp</li>
            <li>Lên kế hoạch cưới</li>
          </ul>
        </div>

        {/* Mua sắm */}
        <div className="footer-column">
          <h3>Mua sắm</h3>
          <ul>
            <li>Váy cưới</li>
            <li>Vest & Áo dài</li>
            <li>Trang trí</li>
            <li>Thiệp mời</li>
            <li>Quà tặng & Lưu niệm</li>
          </ul>
        </div>

        {/* Công ty */}
        <div className="footer-column">
          <h3>Về chúng tôi</h3>
          <ul>
            <li>Giới thiệu</li>
            <li>Trở thành đối tác</li>
            <li>Blog</li>
            <li>Liên hệ</li>
            <li>Trung tâm trợ giúp</li>
          </ul>
        </div>
      </div>

      {/* Đăng ký nhận tin */}
      <div className="newsletter">
        <div>
          <h3>Đăng ký nhận bản tin</h3>
          <p>Nhận cảm hứng cưới và ưu đãi đặc biệt</p>
        </div>
        <form className="newsletter-form">
          <input type="email" placeholder="Địa chỉ email của bạn" required />
          <button type="submit">Đăng ký</button>
        </form>
      </div>

      {/* Dưới chân trang */}
      <div className="footer-bottom">
        <p>© 2025 Hat De. Đã đăng ký bản quyền.</p>
        <div className="footer-links">
          <a href="#">Chính sách bảo mật</a>
          <a href="#">Điều khoản dịch vụ</a>
          <a href="#">Chính sách Cookie</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
