import axiosInstance from "../../../services/axiosInstance";





export const fetchBookingAPI = () => {
  return axiosInstance.get(`/Booking/user/1`, {
    withCredentials: true,
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