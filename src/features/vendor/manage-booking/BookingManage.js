import React, { useEffect, useState } from 'react';
import Pagination from '../../../components/common/Pagination';
import { changeBookingDetailStatus, fetchBookingDetail, fetchBookings } from '../../admin/manage-booking/bookingServices';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const ViewBooking = () => {
    const [selectedBooking, setSelectedBooking] = useState(null);

    const [selectedBookingDetail, setSelectedBookingDetail] = useState(null);


    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const [bookings, setBookings] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(false);
    // const [sortedBookings, setSortedBookings] = useState([]);


    const TABS = ['all', 'pending', 'confirmed', 'preparing', 'completed', 'cancelled'];

    const [filteredBookings, setFilteredBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const fetchAndSort = async () => {
        try {
            const data = await fetchBookings(user.id);
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
    const handleStatusChange = async (bookingDetailId, status) => {
        try {
            const res = await changeBookingDetailStatus(bookingDetailId, status);
            setBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking.bookingDetailId === bookingDetailId
                        ? { ...booking, status: status }
                        : booking
                )
            );
        } catch (e) {
            console.log(e);
        }
    }

    const fetchDetail = async (bookingDetail) => {
        try {
            console.log(bookingDetail)
            setSelectedBookingDetail(bookingDetail)
        } catch (error) {
            console.error("Lỗi fetch booking detail:", error);
        }
    };
    useEffect(() => {
        if (user?.id) {
            fetchAndSort();
        }
    }, []);




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

            {/* Tabs */}
            <div className="tabs">
                {TABS.map(tab => (
                    <button
                        key={tab}
                        className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab(tab);
                            setCurrentPage(1);
                        }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
                                <th>ID</th>
                                <th>Dịch vụ</th>
                                <th>Ngày tổ chức</th>
                                <th>Ngày đặt</th>
                                <th>Thanh toán</th>
                                <th>Trạng thái</th>
                                <th>Người đặt</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th>Cập nhật</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((booking) => (
                                <tr key={booking.bookingId}>
                                    <td onClick={() => fetchDetail(booking)} className="clickable-row">{booking.bookingDetailId}</td>
                                    <td onClick={() => fetchDetail(booking)} className="clickable-row">{booking.service.title}</td>
                                    <td>{new Date(booking.eventDate).toLocaleDateString()}</td>
                                    <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                                    {/* <td className="booking-services">
                                        {booking.bookingDetails.map(detail => detail.service.title).join(" • ")}
                                    </td> */}
                                    <td>{booking.paymentMethod}</td>
                                    <td>
                                        <span className={`status-badge status-${booking.status}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td>{booking.receiverName}</td>
                                    <td>{booking.receiverAddress}</td>
                                    <td>{booking.receiverPhone}</td>
                                    <td>
                                        {
                                            (booking.bookingStatus == "approved") ? <select
                                                value={booking.status}
                                                onChange={(e) => handleStatusChange(booking.bookingDetailId, e.target.value)}
                                                className={`btn border border-dark ${booking.status == "completed" ? "disabled" : ""}`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="preparing">Preparing</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select> : <span>Chưa phê duyệt</span>
                                        }
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                    {/* {selectedBooking && fetchDetail(selectedBooking.bookingId)} */}

                    {selectedBookingDetail && (
                        <div className="overlay-booking">
                            <div className="modal-booking">
                                <button className="close-btn" onClick={() => setSelectedBookingDetail(null)}>×</button>
                                <h3>Chi tiết đơn hàng #{selectedBookingDetail.bookingDetailId}</h3>
                                <div className='order-detail-wrapper'>
                                    <div className='service-item'>
                                        <div className="cart-page">

                                            <div className="cart-list">
                                                <div key={selectedBookingDetail.service.serviceId} className="cart-item">
                                                    <img src={selectedBookingDetail.service.imageDemo} alt={selectedBookingDetail.service.title} />
                                                    <div className="cart-info">
                                                        <p className="item-name">{selectedBookingDetail.service.title}</p>
                                                        <p className="item-price">{selectedBookingDetail.service.price.toLocaleString()} VND</p>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="cart-summary">

                                                <div className="summary-row total">
                                                    <strong>Tổng chi phí</strong>
                                                    <strong>{selectedBookingDetail.service.price.toLocaleString()} VND</strong>
                                                </div>
                                            </div>



                                        </div>
                                    </div>
                                    <div className='order-information'>
                                        <p><strong>Trạng thái:</strong> <span className={`status-badge status-${selectedBookingDetail.status}`}>{selectedBookingDetail.status}</span></p>
                                        <p><strong>Địa chỉ:</strong> {selectedBookingDetail.receiverAddress}</p>
                                        <p><strong>Ngày tổ chức:</strong> {new Date(selectedBookingDetail.eventDate).toLocaleString()}</p>
                                        <p><strong>Ngày đặt:</strong> {new Date(selectedBookingDetail.createdAt).toLocaleString()}</p>
                                        <p><strong>Ghi chú:</strong> {selectedBookingDetail.note}</p>
                                        <p><strong>Khách hàng:</strong> {selectedBookingDetail.receiverName}</p>
                                        <p><strong>SĐT:</strong> {selectedBookingDetail.receiverPhone}</p>
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


export default ViewBooking;
