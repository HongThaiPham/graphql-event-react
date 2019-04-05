import React, { useState, useContext, useEffect } from "react";
import "./Events.scss";
import MyModal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import httpCall from "../lib/httpCall";
import AuthContext from "../context/auth-context";
import EventList from "../components/Events/EventList/";
import Spinner from "../components/Spinner";

const EventsPage = () => {
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const context = useContext(AuthContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  const startCreateEventHandler = () => {
    setCreating(true);
  };

  const modalConfirmHandler = async () => {
    setCreating(false);
    if (
      title.trim().length === 0 ||
      description.trim().length === 0 ||
      date.trim().length === 0
    ) {
      return;
    }

    const requestBody = {
      query: `
        mutation {
          createEvent(eventInput: { 
            title: "${title}",
            description: "${description}",
            date: "${date}"
          }) {
            _id
            title
            description
            date
            creator {
              _id
              email
            }
          }
        }
      `
    };
    try {
      const result = await httpCall.post("", JSON.stringify(requestBody), {
        headers: {
          Authorization: `Bearer ${context.token}`
        }
      });

      if (result.status !== 200 && result.status !== 201) {
        throw new Error("Failed!");
      }
      console.log(result.data.data);
      setEvents([result.data.data.createEvent, ...events]);
    } catch (error) {
      console.log(error);
    }
  };

  const modalCancelHandler = () => {
    setCreating(false);
    setSelectedEvent(null);
  };

  const fetchEvents = async () => {
    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            description
            date
            creator {
              _id
              email
            }
          }
        }
      `
    };
    setLoading(true);
    try {
      const result = await httpCall.post("", JSON.stringify(requestBody));

      if (result.status !== 200 && result.status !== 201) {
        throw new Error("Failed!");
      }
      setEvents(result.data.data.events);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const showDetailHandler = eventId => {
    const selected = events.find(e => e._id === eventId);
    setSelectedEvent(selected);
  };

  const bookEventHandler = () => {};

  return (
    <React.Fragment>
      {(creating || selectedEvent) && <Backdrop />}
      {creating && (
        <MyModal
          title="Add Event"
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={modalConfirmHandler}>
          <form>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                name="description"
                rows="4"
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input
                type="datetime-local"
                name="date"
                onChange={e => setDate(e.target.value)}
              />
            </div>
          </form>
        </MyModal>
      )}
      {selectedEvent && (
        <MyModal
          title={selectedEvent.title}
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={bookEventHandler}
          confirmText="Book this event">
          <h1>{selectedEvent.title}</h1>
          <h2>{new Date(selectedEvent.date).toLocaleDateString()}</h2>
          <p> {selectedEvent.description}</p>
        </MyModal>
      )}
      {context.token && (
        <div className="events-control">
          <p>Share your own Events</p>
          <button className="btn" onClick={startCreateEventHandler}>
            Create Event
          </button>
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : (
        <EventList
          events={events}
          authUserId={context.userId}
          onViewDetail={showDetailHandler}
        />
      )}
    </React.Fragment>
  );
};

export default EventsPage;
