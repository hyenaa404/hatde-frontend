import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { uploadToCloudinary } from "../../../services/cloudinaryConfig";
import { addService } from "./serviceService";
import Select from "react-select";
import "./ModalAddService.css";

const ModalAddService = ({ fetchServices, show, onClose }) => {
    const categories = useSelector((state) => state.categories.data);
    const user = useSelector((state) => state.auth.user);

    const [formData, setFormData] = useState({
        vendorId: user.id,
        serviceCategoryId: "",
        title: "",
        description: "",
        price: "",
        imageDemo: "",
        address: "",
    });

    const [uploading, setUploading] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [selectedAddresses, setSelectedAddresses] = useState([]);

    useEffect(() => {
        fetch("https://provinces.open-api.vn/api/?depth=1")
            .then((res) => res.json())
            .then((data) => {
                const normalized = data.map((prov) => {
                    const cleaned = prov.name.replace(/^Tỉnh |^Thành phố /, "").trim();
                    return { value: cleaned, label: cleaned };
                });
                setProvinces(normalized);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddressSelect = (selectedOptions) => {
        const values = selectedOptions.map((opt) => opt.value);
        setSelectedAddresses(values);
        setFormData((prev) => ({
            ...prev,
            address: values.join(", "),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData)
            await addService({
                ...formData,
                price: Number(formData.price),
            });

            alert("Thêm dịch vụ thành công!");
            onClose();
            fetchServices();
        } catch (err) {
            console.error("Lỗi khi thêm dịch vụ:", err);
            alert("Có lỗi xảy ra!");
        }
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content-add">
                <h4>Thêm Dịch Vụ Mới</h4>
                <form onSubmit={handleSubmit}>
                    {/* Danh mục dịch vụ */}
                    <div className="mb-3">
                        <label className="form-label">Danh mục dịch vụ</label>
                        <select
                            className="form-select"
                            name="serviceCategoryId"
                            value={formData.serviceCategoryId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Chọn danh mục --</option>
                            {categories.map((cate) => (
                                <option key={cate.serviceCategoryId} value={cate.serviceCategoryId}>
                                    {cate.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tiêu đề */}
                    <div className="mb-3">
                        <label className="form-label">Tiêu đề</label>
                        <input
                            name="title"
                            type="text"
                            className="form-control"
                            placeholder="Nhập tiêu đề dịch vụ"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Mô tả */}
                    <div className="mb-3">
                        <label className="form-label">Mô tả</label>
                        <textarea
                            name="description"
                            className="form-control"
                            placeholder="Mô tả chi tiết"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={3}
                        />
                    </div>

                    {/* Giá */}
                    <div className="mb-3">
                        <label className="form-label">Giá</label>
                        <input
                            name="price"
                            type="number"
                            className="form-control"
                            placeholder="VNĐ"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Địa chỉ hoạt động */}
                    <div className="mb-3">
                        <label className="form-label">Địa chỉ hoạt động (có thể chọn nhiều)</label>
                        <Select
                            isMulti
                            options={provinces}
                            value={selectedAddresses.map((addr) => ({
                                label: addr,
                                value: addr,
                            }))}
                            onChange={handleAddressSelect}
                            classNamePrefix="select"
                            placeholder="Chọn các tỉnh/thành..."
                        />
                    </div>

                    {/* Hình ảnh demo */}
                    <div className="mb-3">
                        <label className="form-label">Ảnh demo</label>
                        <input
                            name="imageDemo"
                            value={formData.imageDemo}
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Nút hành động */}
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary" disabled={uploading}>
                            {uploading ? "Đang tải ảnh..." : "Thêm dịch vụ"}
                        </button>
                        <button type="button" onClick={onClose} className="btn btn-secondary">
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalAddService;
