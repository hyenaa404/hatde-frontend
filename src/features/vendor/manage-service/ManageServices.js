import React, { useEffect, useState } from 'react';
import './ManageServices.css';
import axiosInstance from '../../../services/axiosInstance';
import Pagination from '../../../components/common/Pagination';

const ManageServices = () => {
    const [services, setServices] = useState([]);

    const fetchServices = async () => {
        // Giả lập API fetch
        const response = await axiosInstance.get('/Service');
        const data = await response.data;
        console.log(data)
        setServices(data);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleEdit = (serviceId) => {
        alert(`Edit service ${serviceId}`);
    };

    const handleDelete = (serviceId) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            setServices(services.filter((s) => s.serviceId !== serviceId));
        }
    };

    
        const itemsPerPage = 6;
        const [currentPage, setCurrentPage] = useState(1);
    
        const totalPages = Math.ceil(services.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentItems = services.slice(startIndex, startIndex + itemsPerPage);
    return (
        <div className="manage-services">
            <h2>Manage Services</h2>
            <div className="services-grid">
                {currentItems.map(service => (
                    <div className="service-card" key={service.serviceId}>
                        <img src={service.imageDemo} alt={service.title} />
                        <h3>{service.title}</h3>
                        <p className="price">{service.price.toLocaleString()} VND</p>
                        <p className="description">{service.description}</p>
                        <div className="actions">
                            <button onClick={() => handleEdit(service.serviceId)} className="edit-btn">Edit</button>
                            <button onClick={() => handleDelete(service.serviceId)} className="delete-btn">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
        </div>
    );
};

export default ManageServices;
