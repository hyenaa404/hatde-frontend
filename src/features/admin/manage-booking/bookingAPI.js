import axiosInstance from "../../../services/axiosInstance";

export const fetchBookingAdminAPI = () => {
  return axiosInstance.get(`/Booking`, {
    withCredentials: true,
  });
}



export const fetchBookingAPI = (vendorId) => {
  return axiosInstance.get(`/Vendor/BookingDetails/Vendor/${vendorId}`, {
    withCredentials: true,
  });
}

export const changeBookingDetailStatusAPI = (bookingDetailId, status) => {
  return axiosInstance.get(`/Vendor/ChangeStatus?bookingDetailId=${bookingDetailId}&status=${status}`, {
    withCredentials: true,
  });
}

export const fetchBookingDetailAPI = (id) => {
  console.log(`fetch ${id}`)
  return axiosInstance.get(`/Booking/${id}`, {
    withCredentials: true,
    // timeout: 20000,
  });
}



// export const updateBookingAPI = (id, nextStatus) => {
//   return axiosInstance.post(`/Booking/change-status/${id}`, nextStatus);
// };


export const updateBookingAPI = (id, nextStatus) => {
  return axiosInstance.post(
    `/Booking/change-status/${id}`,
    JSON.stringify(nextStatus), // cần stringify để thành chuỗi có dấu ngoặc kép
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};