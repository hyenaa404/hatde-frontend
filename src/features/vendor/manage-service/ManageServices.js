import React, { useEffect, useState } from 'react';
import './ManageServices.css';
import axiosInstance from '../../../services/axiosInstance';
import Pagination from '../../../components/common/Pagination';
import ServiceCard from './ServiceCard';
import { fetchServiceAPI } from './serviceAPI';
import ModalAddService from './ModalAddService';
import {FaPlus } from "react-icons/fa";
import { useSelector } from 'react-redux';

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingServiceId, setEditingServiceId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const user = useSelector((state) => state.auth.user);

    const fetchServices = async () => {
        if (!user) return;
        const response = await fetchServiceAPI(user.id);
        const data = await response.data;
        setServices(data);
    };

    useEffect(() => {
        fetchServices();
    }, [user]);

    // Lọc dịch vụ theo tên
    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (serviceId) => {
        setEditingServiceId(serviceId);
    };

    const handleCancel = () => {
        setEditingServiceId(null);
    };

    const handleSave = async () => {
        await fetchServices();
        setEditingServiceId(null);
    };

    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredServices.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="manage-services">
            <div className="d-flex gap-2 mb-3">
                <button
                    className="add-btn w-20"
                    style={{
                        color: "rgb(0, 0, 0)",
                        border: `1px solid rgb(0, 0, 0)`,
                        backgroundColor: "transparent",
                    }}
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus className="me-1" />
                    Service
                </button>
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Tìm kiếm tên dịch vụ..."
                    value={searchTerm}
                    onChange={e => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>
            <div className="store-grid">
                {currentItems.map(service => (
                    <ServiceCard
                        key={service.serviceId}
                        service={service}
                        isEditing={editingServiceId === service.serviceId}
                        onEdit={handleEdit}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                ))}
            </div>
            <ModalAddService fetchServices={fetchServices} show={showModal} onClose={() => setShowModal(false)} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default ManageServices;
