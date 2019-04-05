import "./BookingItem.scss";
import React from "react";

const BookingItem = ({ booking, onCancel }) => (
  <li key={booking._id} className="booking__item">
    <React.Fragment>
      <div className="booking_item-data">
        {booking.event.title} -{" "}
        {new Date(booking.createdAt).toLocaleDateString()}
      </div>
      <div className="booking__item-actions">
        <button className="btn" onClick={onCancel.bind(this, booking._id)}>
          Cancel booking
        </button>
      </div>
    </React.Fragment>
  </li>
);
export default BookingItem;
