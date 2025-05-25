
import { fetchBookingAPI, updateBookingAPI } from "./bookingAPI";



export const fetchBookings = async () => {
    try {
        const res = await fetchBookingAPI()
        return res.data;
        
    } catch (error) {
        console.error("Lỗi khi tải bookings:", error);
    }
};


export const updateBooking = async (id, nextStatus) => {
    try {
        const res = await updateBookingAPI(id,nextStatus)
        return res.data;
        
    } catch (error) {
        console.error("Lỗi khi tải bookings:", error);
    }
};

