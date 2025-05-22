import axiosInstance from "../../services/axiosInstance";



export const addBookingAPI = (data) => {
    console.log ("at api" ,data)
  return axiosInstance.post('/Booking/add', { ...data }, {
    withCredentials: true
  });
};



export const fetchBookingByUserAPI = (id) => {
  return axiosInstance.get(`/Booking/user/${id}`, {
    withCredentials: true,
  });
}

export const paymentAPI = (id, total) => {
  return axiosInstance.get(`/Payment/vnpay?bookingId=${id}&totalAmount=${total}`, {
    withCredentials: true,
  });
}