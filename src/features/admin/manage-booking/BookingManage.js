import React, { useEffect, useState } from 'react';
import Pagination from '../../../components/common/Pagination';
import { fetchBookings, updateBooking, fetchBookingDetail, fetchBookingsAdmin } from './bookingServices'
import { useSelector } from 'react-redux';

export const BookingManage = () => {
    // const [selectedBooking, setSelectedBooking] = useState(null);
    const [selectedBookingDetail, setSelectedBookingDetail] = useState(null);

    const user = useSelector((state) => state.auth.user);
    const [bookings, setBookings] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(false);
    // const [sortedBookings, setSortedBookings] = useState([]);


    const TABS = [
        { key: 'all', label: 'Tất cả' },
        { key: 'pending', label: 'Chờ xác nhận' },
        { key: 'approved', label: 'Đã xác nhận' },
        { key: 'preparing', label: 'Đang chuẩn bị' },
        { key: 'completed', label: 'Hoàn thành' },
        { key: 'cancel', label: 'Đã hủy' }
    ];

    const [filteredBookings, setFilteredBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const fetchAndSort = async () => {
        try {
            const data = await fetchBookingsAdmin();
            console.log(data);
            setFetchStatus(true)
            var sorted = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            // sorted = sorted.map(booking => ({ ...booking, status: "approved" }));
            setBookings(sorted);
            filterByTab(sorted, activeTab);
        } catch (error) {
            console.error("Lỗi fetch bookings:", error);
        }


    };

    const fetchDetail = async (id) => {
        try {
            const data = await fetchBookingDetail(id);
            setSelectedBookingDetail(data)
        } catch (error) {
            console.error("Lỗi fetch booking detail:", error);
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

    const handleUpdate = async (bookingId, nextStatus) => {
        window.confirm("Confirm to update booking status?")
        try {
            await updateBooking(bookingId, nextStatus)
            fetchAndSort();
        } catch (error) {
            alert(`Failed to update status to ${nextStatus}`)
        }

    };





    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="booking-history">

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
                                <th>Ngày tổ chức</th>
                                <th>Ngày đặt</th>
                                {/* <th>Dịch vụ</th> */}
                                <th>Thanh toán</th>
                                <th>Trạng thái</th>
                                <th>Tổng tiền</th>
                                <th>Thao tác</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((booking) => (
                                <tr key={booking.bookingId} onClick={() => fetchDetail(booking.bookingId)} className="clickable-row">
                                    <td>{booking.bookingId}</td>
                                    <td>{new Date(booking.eventDate).toLocaleDateString()}</td>
                                    <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                                    {/* <td className="booking-services">
                                        {booking.bookingDetails.map(detail => detail.service.title).join(" • ")}
                                    </td> */}
                                    <td>{booking.paymentMethod}</td>
                                    <td>
                                        <span className={`status-badge status-${booking.status}`}>
                                            {(() => {
                                                switch (booking.status) {
                                                    case 'pending': return 'Chờ xác nhận';
                                                    case 'approved': return 'Đã xác nhận';
                                                    case 'preparing': return 'Đang chuẩn bị';
                                                    case 'completed': return 'Hoàn thành';
                                                    case 'cancel': return 'Đã hủy';
                                                    default: return booking.status;
                                                }
                                            })()}
                                        </span>
                                    </td>
                                    <td>{Number(booking.totalPrice).toLocaleString()} VND</td>
                                    <td>
                                        {(() => {
                                            if (booking.status === 'pending') {
                                                return (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleUpdate(booking.bookingId, 'approved');
                                                        }}
                                                        className="pay-button"
                                                    >
                                                        Xác nhận
                                                    </button>

                                                );
                                            }
                                            return null;
                                        })()}
                                    </td>
                                    <td>{booking.status && booking.status !== 'cancel' && booking.status !== "completed" && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUpdate(booking.bookingId, "cancel");
                                            }}
                                            className="cancel-button"
                                        >
                                            Hủy
                                        </button>
                                    )}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    {/* {selectedBooking && fetchDetail(selectedBooking.bookingId)} */}

                    {selectedBookingDetail && (
                        <div className="overlay-booking">
                            <div className="modal-booking">
                                <button className="close-btn" onClick={() => setSelectedBookingDetail(null)}>×</button>
                                <h3>Chi tiết đơn hàng #{selectedBookingDetail.bookingId}</h3>
                                <div className='order-detail-wrapper'>
                                    <div className='service-item'>
                                        <div className="cart-page">

                                            <div className="cart-list">
                                                {selectedBookingDetail.bookingDetails.map(item => (
                                                    <div key={item.service.serviceId} className="cart-item">
                                                        <img src={item.service.imageDemo} alt={item.service.title} />
                                                        <div className="cart-info">
                                                            <p className="item-name">{item.service.title}</p>
                                                            <p className="item-price">{item.service.price.toLocaleString()} VND</p>

                                                        </div>

                                                    </div>
                                                ))}
                                            </div>

                                            <div className="cart-summary">

                                                <div className="summary-row total">
                                                    <strong>Tổng chi phí</strong>
                                                    <strong>{selectedBookingDetail.totalPrice.toLocaleString()} VND</strong>
                                                </div>
                                            </div>



                                        </div>
                                    </div>
                                    <div className='order-information'>
                                        <p><strong>Trạng thái:</strong> <span className={`status-badge status-${selectedBookingDetail.status}`}>{selectedBookingDetail.status}</span></p>
                                        <p><strong>Địa chỉ:</strong> {selectedBookingDetail.user.address}</p>
                                        <p><strong>Ngày tổ chức:</strong> {new Date(selectedBookingDetail.eventDate).toLocaleString()}</p>
                                        <p><strong>Ngày đặt:</strong> {new Date(selectedBookingDetail.createdAt).toLocaleString()}</p>
                                        <p><strong>Ghi chú:</strong> {selectedBookingDetail.note}</p>
                                        <p><strong>Khách hàng:</strong> {selectedBookingDetail.user.fullName}</p>
                                        <p><strong>SĐT:</strong> {selectedBookingDetail.user.phone}</p>
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


export default BookingManage;
