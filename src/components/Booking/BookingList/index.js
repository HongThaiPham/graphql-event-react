import "./BookingList.scss";

import React from "react";
import BookingItem from "./BookingItem";
const BookingList = ({ bookings, onCancel }) => {
  return (
    <ul className="booking__list">
      {bookings.map(booking => (
        <BookingItem booking={booking} key={booking._id} onCancel={onCancel} />
      ))}
    </ul>
  );
};

export default BookingList;
