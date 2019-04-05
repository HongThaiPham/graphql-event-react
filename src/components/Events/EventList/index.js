import React from "react";

import "./EventList.scss";

import EventItem from "./EventItem";

const EventList = ({ events, authUserId, onViewDetail }) => {
  const eventList = events.map(event => (
    <EventItem
      key={event._id}
      event={event}
      userId={authUserId}
      onDetail={onViewDetail}
    />
  ));
  return <ul className="event__list">{eventList}</ul>;
};

export default EventList;
