import React, { useEffect, useState } from 'react';
import "../styles/booking-history.css"
import Pagination from '../../../components/common/Pagination';
import { fetchBookingsByUser } from '../bookingServices';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateBookingAPI } from '../../admin/manage-booking/bookingAPI';

const BookingHistory = () => {
    const [selectedBooking, setSelectedBooking] = useState(null);

    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const [bookings, setBookings] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(false);
    // const [sortedBookings, setSortedBookings] = useState([]);


    const TABS = [
        { key: 'all', label: 'Tất cả' },
        { key: 'pending', label: 'Chờ xác nhận' },
        { key: 'approved', label: 'Đã xác nhận' },
        { key: 'prepare', label: 'Đang chuẩn bị' },
        { key: 'completed', label: 'Hoàn thành' },
        { key: 'cancel', label: 'Đã hủy' }
    ];

    const [filteredBookings, setFilteredBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const fetchAndSort = async () => {
        try {
            const data = await fetchBookingsByUser(user.id);
            // setBookings(data);
            setFetchStatus(true)
            var sorted = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            // sorted = sorted.map(booking => ({ ...booking, status: "approved" }));
            setBookings(sorted);
            filterByTab(sorted, activeTab);
        } catch (error) {
            console.error("Lỗi fetch bookings:", error);
        }
    };
    useEffect(() => {
        if (user?.id) {
            fetchAndSort();
        }
    }, [user?.id]);


    useEffect(() => {
        filterByTab(bookings, activeTab);
    }, [activeTab, bookings]);

    const filterByTab = (data, tab) => {
        if (tab === 'all') {
            setFilteredBookings(data);
        } else {
            const filtered = data.filter(booking => booking.status.toLowerCase() === tab);
            setFilteredBookings(filtered);
        }
    };

    const handlePayment = (bookingId, totalPrice) => {
        navigate(`/payment?bookingId=${bookingId}&totalPrice=${totalPrice}`);
    };
    const cancelBooking = async (bookingId, status) => {
        try {
            await updateBookingAPI(bookingId, status);
            setFilteredBookings(prevItems =>
                prevItems.map(item =>
                    item.bookingId === bookingId
                        ? { ...item, status: status }
                        : item
                )
            );
            alert("Hủy đơn hàng thành công.");
        } catch (error) {
            console.error("Lỗi khi hủy đơn:", error);
        }
    }
    useEffect(() => {
        console.log(selectedBooking)
    }, [selectedBooking])



    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="booking-history">
            <h2>Lịch sử đơn hàng</h2>

            {/* Tabs */}
            <div className="tabs">
                {TABS.map(tab => (
                    <button
                        key={tab.key}
                        className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab(tab.key);
                            setCurrentPage(1);
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Table */}
            {filteredBookings.length === 0 ? (
                fetchStatus === true ? (
                    <div className='history notify'><p>Không có đơn hàng nào.</p></div>
                ) : (
                    <div className='history notify'><p>Loading...</p></div>
                )
            ) : (
                <>
                    <table className="booking-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                {/* <th>Ngày tổ chức</th> */}
                                <th>Ngày đặt</th>
                                <th>Dịch vụ</th>
                                <th>Phương thức</th>
                                <th>Thanh toán</th>
                                <th>Trạng thái </th>
                                <th>Tổng tiền</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((booking) => (
                                <tr key={booking.bookingId} onClick={() => setSelectedBooking(booking)} className="clickable-row">
                                    <td>{booking.bookingId}</td>
                                    {/* <td>{new Date(booking.eventDate).toLocaleDateString()}</td> */}
                                    <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                                    <td className="booking-services">
                                        {booking.bookingDetails.map(detail => detail.service.title).join(" • ")}
                                    </td>
                                    <td>{booking.paymentMethod}</td>
                                    <td>
                                        {booking.paymentMethod === 'vnpay' && (
                                            <span className={`status-badge status-pending`}>
                                                {booking.payments && booking.payments.length > 0
                                                    ? (booking.payments[booking.payments.length - 1].paymentStatus.toLowerCase() === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán')
                                                    : "Chưa thanh toán"}
                                            </span>
                                        )}
                                        {booking.paymentMethod === 'cash' && (
                                            <span className={`status-badge status-pending`}>
                                                {booking.status === 'pending' || booking.status === 'cancel'
                                                    ? 'Chưa thanh toán' : "Đã thanh toán"}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <span className={`status-badge status-${booking.status}`}>
                                            {(() => {
                                                switch (booking.status) {
                                                    case 'pending': return 'Chờ xác nhận';
                                                    case 'approved': return 'Đã xác nhận';
                                                    case 'prepare': return 'Đang chuẩn bị';
                                                    case 'completed': return 'Hoàn thành';
                                                    case 'cancel': return 'Đã hủy';
                                                    default: return booking.status;
                                                }
                                            })()}
                                        </span>
                                    </td>
                                    <td>{Number(booking.totalPrice).toLocaleString()} VND</td>
                                    <td>
                                        {booking.status === 'approved' && booking.paymentMethod === 'vnpay' && booking.payments && (booking.payments.length === 0 || (booking.payments[booking.payments.length - 1].paymentStatus !== "paid")) && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePayment(booking.bookingId, booking.totalPrice);
                                                }}
                                                className="pay-button"
                                            >
                                                Thanh toán
                                            </button>
                                        )}
                                        {booking.status === 'pending' && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    cancelBooking(booking.bookingId, "cancel");
                                                }}
                                                className="cancel-button btn-danger"
                                            >
                                                Hủy đơn
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>


                    {selectedBooking && (
                        <div className="overlay-booking">
                            <div className="modal-booking">
                                <button className="close-btn" onClick={() => setSelectedBooking(null)}>×</button>
                                <h3>Chi tiết đơn hàng #{selectedBooking.bookingId}</h3>
                                <div className='order-detail-wrapper'>
                                    <div className='service-item'>
                                        <div className="cart-page">

                                            <div className="cart-list">
                                                {selectedBooking.bookingDetails.map(item => (
                                                    <div key={item.service.serviceId} className="cart-item">
                                                        <img src={item.service.imageDemo} alt={item.service.title} />
                                                        <div className="cart-info">
                                                            <p className="item-name">{item.bookingDetailId} - {item.service.title}</p>
                                                            <p className='d-flex'>Trạng thái nhà cung cấp:<span className={`status-badge status-${item.status}`}>{item.status}</span></p>
                                                            <p className="item-price">{item.service.price.toLocaleString()} VND</p>

                                                        </div>

                                                    </div>
                                                ))}
                                            </div>

                                            <div className="cart-summary">

                                                <div className="summary-row total">
                                                    <strong>Tổng chi phí</strong>
                                                    <strong>{selectedBooking.totalPrice.toLocaleString()} VND</strong>
                                                </div>
                                            </div>



                                        </div>
                                    </div>
                                    <div className='order-information'>
                                        <p><strong>Trạng thái đơn hàng:</strong> <span className={`status-badge status-${selectedBooking.status}`}>{(() => {
                                            switch (selectedBooking.status) {
                                                case 'pending': return 'Chờ xác nhận';
                                                case 'approved': return 'Đã xác nhận';
                                                case 'prepare': return 'Đang chuẩn bị';
                                                case 'completed': return 'Hoàn thành';
                                                case 'cancel': return 'Đã hủy';
                                                default: return selectedBooking.status;
                                            }
                                        })()}</span></p>
                                        <p><strong>Trạng thái thanh toán:</strong> <span className={`status-badge status-pending`}>
                                            {selectedBooking.payments && selectedBooking.payments.length > 0
                                                ? (selectedBooking.payments[selectedBooking.payments.length - 1].paymentStatus.toLowerCase() === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán')
                                                : "Chưa thanh toán"}
                                        </span></p>
                                        <p><strong>Địa chỉ:</strong> {selectedBooking.user.address}</p>
                                        <p><strong>Ngày tổ chức:</strong> {new Date(selectedBooking.eventDate).toLocaleString()}</p>
                                        <p><strong>Ngày đặt:</strong> {new Date(selectedBooking.createdAt).toLocaleString()}</p>
                                        <p><strong>Ghi chú:</strong> {selectedBooking.note}</p>
                                        <p><strong>Khách hàng:</strong> {selectedBooking.user.fullName}</p>
                                        <p><strong>SĐT:</strong> {selectedBooking.user.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


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
