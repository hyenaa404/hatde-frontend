import React, { useState } from 'react';
import "../../../styles/auth/register.css"

export default function RegisterForm() {
  const [role, setRole] = useState('user');

  return (
    <div className="register-wrapper">
      <form className="register-form">
        <h3><span>Hat</span> De</h3>
        <h2>Tạo tài khoản</h2>
        <h6>Tham gia cộng đồng dịch vụ tiệc cưới</h6>

        <div className="role-toggle">
          <button
            type="button"
            className={role === 'user' ? 'active' : ''}
            onClick={() => setRole('user')}
          >
            <i className="fas fa-user"></i> Người dùng
          </button>
          <button
            type="button"
            className={role === 'vendor' ? 'active' : ''}
            onClick={() => setRole('vendor')}
          >
            <i className="fas fa-gift"></i> Người bán
          </button>
        </div>

        <div className="name-fields">
          <input type="text" placeholder="Họ" required />
          <input type="text" placeholder="Tên" required />
        </div>

        <div className="input-icon">
          <i className="fas fa-envelope"></i>
          <input type="email" placeholder="Địa chỉ Email" required />
        </div>

           <div className="input-icon">
          <i className="fas fa-phone"></i>
          <input type="text" placeholder="Số điện thoại" required />
        </div>


        {role === 'vendor' && (
  <>
    <div className="input-icon">
      <i className="fas fa-building"></i>
      <input type="text" placeholder="Tên doanh nghiệp" required />
    </div>

    <div className="input-icon">
      <i className="fas fa-list"></i>
      <select required>
        <option value="">Loại doanh nghiệp</option>
        <option value="catering">Dịch vụ tiệc</option>
        <option value="photography">Chụp ảnh cưới</option>
        <option value="decor">Trang trí tiệc</option>
      </select>
    </div>

    <div className="input-icon">
      <i className="fas fa-id-card"></i>
      <input type="text" placeholder="Mã số doanh nghiệp" required />
    </div>
  </>
)}


        <div className="input-icon">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Mật khẩu" required />
          <i className="fas fa-eye show-password"></i>
        </div>

        <div className="checkbox-row">
          <label>
            <input type="checkbox" /> Tôi đồng ý với{' '}
            <a href="#">Điều khoản dịch vụ</a> và{' '}
            <a href="#">Chính sách bảo mật</a>
          </label>
        </div>

        <button type="submit" className="btn-primary">
          Tạo tài khoản
        </button>

        <div className="divider">Hoặc tiếp tục với</div>

        <div className="social-login">
          <button><img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" /></button>
          <button><img src="https://img.icons8.com/color/24/facebook-new.png" alt="Facebook" /></button>
          <button><img src="https://img.icons8.com/color/24/twitter--v1.png" alt="Twitter" /></button>
        </div>

        <div className="login-footer">
          Đã có sẵn tài khoản? <a href="#">Đăng nhập</a>
        </div>
      </form>
    </div>
  );
}
