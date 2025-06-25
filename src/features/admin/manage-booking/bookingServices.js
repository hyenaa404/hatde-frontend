
import { fetchBookingAPI, updateBookingAPI, fetchBookingDetailAPI, changeBookingDetailStatusAPI, fetchBookingAdminAPI } from "./bookingAPI";

export const fetchBookingsAdmin = async () => {
    try {
        const res = await fetchBookingAdminAPI()
        return res.data;

    } catch (error) {
        console.error("Lỗi khi tải bookings:", error);
    }
};

export const fetchBookings = async (vendorId) => {
    try {
        const res = await fetchBookingAPI(vendorId)
        return res.data;

    } catch (error) {
        console.error("Lỗi khi tải bookings:", error);
    }
};
export const changeBookingDetailStatus = async (bookingDetailId, status) => {
    try {
        const res = await changeBookingDetailStatusAPI(bookingDetailId, status)
        return res.data;

    } catch (error) {
        console.error("Lỗi khi tải bookings:", error);
    }
};


export const fetchBookingDetail = async (id) => {
    try {
        const res = await fetchBookingDetailAPI(id)
        return res.data;

    } catch (error) {
        console.error(`Lỗi khi tải bookings: ${id}`, error);
    }
};



export const updateBooking = async (id, nextStatus) => {

    const res = await updateBookingAPI(id, nextStatus)
    return res.data;

};

