import React from 'react';
import { Heart, Gift, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div style={{ background: '#FFEFF2', minHeight: '100vh', padding: '40px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section 2 cột */}
        <div style={{
          display: 'flex',
          gap: 40,
          alignItems: 'center',
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          padding: 40,
          marginBottom: 48,
          flexWrap: 'wrap'
        }}>
          {/* Ảnh minh họa */}
          <div style={{ flex: '1 1 350px', minWidth: 320 }}>
            <img
              src="https://anhvienmimosa.com.vn/wp-content/uploads/2024/12/concept-chup-anh-cuoi-49.jpg"
              alt="Cô dâu chú rể"
              style={{
                width: '100%',
                borderRadius: 12,
                objectFit: 'cover',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
              }}
            />
          </div>
          {/* Nội dung giới thiệu */}
          <div style={{ flex: '2 1 400px', minWidth: 320 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#222', marginBottom: 12, display: 'flex', alignItems: 'center' }}>
              <span role="img" aria-label="ring" style={{ marginRight: 8, fontSize: 28 }}>💍</span>
              Giới thiệu về chúng tôi
            </div>
            <div style={{ width: 60, height: 3, background: '#F26A8D', borderRadius: 2, marginBottom: 20 }} />
            <p style={{ marginBottom: 10 }}>
              HD Wedding & Events ra đời từ chính những trăn trở của người trẻ khi chuẩn bị cho ngày trọng đại: quá nhiều lựa chọn, quá ít thông tin rõ ràng, và áp lực để mọi thứ phải hoàn hảo.
            </p>
            <p style={{ marginBottom: 10 }}>
              Chúng tôi tin rằng mỗi đám cưới không chỉ là một sự kiện, mà là một chương mở đầu của tình yêu – nơi từng chi tiết nhỏ đều đáng được nâng niu và lưu giữ.
            </p>
            <p style={{ marginBottom: 10 }}>
              Vì thế, HD Wedding & Events không đơn thuần là một nền tảng đặt dịch vụ cưới. <span role="img" aria-label="bulb">💡</span> Chúng tôi là cầu nối giữa các cặp đôi và những nhà cung cấp uy tín: từ váy cưới, makeup, chụp ảnh, thiệp cưới cho đến địa điểm tổ chức – tất cả được sắp xếp thông minh, minh bạch, cá nhân hoá theo ngân sách và phong cách riêng của bạn.
            </p>
            <p style={{ marginBottom: 10 }}>
              <span role="img" aria-label="leaf">🌿</span> Với HD Wedding & Events, bạn không còn phải chạy đơn đặt lẻ từng chỗ – bạn chỉ cần mở web, chọn, đặt và an tâm tận hưởng hành trình cưới như mong muốn. Chúng tôi ở đây để giúp bạn cưới theo cách dễ dàng – đúng gu – và trọn vẹn nhất.
            </p>
            <div style={{ marginTop: 24 }}>
              <Link to="/wedding">
                <button style={{
                  background: '#F26A8D',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 24,
                  padding: '12px 32px',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(242,106,141,0.08)'
                }}>
                  Tìm hiểu thêm về dịch vụ
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Lý do chọn */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#222', marginBottom: 8 }}>
            Tại sao chọn chúng tôi
          </div>
          <div style={{ width: 80, height: 4, background: '#F26A8D', margin: '0 auto', borderRadius: 2 }} />
        </div>
        <div style={{
          display: 'flex',
          gap: 32,
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 32,
            minWidth: 220,
            flex: '1 1 220px',
            textAlign: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
          }}>
            <Heart color="#F26A8D" size={36} style={{ marginBottom: 12 }} />
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Tận Tâm</div>
            <div style={{ color: '#666' }}>Chúng tôi đồng hành và lắng nghe mọi nhu cầu của bạn</div>
          </div>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 32,
            minWidth: 220,
            flex: '1 1 220px',
            textAlign: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
          }}>
            <Gift color="#F26A8D" size={36} style={{ marginBottom: 12 }} />
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Sáng Tạo</div>
            <div style={{ color: '#666' }}>Mỗi đám cưới là độc nhất, phản ánh cá tính riêng của bạn</div>
          </div>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 32,
            minWidth: 220,
            flex: '1 1 220px',
            textAlign: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
          }}>
            <Camera color="#F26A8D" size={36} style={{ marginBottom: 12 }} />
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Chất Lượng</div>
            <div style={{ color: '#666' }}>Đội ngũ chuyên nghiệp với kinh nghiệm tổ chức hàng đầu</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;