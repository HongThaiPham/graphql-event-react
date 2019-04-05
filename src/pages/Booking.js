import React, { useState, useEffect, useContext } from "react";
import httpCall from "../lib/httpCall";
import Spinner from "../components/Spinner";
import AuthContext from "../context/auth-context";
const BookingPage = () => {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const context = useContext(AuthContext);
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const requestBody = {
      query: `
        query {
          bookings {
            _id
            updatedAt
            createdAt
            event {
              _id
              title
              date
            }
          }
        }
      `
    };
    setLoading(true);
    try {
      const result = await httpCall.post("", JSON.stringify(requestBody), {
        headers: {
          Authorization: `Bearer ${context.token}`
        }
      });

      if (result.status !== 200 && result.status !== 201) {
        throw new Error("Failed!");
      }
      setBookings(result.data.data.bookings);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const bookingList = bookings.map(booking => (
    <li key={booking._id}>
      {new Date(booking.createdAt).toLocaleDateString()}
    </li>
  ));

  return (
    <React.Fragment>
      {loading ? <Spinner /> : <ul>{bookingList}</ul>}
    </React.Fragment>
  );
};

export default BookingPage;
