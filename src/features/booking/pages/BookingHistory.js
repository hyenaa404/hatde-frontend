import React, { useEffect, useState } from 'react';
import "../styles/booking-history.css"
import Pagination from '../../../components/common/Pagination';
import { fetchBookingsByUser } from '../bookingServices';
import { useSelector } from 'react-redux';
import { fetchBookings } from '../test-data';
const BookingHistory = () => {

    const user = useSelector((state) => state.auth.user);
    const [bookings, setBookings] = useState([]);
    const [sortedBookings, setSortedBookings] = useState([]);

    useEffect(() => {
        
        const fetchAndSort = async () => {
            try {
                const data = await fetchBookingsByUser(user.id); 
                setBookings(data); 
                console.log("fetch", data.length);
                var sorted = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                sorted = data.map(booking => ({ ...booking, status: "approved" }));
                setSortedBookings(sorted);
            } catch (error) {
                console.error("Lỗi fetch bookings:", error);
            }

            
        };

        if (user?.id) {
            fetchAndSort();
        }
    }, [bookings]);

    const handlePayment = (bookingId) => {
        console.log(`Thanh toán cho booking ${bookingId}`);
        // Gọi API hoặc redirect đến trang thanh toán
    };

    


    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = sortedBookings.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="booking-history">
            <h2>Lịch sử đơn hàng</h2>
            {bookings.length === 0 ? (
                <p>Không có đơn hàng nào.</p>
            ) : (
                <>
                    <table className="booking-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ngày tổ chức</th>
                                <th>Ngày đặt</th>
                                <th>Ghi chú</th>
                                <th>Thanh toán</th>
                                <th>Trạng thái</th>
                                <th>Tổng tiền</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((booking, index) => (
                                <tr key={booking.bookingId}>
                                    <td>#{booking.bookingId}</td>
                                    <td>{new Date(booking.eventDate).toLocaleDateString()}</td>
                                    <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                                    <td>{booking.bookingDetails.map(detail => detail.service.title).join(", ")}</td>
                                    <td>{booking.paymentMethod}</td>
                                    <td>{booking.status}</td>
                                    <td>{Number(booking.totalPrice).toLocaleString()} VND</td>
                                    <td>
                                        {booking.status === 'approved' && booking.paymentMethod === 'vnpay' && (
                                            <button onClick={() => handlePayment(booking.bookingId)} className="pay-button">
                                                Thanh toán
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </>
            )}
        </div>
    );
};

export default BookingHistory;
