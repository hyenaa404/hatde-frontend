import axiosInstance from "../../services/axiosInstance";



export const addBookingAPI = (data) => {
    console.log ("at api" ,data)
  return axiosInstance.post('/Booking/add', { ...data }, {
    withCredentials: true
  });
};
