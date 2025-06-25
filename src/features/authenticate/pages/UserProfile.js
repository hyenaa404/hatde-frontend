import React, { useState } from 'react';
import '../auth-style/profile.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUserByIdAPI, updateUserAPI } from '../authAPI';
import { setUser } from '../authSlice';


const UserProfile = () => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: ''
    });
    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Tên người dùng không được để trống';
        if (!formData.email.trim()) {
            newErrors.email = 'Email không được để trống';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Số điện thoại không được để trống';
        } else if (!/^[0-9]{8,15}$/.test(formData.phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }
        if (!formData.address.trim()) newErrors.address = 'Địa chỉ không được để trống';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEditClick = async () => {
        try {
            const curUser = await getUserByIdAPI(user.id);
            setFormData(curUser.data);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            await updateUserAPI(formData);
            setShowModal(false);
            dispatch(setUser({
                ...user,
                fullname: formData.fullName,
                email: formData.email,
                address: formData.address,
                phone: formData.phone
            }));
            // window.location.reload();  optional: refresh page or update redux state
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    return (
        <div className="container py-4">
            <div className="row shadow rounded bg-white">
                {/* Sidebar */}
                <div className="col-md-3 border-end px-4 py-4">
                    <div className="text-center mb-4">
                        <div
                            className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto"
                            style={{ width: 100, height: 100 }}
                        >
                            <i className="bi bi-person-circle" style={{ fontSize: '64px', color: '#6c757d' }}></i>
                        </div>

                        <h6 className="mt-2">{user.fullname}</h6>
                        <p className="text-muted small">{user.email}</p>
                    </div>

                    <ul className="list-unstyled">

                        <li className="mb-3">
                            <button className="btn btn-pink w-100 text-start fw-bold">
                                <i className="bi bi-person me-2"></i> Thông tin cá nhân
                            </button>
                        </li>
                        <li className="mb-3">
                            <a href="./booking-history">
                                <button className="btn btn-light w-100 text-start">
                                    <i className="bi bi-clock-history me-2"></i> Lịch sử đặt hàng
                                </button>
                            </a>
                        </li>
                        {isAuthenticated && user?.role === "vendor" && (
                            <a href="../vendor/dashboard">
                                <button className="btn btn-light w-100 text-start">
                                    <i className="bi bi-speedometer2 me-2"></i> Quản lí Cửa hàng
                                </button>
                            </a>
                        )}

                        {isAuthenticated && user?.role === "admin" && (
                            <a href="../admin/dashboard">
                                <button className="btn btn-light w-100 text-start">
                                    <i className="bi bi-shield-lock me-2"></i> Quản lí Dịch vụ web
                                </button>
                            </a>
                        )}
                        <li className="mt-4">
                            <a href='./logout'>
                                <button className="btn btn-link text-danger w-100 text-start">
                                    <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
                                </button>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Thông tin chi tiết */}
                <div className="user-inf col-md-8 p-4">
                    <h5 className="fw-bold mb-4">Thông tin cá nhân</h5>
                    <div className="mb-3 d-flex align-items-start">
                        <i className="bi bi-person me-3 fs-5 text-secondary"></i>
                        <div>
                            <strong>Tên người dùng</strong>
                            <div>{user.fullname}</div>
                        </div>
                    </div>
                    <div className="mb-3 d-flex align-items-start">
                        <i className="bi bi-house-door me-3 fs-5 text-secondary"></i>
                        <div>
                            <strong>Địa chỉ</strong>
                            <div>{user.address}</div>
                        </div>
                    </div>

                    <div className="mb-3 d-flex align-items-start">
                        <i className="bi bi-telephone me-3 fs-5 text-secondary"></i>
                        <div>
                            <strong>Số điện thoại</strong>
                            <div>{user.phone}</div>
                        </div>
                    </div>

                    <div className="mb-4 d-flex align-items-start">
                        <i className="bi bi-envelope me-3 fs-5 text-secondary"></i>
                        <div>
                            <strong>Email</strong>
                            <div>{user.email}</div>
                        </div>
                    </div>
                    <button className="btn-pink px-4" onClick={handleEditClick}>
                        Chỉnh sửa thông tin
                    </button>

                </div>
            </div>
            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Chỉnh sửa thông tin</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label>Tên người dùng</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        className="form-control"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                    />
                                    {errors.fullName && <div className="text-danger small">{errors.fullName}</div>}
                                </div>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                    {errors.email && <div className="text-danger small">{errors.email}</div>}
                                </div>
                                <div className="mb-3">
                                    <label>Số điện thoại</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                    {errors.phone && <div className="text-danger small">{errors.phone}</div>}
                                </div>
                                <div className="mb-3">
                                    <label>Địa chỉ</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                    {errors.address && <div className="text-danger small">{errors.address}</div>}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleSave}>Lưu thay đổi</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>

    );
};

export default UserProfile;
