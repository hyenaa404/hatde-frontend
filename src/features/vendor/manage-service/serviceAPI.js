import axiosInstance from "../../../services/axiosInstance";





export const fetchServiceAPI = (vendorId) => {
    return axiosInstance.get(`/Service/Vendor/${vendorId}`, {
        withCredentials: true,
    });
}

export const addServiceAPI = (data) => {
    return axiosInstance.post('/Service/add', {
        vendorId: data.vendorId,
        serviceCategoryId: data.serviceCategoryId,
        title: data.title,
        description: data.description,
        price: data.price,
        imageDemo: data.imageDemo,
        address: data.address
    }, {
        withCredentials: true
    })
}

export const deleteServiceAPI = (id) => {
    return axiosInstance.delete(`/Service/delete/${id}`);
};


export const updateServiceAPI = (data) => {
    return axiosInstance.post('/Service/update', {
        serviceId: data.serviceId,
        vendorId: data.vendorId,
        serviceCategoryId: data.serviceCategoryId,
        title: data.title,
        description: data.description,
        price: data.price,
        imageDemo: data.imageDemo,
        address: data.address
    }, {
        withCredentials: true
    })
}
