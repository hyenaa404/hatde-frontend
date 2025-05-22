import React, { useEffect, useState } from "react";
import "../styles/payment.css"

export default function PaymentPage() {
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    
    fetch("http://18.140.1.178/api/Payment/vnpay?bookingId=8&totalAmount=4690000") 
      .then((res) => res.json())
      .then((data) => setBookingData(data))
      .catch((err) => console.error("Lỗi khi fetch:", err));
  }, []);

  if (!bookingData) return <p>Loading...</p>;

  const { booking, paymentLink } = bookingData;

  return (
    <div className="payment-container">
  <h1>Payment Details</h1>

  <div className="section">
    <p><strong>Booking ID:</strong> {booking.bookingId}</p>
    <p><strong>Status:</strong> {booking.status}</p>
    <p><strong>Total Price:</strong> {booking.totalPrice.toLocaleString()} VND</p>
    <p><strong>Event Date:</strong> {new Date(booking.eventDate).toLocaleDateString()}</p>
    <p><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
    <p><strong>Payment Method:</strong> {booking.paymentMethod}</p>
    <p><strong>Note:</strong> {booking.note}</p>
  </div>

  <div className="section">
    <h2>Receiver Information</h2>
    <p><strong>Name:</strong> {booking.receiverName}</p>
    <p><strong>Phone:</strong> {booking.receiverPhone}</p>
    <p><strong>Address:</strong> {booking.receiverAddress}</p>
  </div>

  <a
    href={paymentLink}
    target="_blank"
    rel="noopener noreferrer"
    className="payment-button"
  >
    Proceed to Payment
  </a>
</div>

  );
}
