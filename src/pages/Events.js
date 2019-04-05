import React, { useState } from "react";
import "./Events.scss";
import MyModal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
const EventsPage = () => {
  const [creating, setCreating] = useState(false);

  const startCreateEventHandler = () => {
    setCreating(true);
  };

  const modalConfirmHandler = () => {
    setCreating(false);
  };

  const modalCancelHandler = () => {
    setCreating(false);
  };

  return (
    <React.Fragment>
      {creating && (
        <React.Fragment>
          <Backdrop />
          <MyModal
            title="Add Event"
            canCancel
            canConfirm
            onCancel={modalCancelHandler}
            onConfirm={modalConfirmHandler}>
            <p>asdasd</p>
          </MyModal>
        </React.Fragment>
      )}
      <div className="events-control">
        <p>Share your own Events</p>
        <button className="btn" onClick={startCreateEventHandler}>
          Create Event
        </button>
      </div>
    </React.Fragment>
  );
};

export default EventsPage;
