import React, { useState } from 'react';
import '../styles/booking-form.css';

const BookingForm = () => {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: 'Hà Nội',
        district: '',
        ward: '',
        paymentMethod: 'bank'
    });

    const orderItems = [
        { name: 'Bộ thiệp mời đám cưới (KL:300c)', price: 1000000, quantity: 2 },
        { name: 'Mạng che mặt cô dâu - Ren ngà (Combo 2)', price: 350000, quantity: 1 }
    ];




    const handleSubmit = (e) => {
        e.preventDefault();
        //send data to server
        alert('Đặt hàng thành công!');
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const total = orderItems.reduce((sum, item) => sum + item.price*item.quantity, 0);

    

    return (
        <form onSubmit={handleSubmit}>
        <div className="booking-form-container">
            <h2>Thanh toán</h2>
            <div></div>

            <form className="form-content">
                <div className="row">
                    <div className="input-group">
                        <label>Họ và tên</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>Số điện thoại</label>
                        <input type="text" name="phone" value={form.phone} onChange={handleChange} />
                    </div>
                </div>

                <div className="input-group full">
                    <label>Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} />
                </div>

                <div className="input-group full">
                    <label>Địa chỉ</label>
                    <input type="text" name="address" value={form.address} onChange={handleChange} />
                </div>

                <div className="row">
                    <div className="input-group">
                        <label>Tỉnh/Thành phố</label>
                        <select name="city" value={form.city} onChange={handleChange}>
                            <option>Hà Nội</option>
                            <option>TP. Hồ Chí Minh</option>
                            <option>Đà Nẵng</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Quận/Huyện</label>
                        <select name="district" value={form.district} onChange={handleChange}>
                            <option>Chọn quận/huyện</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Phường/Xã</label>
                        <select name="ward" value={form.ward} onChange={handleChange}>
                            <option>Chọn phường/xã</option>
                        </select>
                    </div>
                </div>

                <div className="payment-method">
                    <label>Phương thức thanh toán</label>
                    <div className="radio">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={form.paymentMethod === 'cod'}
                            onChange={handleChange}
                        />
                        <label>Thanh toán khi nhận hàng (COD)</label>
                    </div>
                    <div className="radio">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="bank"
                            checked={form.paymentMethod === 'bank'}
                            onChange={handleChange}
                        />
                        <label>Chuyển khoản ngân hàng</label>
                    </div>
                </div>
            </form>

            <div className="order-summary">
                <h4>Tóm tắt đơn hàng</h4>
                {orderItems.map((item, index) => (
                    <div className="summary-item" key={index}>
                        <span>{item.name} x1</span>
                        <span>{item.price.toLocaleString()} VND</span>
                    </div>
                ))}
                <div className="summary-total">
                    <div><span>Tạm tính</span><span>{total.toLocaleString()} VND</span></div>
                    <div><span>Phí vận chuyển</span><span>Miễn phí</span></div>
                    <div className="total"><span>Tổng cộng</span><span>{total.toLocaleString()} VND</span></div>
                </div>
            </div>

            <button className="order-button">Đặt hàng</button>
        </div>
        </form>
    );
};

export default BookingForm;
