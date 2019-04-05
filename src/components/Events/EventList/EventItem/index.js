import React from "react";

import "./EventItem.scss";

const EventItem = ({ event, userId, onDetail }) => (
  <li className="event__list-item" key={event._id}>
    <div>
      <h1>{event.title}</h1>
      <h2>
        {event.description} - {new Date(event.date).toLocaleDateString()}
      </h2>
    </div>
    <div>
      {userId === event.creator._id ? (
        <p>You're the owner of this event </p>
      ) : (
        <button className="btn" onClick={onDetail.bind(this, event._id)}>
          View detail
        </button>
      )}
    </div>
  </li>
);

export default EventItem;
